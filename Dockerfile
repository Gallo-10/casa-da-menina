# Dockerfile para Casa da Menina - Next.js Application
# Multi-stage build para otimizar o tamanho da imagem final

# Stage 1: Base
FROM node:20-alpine AS base

# Instalar dependências necessárias
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Instalar pnpm globalmente
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copiar arquivos de dependências
COPY package.json pnpm-lock.yaml* ./

# Stage 2: Dependencies
FROM base AS deps

# Instalar dependências de produção e desenvolvimento
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

# Stage 3: Builder
FROM base AS builder
WORKDIR /app

# Copiar dependências do stage anterior
COPY --from=deps /app/node_modules ./node_modules

# Copiar código fonte
COPY . .

# Desabilitar telemetria do Next.js durante o build
ENV NEXT_TELEMETRY_DISABLED=1

# Build da aplicação
RUN pnpm build

# Stage 4: Runner (imagem final)
FROM node:20-alpine AS runner
WORKDIR /app

# Instalar curl para health checks
RUN apk add --no-cache curl

# Criar usuário não-root para segurança
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copiar arquivos necessários para execução
COPY --from=builder /app/public ./public

# Copiar build output
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Configurar variáveis de ambiente
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Expor porta
EXPOSE 3000

# Mudar para usuário não-root
USER nextjs

# Comando para iniciar a aplicação
CMD ["node", "server.js"]
