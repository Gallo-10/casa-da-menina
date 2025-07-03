# Portal da Transparência - Documentação

## Arquitetura Refatorada

A implementação do Portal da Transparência foi refatorada para seguir melhores práticas de arquitetura, separando responsabilidades e facilitando a manutenção e integração futura com backend.

### Estrutura dos Arquivos

```
app/
├── transparencia/
│   ├── page.tsx              # Página principal com listagem de documentos
│   └── [id]/
│       └── page.tsx          # Página individual de documento (usa componente)
components/
├── transparency-document.tsx  # Componente reutilizável para exibir documentos
lib/
├── transparency-api.ts       # Serviço simulado de API
```

### Componentes

#### 1. **TransparencyDocument** (`components/transparency-document.tsx`)

- Componente reutilizável para exibir documentos de transparência
- Recebe dados do documento via props
- Inclui callback `onBack` para navegação
- Renderiza conteúdo HTML, metadados, anexos e ações

#### 2. **Serviço de API** (`lib/transparency-api.ts`)

- Simula requisições HTTP para backend
- Funções principais:
  - `getTransparencyPosts()`: Lista todos os posts
  - `getTransparencyDocument(id)`: Busca documento específico
  - `getTransparencyPostsByCategory(category)`: Filtra por categoria
- Dados mockados com delay simulado de rede
- Pronto para ser substituído por requisições HTTP reais

### Categorias Implementadas

1. **Documentos Constitutivos**

   - Estatuto da entidade
   - Ata de fundação
   - Regimento interno

2. **Organização Administrativa**

   - Organograma institucional
   - Descrição de cargos
   - Procedimentos administrativos

3. **Contratos Vigentes**

   - Convênios públicos
   - Contratos de prestação de serviços
   - Termos de parceria

4. **Relação dos Fornecedores**

   - Lista de fornecedores credenciados
   - Documentação de credenciamento
   - Categorização por tipo de produto/serviço

5. **Mural de Publicações**

   - Editais de licitação
   - Processos seletivos
   - Comunicados oficiais

6. **Relação das Parcerias**
   - Termos de parceria
   - Convênios de cooperação
   - Projetos de extensão

### Fluxo de Dados

#### Página Principal (`/transparencia`)

1. Componente monta e executa `useEffect`
2. Chama `getTransparencyPostsByCategory()` baseado no filtro atual
3. Atualiza estado com posts recebidos
4. Renderiza cards com resumo dos documentos
5. Links direcionam para `/transparencia/[id]`

#### Página Individual (`/transparencia/[id]`)

1. Extrai ID dos parâmetros da URL
2. Chama `getTransparencyDocument(id)` para buscar documento completo
3. Renderiza componente `TransparencyDocument` com os dados
4. Callback `onBack` navega de volta para lista principal

### Estados de Carregamento

- **Loading**: Exibido durante requisições
- **Error**: Tratamento de erros com mensagens amigáveis
- **Empty**: Mensagem quando nenhum documento é encontrado
- **Success**: Renderização normal dos dados

### Integração Futura com Backend

Para integrar com um backend real:

1. **Substitua as funções do `transparency-api.ts`** por requisições HTTP:

   ```typescript
   export async function getTransparencyPosts(): Promise<TransparencyPost[]> {
     const response = await fetch("/api/transparency/posts");
     return response.json();
   }
   ```

2. **Configure variáveis de ambiente** para URLs da API

3. **Implemente autenticação** se necessário

4. **Adicione tratamento de erros** mais robusto

5. **Configure cache** para melhor performance

### Vantagens da Nova Arquitetura

1. **Separação de Responsabilidades**

   - UI components isolados
   - Lógica de dados centralizada
   - Navegação desacoplada

2. **Reutilização de Código**

   - Componente `TransparencyDocument` pode ser usado em outros contextos
   - Serviço de API pode ser expandido facilmente

3. **Testabilidade**

   - Componentes podem ser testados isoladamente
   - Dados mockados facilitam testes

4. **Manutenibilidade**

   - Mudanças na estrutura de dados ficam centralizadas
   - Fácil adição de novas categorias ou funcionalidades

5. **Performance**
   - Estados de loading melhoram UX
   - Preparado para implementar cache e otimizações

### Adições Futuras Sugeridas

1. **Sistema de busca** textual nos documentos
2. **Download de anexos** real
3. **Notificações** para novos documentos
4. **Histórico de versões** dos documentos
5. **Sistema de comentários** ou feedback
6. **Exportação** para diferentes formatos
7. **Assinatura digital** para documentos oficiais
