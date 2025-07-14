import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-blue-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl text-blue-700">
                Sobre a Casa da Menina
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl">
                Conheça nossa história, missão e valores que nos guiam no cuidado com as crianças.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Nossa História */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-blue-700">Nossa História</h2>
              <p className="text-gray-600">
                A Casa da Menina São Francisco de Assis é uma entidade sem fins lucrativos, fundada em 10 de abril de 1962 por Floriano de Oliveira Garcez (Monsenhor Floriano).
                Está localizada à Rua Dr. Luiz Pizza, 165 – Centro – Assis/SP.
                Seus recursos são provenientes da participação voluntária dos pais, de contribuições da sociedade e convênios junto à Prefeitura Municipal de Assis.
              </p>
              <p className="text-gray-600">
                Tem como principal finalidade prestar atendimento a crianças de 4 meses a 5 anos, em período integral ou parcial,
                suprindo suas necessidades individuais tanto nos aspectos físicos como cognitivos, de acordo com a faixa etária.
                O corpo funcional é constituído por quem entende de infância, profissionais da educação com experiência e domínio
                no processo de desenvolvimento e aprendizagem.
              </p>
              <p className="text-gray-600">
                A alimentação possui uma atenção rigorosa, com escolhas saudáveis e acompanhadas por nutricionista em tempo integral.
                As matrículas são efetuadas de acordo com a demanda e capacidade de atendimento. Atende hoje a aproximadamente 600
                crianças.
              </p>
            </div>
            <div className="flex justify-center">
              <div className="relative w-full max-w-md h-80 overflow-hidden rounded-lg">
                <div className="absolute inset-0 bg-blue-100 flex items-center justify-center">
                  <img
                    src="/images/home-image.png"
                    alt="Ambiente acolhedor da Casa da Menina com brinquedos e decoração infantil"
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Missão, Visão e Valores */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-blue-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-blue-700">Missão, Visão e Valores</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center space-y-4 text-center">
                  <div className="h-16 w-16 rounded-full bg-blue-200 flex items-center justify-center">
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
                      className="text-blue-700"
                    >
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-blue-700">Missão</h3>
                  <p className="text-gray-600">
                    Prestar atendimento educacional e assistencial a crianças de 4 meses a 5 anos, em período integral
                    ou parcial, suprindo suas necessidades físicas, cognitivas e emocionais, promovendo seu desenvolvimento
                    integral com amor, cuidado e profissionalismo.
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center space-y-4 text-center">
                  <div className="h-16 w-16 rounded-full bg-blue-200 flex items-center justify-center">
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
                      className="text-blue-700"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <path d="M12 6v6l4 2"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-blue-700">Visão</h3>
                  <p className="text-gray-600">
                    Ser reconhecida como referência em educação infantil na região de Assis, formando cidadãos
                    conscientes e preparados para o futuro, através de um trabalho pedagógico de excelência e
                    cuidado integral desde os primeiros anos de vida.
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center space-y-4 text-center">
                  <div className="h-16 w-16 rounded-full bg-blue-200 flex items-center justify-center">
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
                      className="text-blue-700"
                    >
                      <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                      <path d="M2 17l10 5 10-5"></path>
                      <path d="M2 12l10 5 10-5"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-blue-700">Valores</h3>
                  <ul className="text-gray-600 text-left space-y-1">
                    <li>• Educação de qualidade</li>
                    <li>• Cuidado e proteção</li>
                    <li>• Desenvolvimento integral</li>
                    <li>• Alimentação saudável</li>
                    <li>• Respeito à individualidade</li>
                    <li>• Compromisso social</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Nossa Equipe */}
      <section className="w-full py-12 md:py-24 lg:py-32 ">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-blue-700">Nossa Equipe</h2>
            <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl">
              Profissionais dedicados trabalham juntos para oferecer o melhor cuidado e educação às nossas crianças.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-20 h-20 rounded-full bg-blue-200 mx-auto mb-4 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-blue-700"
                  >
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                  </svg>
                </div>
                <h3 className="font-bold text-blue-700">Professoras</h3>
                <p className="text-sm text-gray-600 mb-2">Professoras especializadas em educação infantil</p>
                <p className="text-xs text-gray-500">Desenvolvimento pedagógico e educacional das crianças</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-20 h-20 rounded-full bg-blue-200 mx-auto mb-4 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-blue-700"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
                <h3 className="font-bold text-blue-700">A.D.I e Monitoras</h3>
                <p className="text-sm text-gray-600 mb-2">Auxiliares de Desenvolvimento Infantil e Monitoras</p>
                <p className="text-xs text-gray-500">Cuidado direto e acompanhamento diário das crianças</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-20 h-20 rounded-full bg-blue-200 mx-auto mb-4 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-blue-700"
                  >
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                </div>
                <h3 className="font-bold text-blue-700">Equipe Administrativa</h3>
                <p className="text-sm text-gray-600 mb-2">Diretora, Coordenadora, Gerência e equipe de apoio</p>
                <p className="text-xs text-gray-500">Gestão, secretaria, recepção e suporte administrativo</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-20 h-20 rounded-full bg-blue-200 mx-auto mb-4 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-blue-700"
                  >
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                  </svg>
                </div>
                <h3 className="font-bold text-blue-700">Equipe de Apoio</h3>
                <p className="text-sm text-gray-600 mb-2">Nutricionista, cozinha, limpeza e educação física</p>
                <p className="text-xs text-gray-500">Alimentação, saúde, higiene e atividades complementares</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-blue-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-blue-700">
                Faça Parte da Nossa História
              </h2>
              <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl">
                Sua contribuição pode transformar a vida de uma menina. Conheça as formas de ajudar a Casa da Menina.
              </p>
            </div>
            <div className="space-x-4">
              <Link href="/contato">
                <Button className="bg-blue-600 hover:bg-blue-700">Fazer uma Doação</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
