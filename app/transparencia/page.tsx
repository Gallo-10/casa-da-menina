import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

// Simulação de posts de transparência
const transparencyPosts = [
  {
    id: 1,
    title: "Relatório Financeiro - 1º Trimestre 2025",
    date: "01/04/2025",
    excerpt:
      "Apresentação das receitas e despesas do primeiro trimestre de 2025, com detalhamento das doações recebidas e investimentos realizados.",
    type: "Financeiro",
  },
  {
    id: 2,
    title: "Prestação de Contas - Projeto Educação em Foco",
    date: "15/03/2025",
    excerpt:
      "Detalhamento dos recursos aplicados no projeto Educação em Foco, que beneficiou 25 meninas com aulas de reforço escolar.",
    type: "Projetos",
  },
  {
    id: 3,
    title: "Auditoria Externa - Exercício 2024",
    date: "28/02/2025",
    excerpt:
      "Resultado da auditoria externa realizada pela empresa XYZ Auditores, referente ao exercício fiscal de 2024.",
    type: "Auditoria",
  },
  {
    id: 4,
    title: "Doações Recebidas - Campanha de Inverno",
    date: "10/02/2025",
    excerpt: "Relação de doações recebidas durante a Campanha de Inverno e como os recursos foram aplicados.",
    type: "Doações",
  },
]

export default function TransparencyPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-blue-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl text-blue-700">
                Portal da Transparência
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl">
                Acesse todos os relatórios e documentos relacionados à gestão financeira e administrativa da Casa da
                Menina.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="w-full py-6">
        <div className="container px-4 md:px-6">
          <div className="flex flex-wrap gap-2 justify-center">
            <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-100">
              Todos
            </Button>
            <Button variant="ghost">Financeiro</Button>
            <Button variant="ghost">Projetos</Button>
            <Button variant="ghost">Auditoria</Button>
            <Button variant="ghost">Doações</Button>
          </div>
        </div>
      </section>

      {/* Posts Section */}
      <section className="w-full py-12">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {transparencyPosts.map((post) => (
              <Card key={post.id} className="flex flex-col h-full">
                <CardHeader>
                  <div className="text-sm text-gray-500 mb-2">
                    {post.date} • {post.type}
                  </div>
                  <CardTitle className="text-xl text-blue-700">{post.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-gray-600">{post.excerpt}</p>
                </CardContent>
                <CardFooter>
                  <Link href={`/transparencia/${post.id}`} className="w-full">
                    <Button variant="outline" className="w-full border-yellow-500 text-yellow-600 hover:bg-yellow-100">
                      Ver Detalhes
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
