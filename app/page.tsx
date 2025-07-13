import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-blue-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl text-blue-700">
                Casa da Menina
              </h1>
              <p className="text-xl font-semibold text-blue-600 mb-2">São Francisco de Assis</p>
              <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl">
                Acolher, Proteger e Educar para a Vida
              </p>
            </div>
            <div className="space-x-4">
              <Link href="/sobre">
                <Button className="bg-blue-600 hover:bg-blue-700">Conheça Nossa Missão</Button>
              </Link>
              <Link href="/transparencia">
                <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-100">
                  Portal da Transparência
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-blue-700">Quem Somos</h2>
              <p className="text-gray-600">
                A Casa da Menina São Francisco de Assis é uma entidade sem fins lucrativos, fundada em 10 de abril de 1962 por Floriano de Oliveira Garcez (Monsenhor Floriano). 
                Está localizada à Rua Dr. Luiz Pizza, 165 – Centro – Assis/SP.
              </p>
              <p className="text-gray-600">
                Tem como principal finalidade prestar atendimento a crianças de 4 meses a 5 anos, em período integral ou parcial, 
                suprindo suas necessidades individuais tanto nos aspectos físicos como cognitivos, de acordo com a faixa etária.
              </p>
              <Link href="/sobre">
                <Button variant="link" className="text-blue-600 p-0">
                  Saiba mais sobre nosso trabalho →
                </Button>
              </Link>
            </div>
            <div className="flex justify-center">
              <div className="relative w-full max-w-md h-60 overflow-hidden rounded-lg">
                <div className="absolute inset-0 bg-blue-100 flex items-center justify-center">
                  <img
                    src="/placeholder.svg?height=240&width=400"
                    alt="Brinquedos infantis representando o ambiente acolhedor da Casa da Menina"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-blue-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-blue-700">Nossos Programas</h2>
              <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl">
                Conheça as iniciativas que desenvolvemos para o bem-estar das nossas meninas.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center space-y-2 text-center">
                  <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-blue-600"
                    >
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-blue-700">Acolhimento</h3>
                  <p className="text-gray-600">
                    Oferecemos um lar temporário com todo o suporte necessário para o desenvolvimento saudável.
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center space-y-2 text-center">
                  <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-blue-600"
                    >
                      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-blue-700">Educação</h3>
                  <p className="text-gray-600">
                    Garantimos acesso à educação de qualidade e atividades complementares para o desenvolvimento
                    integral.
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center space-y-2 text-center">
                  <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-blue-600"
                    >
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-blue-700">Saúde e Bem-estar</h3>
                  <p className="text-gray-600">
                    Cuidamos da saúde física e emocional com acompanhamento médico e psicológico regular.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-blue-700">Como Ajudar</h2>
              <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl">
                Existem diversas formas de contribuir com a Casa da Menina. Sua ajuda é fundamental para continuarmos
                nosso trabalho.
              </p>
            </div>
            <div className="space-x-4">
              <Link href="/contato">
                <Button className="bg-blue-600 hover:bg-blue-700">Fazer uma Doação</Button>
              </Link>
              <Link href="/voluntariado">
                <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-100">
                  Seja Voluntário
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
