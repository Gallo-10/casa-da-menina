// Simulação de API para documentos de transparência
// Em produção, essas funções fariam requisições HTTP para o backend

import type {
  DocumentAttachment,
  TransparencyDocumentData,
  TransparencyPost
} from './types/transparency'

// Dados mockados - em produção viriam do banco de dados
const mockDocuments: Record<number, TransparencyDocumentData> = {
  1: {
    id: 1,
    title: "Estatuto da Casa da Menina São Francisco de Assis",
    date: "01/04/2025",
    type: "Documentos Constitutivos",
    author: "Diretoria",
    content: `
      <h2>Estatuto da Casa da Menina São Francisco de Assis</h2>
      
      <h3>CAPÍTULO I - DA DENOMINAÇÃO, SEDE E FINS</h3>
      
      <p><strong>Art. 1º</strong> - A Casa da Menina São Francisco de Assis é uma entidade civil sem fins lucrativos, fundada em 10 de abril de 1962, com sede e foro na cidade de Assis, Estado de São Paulo, à Rua Dr. Luiz Pizza, nº 165, Centro.</p>
      
      <p><strong>Art. 2º</strong> - A entidade tem por finalidade:</p>
      <ul>
        <li>Prestar atendimento educacional e assistencial a crianças de 4 meses a 5 anos;</li>
        <li>Promover o desenvolvimento integral das crianças atendidas;</li>
        <li>Oferecer alimentação balanceada e cuidados adequados à faixa etária;</li>
        <li>Desenvolver atividades pedagógicas e educacionais;</li>
      </ul>
      
      <h3>CAPÍTULO II - DA ORGANIZAÇÃO ADMINISTRATIVA</h3>
      
      <p><strong>Art. 3º</strong> - A administração da entidade é exercida pelos seguintes órgãos:</p>
      <ul>
        <li>Diretoria Executiva</li>
        <li>Conselho Fiscal</li>
        <li>Assembleia Geral</li>
      </ul>
      
      <h3>CAPÍTULO III - DOS RECURSOS FINANCEIROS</h3>
      
      <p><strong>Art. 4º</strong> - Os recursos da entidade são provenientes de:</p>
      <ul>
        <li>Participação voluntária dos pais;</li>
        <li>Contribuições da sociedade;</li>
        <li>Convênios com órgãos públicos;</li>
        <li>Doações e legados;</li>
        <li>Rendas de eventos e campanhas.</li>
      </ul>
    `,
    attachments: [
      { name: "Estatuto_Completo.pdf", size: "1.2 MB" },
      { name: "Ata_Fundacao_1962.pdf", size: "850 KB" }
    ]
  },
  2: {
    id: 2,
    title: "Organograma Institucional 2025",
    date: "15/03/2025",
    type: "Organização Administrativa",
    author: "Administração",
    content: `
      <h2>Organograma Institucional</h2>
      
      <h3>Estrutura Organizacional</h3>
      
      <p>A Casa da Menina São Francisco de Assis possui uma estrutura organizacional bem definida, com responsabilidades claras e hierarquia estabelecida para garantir o bom funcionamento da instituição.</p>
      
      <h4>Diretoria</h4>
      <ul>
        <li><strong>Diretora Geral:</strong> Isaura da S. Leopoldo</li>
        <li><strong>Coordenadora Pedagógica:</strong> Saionaria V. Evangelista</li>
        <li><strong>Gerente Administrativa:</strong> Andréia Dias Alevato</li>
      </ul>
      
      <h4>Equipe Pedagógica</h4>
      <ul>
        <li>26 Professoras especializadas em educação infantil</li>
        <li>28 Auxiliares de Desenvolvimento Infantil (A.D.I)</li>
        <li>8 Monitoras de apoio</li>
      </ul>
      
      <h4>Equipe de Apoio</h4>
      <ul>
        <li><strong>Nutricionista:</strong> Carla Silva Leopoldo</li>
        <li><strong>Educador Físico:</strong> Carlos Alberto Arantes da Silva</li>
        <li>4 Auxiliares de cozinha</li>
        <li>4 Auxiliares de limpeza</li>
        <li>2 Recepcionistas</li>
      </ul>
      
      <h4>Administração</h4>
      <ul>
        <li>Secretária: Cibelle Chistina Piedade de Oliveira</li>
        <li>Auxiliares administrativos</li>
        <li>Auxiliar de escritório</li>
      </ul>
    `,
    attachments: [
      { name: "Organograma_2025.pdf", size: "2.1 MB" },
      { name: "Descricao_Cargos.pdf", size: "1.8 MB" }
    ]
  },
  3: {
    id: 3,
    title: "Contrato de Convênio - Prefeitura Municipal de Assis",
    date: "28/02/2025",
    type: "Contratos Vigentes",
    author: "Departamento Jurídico",
    content: `
      <h2>Convênio de Prestação de Serviços</h2>
      
      <h3>Partes Envolvidas</h3>
      <p><strong>Convenente:</strong> Prefeitura Municipal de Assis</p>
      <p><strong>Conveniada:</strong> Casa da Menina São Francisco de Assis</p>
      
      <h3>Objeto do Convênio</h3>
      <p>Prestação de serviços de educação infantil para crianças de 4 meses a 5 anos de idade, moradores do município de Assis, prioritariamente de famílias em situação de vulnerabilidade social.</p>
      
      <h3>Vigência</h3>
      <p><strong>Período:</strong> 01/01/2025 a 31/12/2025</p>
      <p><strong>Valor Total:</strong> R$ 2.400.000,00 (dois milhões e quatrocentos mil reais)</p>
      
      <h3>Obrigações da Conveniada</h3>
      <ul>
        <li>Atender até 400 crianças em período integral;</li>
        <li>Fornecer alimentação balanceada (café da manhã, almoço e lanche);</li>
        <li>Desenvolver atividades pedagógicas adequadas à faixa etária;</li>
        <li>Manter profissionais habilitados em educação infantil;</li>
        <li>Apresentar relatórios mensais de atividades.</li>
      </ul>
    `,
    attachments: [
      { name: "Convenio_Prefeitura_2025.pdf", size: "3.2 MB" },
      { name: "Planilha_Orcamentaria.xlsx", size: "456 KB" }
    ]
  },
  4: {
    id: 4,
    title: "Lista de Fornecedores Credenciados 2025",
    date: "10/02/2025",
    type: "Relação dos Fornecedores",
    author: "Setor de Compras",
    content: `
      <h2>Fornecedores Credenciados - 2025</h2>
      
      <h3>Critérios de Credenciamento</h3>
      <p>Todos os fornecedores listados passaram por processo de credenciamento, apresentando documentação fiscal e jurídica em dia, além de atenderem aos padrões de qualidade exigidos pela instituição.</p>
      
      <h3>Alimentação e Gêneros Alimentícios</h3>
      <ul>
        <li><strong>Distribuidora Alimentos Ltda</strong> - CNPJ: 12.345.678/0001-90</li>
        <li><strong>Hortifruti São Francisco</strong> - CNPJ: 23.456.789/0001-01</li>
        <li><strong>Panificadora Central</strong> - CNPJ: 34.567.890/0001-12</li>
      </ul>
      
      <h3>Material de Limpeza e Higiene</h3>
      <ul>
        <li><strong>Produtos de Limpeza Clean</strong> - CNPJ: 45.678.901/0001-23</li>
        <li><strong>Higiene Total Ltda</strong> - CNPJ: 56.789.012/0001-34</li>
      </ul>
      
      <h3>Material Pedagógico</h3>
      <ul>
        <li><strong>Brinquedos Educativos ABC</strong> - CNPJ: 67.890.123/0001-45</li>
        <li><strong>Papelaria Escolar Central</strong> - CNPJ: 78.901.234/0001-56</li>
      </ul>
      
      <h3>Serviços Gerais</h3>
      <ul>
        <li><strong>Transportes Segura Viagem</strong> - CNPJ: 89.012.345/0001-67</li>
        <li><strong>Manutenção Predial Total</strong> - CNPJ: 90.123.456/0001-78</li>
      </ul>
    `,
    attachments: [
      { name: "Lista_Fornecedores_2025.pdf", size: "1.5 MB" },
      { name: "Documentacao_Fornecedores.zip", size: "8.2 MB" }
    ]
  },
  5: {
    id: 5,
    title: "Edital de Contratação - Serviços de Limpeza",
    date: "05/01/2025",
    type: "Mural de Publicações",
    author: "Comissão de Licitação",
    content: `
      <h2>Edital de Licitação - Serviços de Limpeza</h2>
      
      <h3>Dados do Processo</h3>
      <p><strong>Processo:</strong> 001/2025</p>
      <p><strong>Modalidade:</strong> Convite</p>
      <p><strong>Tipo:</strong> Menor Preço</p>
      
      <h3>Objeto</h3>
      <p>Contratação de empresa especializada para prestação de serviços de limpeza e conservação das dependências da Casa da Menina São Francisco de Assis.</p>
      
      <h3>Especificações dos Serviços</h3>
      <ul>
        <li>Limpeza diária de todas as salas de aula;</li>
        <li>Higienização dos banheiros e trocadores;</li>
        <li>Limpeza e desinfecção do refeitório;</li>
        <li>Manutenção de jardins e áreas externas;</li>
        <li>Fornecimento de produtos de limpeza.</li>
      </ul>
      
      <h3>Cronograma</h3>
      <ul>
        <li><strong>Entrega das propostas:</strong> até 20/01/2025 às 14h</li>
        <li><strong>Abertura das propostas:</strong> 20/01/2025 às 14h30</li>
        <li><strong>Resultado:</strong> 25/01/2025</li>
        <li><strong>Início dos serviços:</strong> 01/02/2025</li>
      </ul>
      
      <h3>Valor Estimado</h3>
      <p>R$ 180.000,00 (cento e oitenta mil reais) para 12 meses de prestação de serviços.</p>
    `,
    attachments: [
      { name: "Edital_Limpeza_001_2025.pdf", size: "2.8 MB" },
      { name: "Termo_Referencia.pdf", size: "1.1 MB" }
    ]
  },
  6: {
    id: 6,
    title: "Parceria com Universidade Regional - UNIPAR",
    date: "20/12/2024",
    type: "Relação das Parcerias",
    author: "Coordenação Pedagógica",
    content: `
      <h2>Termo de Parceria - UNIPAR</h2>
      
      <h3>Instituições Envolvidas</h3>
      <p><strong>Parceira:</strong> Universidade Paranaense - UNIPAR, Campus Umuarama</p>
      <p><strong>Parceira:</strong> Casa da Menina São Francisco de Assis</p>
      
      <h3>Objetivos da Parceria</h3>
      <ul>
        <li>Proporcionar campo de estágio para estudantes de Pedagogia;</li>
        <li>Desenvolver projetos de extensão universitária;</li>
        <li>Promover capacitação continuada dos profissionais;</li>
        <li>Realizar pesquisas aplicadas em educação infantil.</li>
      </ul>
      
      <h3>Atividades Previstas</h3>
      <h4>Estágios Supervisionados</h4>
      <ul>
        <li>Recepção de até 20 estagiários por semestre;</li>
        <li>Supervisão por professores da UNIPAR;</li>
        <li>Acompanhamento por profissionais da Casa da Menina.</li>
      </ul>
      
      <h4>Projetos de Extensão</h4>
      <ul>
        <li>Oficinas de contação de histórias;</li>
        <li>Atividades de educação ambiental;</li>
        <li>Projetos de arte e música;</li>
        <li>Orientação nutricional para famílias.</li>
      </ul>
      
      <h4>Capacitação Profissional</h4>
      <ul>
        <li>Cursos de atualização em educação infantil;</li>
        <li>Workshops sobre desenvolvimento infantil;</li>
        <li>Seminários sobre inclusão e diversidade.</li>
      </ul>
      
      <h3>Vigência</h3>
      <p><strong>Período:</strong> 01/01/2025 a 31/12/2025, renovável automaticamente.</p>
    `,
    attachments: [
      { name: "Termo_Parceria_UNIPAR.pdf", size: "1.9 MB" },
      { name: "Cronograma_Atividades.pdf", size: "680 KB" }
    ]
  },
  7: {
    id: 7,
    title: "Ata de Fundação da Entidade - 1962",
    date: "10/04/1962",
    type: "Documentos Constitutivos",
    author: "Fundadores",
    content: `
      <h2>Ata de Fundação - Casa da Menina São Francisco de Assis</h2>
      
      <h3>Registro Histórico</h3>
      <p>Aos dez dias do mês de abril do ano de mil novecentos e sessenta e dois, reuniram-se na cidade de Assis, Estado de São Paulo, as pessoas abaixo relacionadas, com o objetivo de fundar uma entidade sem fins lucrativos destinada ao atendimento de crianças carentes.</p>
      
      <h3>Fundadores</h3>
      <ul>
        <li>Maria da Conceição Santos</li>
        <li>José Francisco de Assis</li>
        <li>Ana Paula Rodrigues</li>
        <li>Pe. Antonio Silva</li>
        <li>Dr. Carlos Alberto Mendes</li>
      </ul>
      
      <h3>Motivação</h3>
      <p>A fundação da Casa da Menina São Francisco de Assis foi motivada pela necessidade observada na comunidade de oferecer cuidados e educação para crianças de famílias trabalhadoras, especialmente mães que precisavam trabalhar para o sustento familiar.</p>
      
      <h3>Primeiros Objetivos</h3>
      <ul>
        <li>Criar um local seguro para crianças de 0 a 6 anos;</li>
        <li>Oferecer alimentação adequada;</li>
        <li>Proporcionar educação básica e valores cristãos;</li>
        <li>Apoiar famílias em situação de vulnerabilidade.</li>
      </ul>
      
      <h3>Primeiras Instalações</h3>
      <p>A entidade iniciou suas atividades em uma casa alugada na Rua São Bento, nº 45, atendendo inicialmente 15 crianças com o apoio de 3 voluntárias.</p>
    `,
    attachments: [
      { name: "Ata_Fundacao_Original.pdf", size: "1.8 MB" },
      { name: "Fotos_Historicas_1962.pdf", size: "3.2 MB" }
    ]
  },
  8: {
    id: 8,
    title: "Regimento Interno Atualizado",
    date: "15/01/2025",
    type: "Documentos Constitutivos",
    author: "Diretoria",
    content: `
      <h2>Regimento Interno - Casa da Menina São Francisco de Assis</h2>
      
      <h3>Disposições Gerais</h3>
      <p>Este regimento estabelece as normas de funcionamento interno da Casa da Menina São Francisco de Assis, complementando as disposições do Estatuto.</p>
      
      <h3>Do Horário de Funcionamento</h3>
      <ul>
        <li><strong>Segunda a Sexta:</strong> 6h30 às 18h00</li>
        <li><strong>Tolerância de chegada:</strong> até 8h00</li>
        <li><strong>Horário de retirada:</strong> a partir das 16h00</li>
      </ul>
      
      <h3>Do Atendimento às Crianças</h3>
      <h4>Idade de Atendimento</h4>
      <ul>
        <li><strong>Berçário I:</strong> 4 meses a 1 ano</li>
        <li><strong>Berçário II:</strong> 1 ano a 2 anos</li>
        <li><strong>Maternal I:</strong> 2 anos a 3 anos</li>
        <li><strong>Maternal II:</strong> 3 anos a 4 anos</li>
        <li><strong>Pré-escola:</strong> 4 anos a 5 anos</li>
      </ul>
      
      <h4>Documentação Necessária</h4>
      <ul>
        <li>Certidão de nascimento da criança;</li>
        <li>Cartão de vacinação atualizado;</li>
        <li>Comprovante de residência;</li>
        <li>Comprovante de renda familiar;</li>
        <li>2 fotos 3x4 da criança.</li>
      </ul>
      
      <h3>Das Normas de Convivência</h3>
      <ul>
        <li>Respeito mútuo entre crianças, famílias e funcionários;</li>
        <li>Comunicação prévia de faltas e ausências;</li>
        <li>Participação em reuniões pedagógicas;</li>
        <li>Cumprimento dos horários estabelecidos.</li>
      </ul>
    `,
    attachments: [
      { name: "Regimento_Interno_2025.pdf", size: "2.1 MB" },
      { name: "Manual_Pais_Responsaveis.pdf", size: "1.4 MB" }
    ]
  }
}

// Simulação de requisição para buscar todos os posts de transparência
export async function getTransparencyPosts(): Promise<TransparencyPost[]> {
  // Simula delay de rede
  await new Promise(resolve => setTimeout(resolve, 300))

  // Converte os documentos completos em posts resumidos
  return Object.values(mockDocuments).map(doc => ({
    id: doc.id,
    title: doc.title,
    date: doc.date,
    excerpt: doc.content.replace(/<[^>]*>/g, '').substring(0, 150) + '...',
    type: doc.type
  }))
}

// Simulação de requisição para buscar um documento específico
export async function getTransparencyDocument(id: number): Promise<TransparencyDocumentData | null> {
  // Simula delay de rede
  await new Promise(resolve => setTimeout(resolve, 200))

  return mockDocuments[id] || null
}

// Simulação de requisição para buscar posts por categoria
export async function getTransparencyPostsByCategory(category: string): Promise<TransparencyPost[]> {
  const allPosts = await getTransparencyPosts()

  if (category === "Todos") {
    return allPosts
  }

  return allPosts.filter(post => post.type === category)
}
