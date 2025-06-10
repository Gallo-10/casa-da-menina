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
                Conheça nossa história, missão e valores que nos guiam no cuidado com meninas em situação de
                vulnerabilidade.
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
                A Casa da Menina foi fundada em 2010 por um grupo de profissionais da área social que identificaram a
                necessidade de um espaço especializado no acolhimento de meninas órfãs de até 10 anos. Nossa jornada
                começou com o sonho de proporcionar um ambiente seguro e acolhedor para essas crianças.
              </p>
              <p className="text-gray-600">
                Ao longo dos anos, já acolhemos mais de 150 meninas, oferecendo não apenas um lar temporário, mas também
                oportunidades de desenvolvimento integral, educação de qualidade e preparação para um futuro promissor.
              </p>
              <p className="text-gray-600">
                Hoje, somos reconhecidos como uma referência no atendimento especializado a meninas em situação de
                vulnerabilidade, sempre priorizando o bem-estar, a dignidade e os direitos de cada criança.
              </p>
            </div>
            <div className="flex justify-center">
              <div className="relative w-full max-w-md h-80 overflow-hidden rounded-lg">
                <div className="absolute inset-0 bg-blue-100 flex items-center justify-center">
                  <img
                    src="/placeholder.svg?height=320&width=400"
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
                  <div className="h-16 w-16 rounded-full bg-yellow-200 flex items-center justify-center">
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
                      className="text-yellow-700"
                    >
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-blue-700">Missão</h3>
                  <p className="text-gray-600">
                    Acolher, proteger e promover o desenvolvimento integral de meninas órfãs de até 10 anos, oferecendo
                    um ambiente seguro, amoroso e estimulante que favoreça seu crescimento saudável e sua preparação
                    para a vida em sociedade.
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center space-y-4 text-center">
                  <div className="h-16 w-16 rounded-full bg-yellow-200 flex items-center justify-center">
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
                      className="text-yellow-700"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <path d="M12 6v6l4 2"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-blue-700">Visão</h3>
                  <p className="text-gray-600">
                    Ser reconhecida como uma instituição de excelência no acolhimento de meninas, contribuindo para a
                    formação de cidadãs conscientes, autônomas e preparadas para construir um futuro próspero e feliz.
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center space-y-4 text-center">
                  <div className="h-16 w-16 rounded-full bg-yellow-200 flex items-center justify-center">
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
                      className="text-yellow-700"
                    >
                      <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                      <path d="M2 17l10 5 10-5"></path>
                      <path d="M2 12l10 5 10-5"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-blue-700">Valores</h3>
                  <ul className="text-gray-600 text-left space-y-1">
                    <li>• Amor e cuidado</li>
                    <li>• Respeito à dignidade</li>
                    <li>• Transparência</li>
                    <li>• Responsabilidade social</li>
                    <li>• Desenvolvimento integral</li>
                    <li>• Ética e compromisso</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Nossa Equipe */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-blue-700">Nossa Equipe</h2>
            <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl">
              Profissionais dedicados e qualificados trabalham juntos para oferecer o melhor cuidado às nossas meninas.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-20 h-20 rounded-full bg-blue-100 mx-auto mb-4 flex items-center justify-center">
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
                    className="text-blue-600"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
                <h3 className="font-bold text-blue-700">Assistentes Sociais</h3>
                <p className="text-sm text-gray-600">Acompanhamento e suporte social especializado</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-20 h-20 rounded-full bg-blue-100 mx-auto mb-4 flex items-center justify-center">
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
                    className="text-blue-600"
                  >
                    <path d="M9 12l2 2 4-4"></path>
                    <path d="M21 12c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1z"></path>
                    <path d="M3 12c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1z"></path>
                    <path d="M12 21c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1z"></path>
                    <path d="M12 3c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1z"></path>
                  </svg>
                </div>
                <h3 className="font-bold text-blue-700">Psicólogos</h3>
                <p className="text-sm text-gray-600">Cuidado emocional e desenvolvimento psicológico</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-20 h-20 rounded-full bg-blue-100 mx-auto mb-4 flex items-center justify-center">
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
                    className="text-blue-600"
                  >
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                  </svg>
                </div>
                <h3 className="font-bold text-blue-700">Pedagogos</h3>
                <p className="text-sm text-gray-600">Apoio educacional e desenvolvimento cognitivo</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-20 h-20 rounded-full bg-blue-100 mx-auto mb-4 flex items-center justify-center">
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
                    className="text-blue-600"
                  >
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                  </svg>
                </div>
                <h3 className="font-bold text-blue-700">Cuidadores</h3>
                <p className="text-sm text-gray-600">Cuidado diário e acompanhamento 24 horas</p>
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
              <Link href="/doar">
                <Button className="bg-yellow-500 hover:bg-yellow-600 text-white">Fazer uma Doação</Button>
              </Link>
              <Link href="/contato">
                <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-100">
                  Entre em Contato
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
