# Dockerfile para Casa da Menina - Next.js Application
# Versão simplificada para evitar problemas com pnpm

FROM node:20-alpine AS base

# Instalar dependências necessárias
RUN apk add --no-cache libc6-compat curl
WORKDIR /app

# Copiar arquivos de configuração
COPY package.json pnpm-lock.yaml* ./

# Instalar pnpm usando corepack (método recomendado)
RUN corepack enable pnpm

# Instalar dependências
RUN pnpm install --frozen-lockfile

# Copiar código fonte
COPY . .

# Desabilitar telemetria do Next.js
ENV NEXT_TELEMETRY_DISABLED=1

# Build da aplicação
RUN pnpm build

# Criar usuário não-root para segurança
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Configurar permissões
RUN chown -R nextjs:nodejs /app

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
CMD ["pnpm", "start"]
