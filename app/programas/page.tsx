import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function ProgramsPage() {
  const programs = [
    {
      title: "Programa de Acolhimento Integral",
      description:
        "Oferecemos um lar temporário seguro e acolhedor, com cuidados 24 horas por dia, alimentação balanceada, vestuário adequado e ambiente familiar estruturado.",
      features: [
        "Acomodações confortáveis e seguras",
        "Alimentação nutritiva e balanceada",
        "Cuidados médicos regulares",
        "Ambiente familiar acolhedor",
        "Supervisão profissional 24h",
      ],
      icon: (
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
        >
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
          <polyline points="9,22 9,12 15,12 15,22"></polyline>
        </svg>
      ),
    },
    {
      title: "Programa Educacional",
      description:
        "Garantimos acesso à educação formal de qualidade, além de atividades complementares que estimulam o desenvolvimento cognitivo e criativo das meninas.",
      features: [
        "Matrícula em escolas de qualidade",
        "Acompanhamento pedagógico",
        "Reforço escolar personalizado",
        "Atividades artísticas e culturais",
        "Biblioteca e espaço de estudos",
      ],
      icon: (
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
        >
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
        </svg>
      ),
    },
    {
      title: "Programa de Saúde e Bem-estar",
      description:
        "Cuidamos da saúde física e mental das meninas com acompanhamento médico regular, atividades físicas e suporte psicológico especializado.",
      features: [
        "Consultas médicas regulares",
        "Acompanhamento psicológico",
        "Atividades físicas e esportivas",
        "Cuidados odontológicos",
        "Programas de prevenção",
      ],
      icon: (
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
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
        </svg>
      ),
    },
    {
      title: "Programa de Desenvolvimento Social",
      description:
        "Promovemos atividades que desenvolvem habilidades sociais, autoestima e preparam as meninas para a vida em comunidade.",
      features: [
        "Atividades em grupo",
        "Desenvolvimento de habilidades sociais",
        "Programas de autoestima",
        "Oficinas de cidadania",
        "Preparação para autonomia",
      ],
      icon: (
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
        >
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
      ),
    },
    {
      title: "Programa de Recreação e Lazer",
      description:
        "Oferecemos diversas atividades lúdicas e recreativas que contribuem para o desenvolvimento integral e a felicidade das meninas.",
      features: [
        "Brinquedoteca equipada",
        "Atividades ao ar livre",
        "Jogos educativos",
        "Festas e comemorações",
        "Passeios culturais",
      ],
      icon: (
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
        >
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
          <line x1="9" y1="9" x2="9.01" y2="9"></line>
          <line x1="15" y1="9" x2="15.01" y2="9"></line>
        </svg>
      ),
    },
    {
      title: "Programa de Preparação para Adoção",
      description:
        "Trabalhamos para facilitar processos de adoção responsável, preparando tanto as meninas quanto as famílias interessadas.",
      features: [
        "Preparação emocional das meninas",
        "Avaliação de famílias candidatas",
        "Acompanhamento pós-adoção",
        "Grupos de apoio",
        "Orientação jurídica",
      ],
      icon: (
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
        >
          <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
          <path d="M2 17l10 5 10-5"></path>
          <path d="M2 12l10 5 10-5"></path>
        </svg>
      ),
    },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-blue-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl text-blue-700">
                Nossos Programas
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl">
                Conheça os programas desenvolvidos pela Casa da Menina para garantir o desenvolvimento integral e o
                bem-estar das meninas acolhidas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8">
            {programs.map((program, index) => (
              <Card key={index} className="overflow-hidden">
                <CardHeader className="bg-blue-50">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-yellow-200 flex items-center justify-center text-yellow-700">
                      {program.icon}
                    </div>
                    <CardTitle className="text-2xl text-blue-700">{program.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-gray-600 mb-4">{program.description}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-blue-700 mb-3">Principais atividades:</h4>
                      <ul className="space-y-2">
                        {program.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-start gap-2">
                            <div className="h-2 w-2 rounded-full bg-yellow-400 mt-2 flex-shrink-0"></div>
                            <span className="text-gray-600">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-blue-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-blue-700">Nossos Resultados</h2>
            <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl">
              Números que demonstram o impacto positivo dos nossos programas na vida das meninas acolhidas.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-4xl font-bold text-blue-700 mb-2">150+</div>
                <p className="text-gray-600">Meninas acolhidas desde 2010</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-4xl font-bold text-blue-700 mb-2">85%</div>
                <p className="text-gray-600">Taxa de sucesso em adoções</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-4xl font-bold text-blue-700 mb-2">100%</div>
                <p className="text-gray-600">Meninas matriculadas na escola</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-4xl font-bold text-blue-700 mb-2">25</div>
                <p className="text-gray-600">Profissionais especializados</p>
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
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-blue-700">
                Ajude a Manter Nossos Programas
              </h2>
              <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl">
                Sua contribuição é fundamental para continuarmos oferecendo todos esses programas com qualidade e
                dedicação às nossas meninas.
              </p>
            </div>
            <div className="space-x-4">
              <Link href="/doar">
                <Button className="bg-yellow-500 hover:bg-yellow-600 text-white">Fazer uma Doação</Button>
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
