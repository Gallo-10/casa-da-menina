import Link from "next/link"

export default function Footer() {
  return (
    <footer className="w-full border-t bg-white py-6">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <h3 className="text-lg font-medium text-pink-600">Casa da Menina</h3>
            <p className="text-sm text-gray-500">
              ONG dedicada ao acolhimento de meninas órfãs de até 10 anos em situação de vulnerabilidade.
            </p>
          </div>
          <div className="space-y-3">
            <h3 className="text-lg font-medium">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm text-gray-500 hover:text-pink-600">
                  Início
                </Link>
              </li>
              <li>
                <Link href="/sobre" className="text-sm text-gray-500 hover:text-pink-600">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link href="/programas" className="text-sm text-gray-500 hover:text-pink-600">
                  Programas
                </Link>
              </li>
              <li>
                <Link href="/transparencia" className="text-sm text-gray-500 hover:text-pink-600">
                  Transparência
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="text-lg font-medium">Como Ajudar</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/doar" className="text-sm text-gray-500 hover:text-pink-600">
                  Fazer uma Doação
                </Link>
              </li>
              <li>
                <Link href="/voluntariado" className="text-sm text-gray-500 hover:text-pink-600">
                  Seja Voluntário
                </Link>
              </li>
              <li>
                <Link href="/parcerias" className="text-sm text-gray-500 hover:text-pink-600">
                  Parcerias
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="text-lg font-medium">Contato</h3>
            <ul className="space-y-2">
              <li className="text-sm text-gray-500">
                <strong>Endereço:</strong> Rua Exemplo, 123
              </li>
              <li className="text-sm text-gray-500">
                <strong>Telefone:</strong> (00) 1234-5678
              </li>
              <li className="text-sm text-gray-500">
                <strong>Email:</strong> contato@casadamenina.org
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-6">
          <p className="text-center text-sm text-gray-500">
            © {new Date().getFullYear()} Casa da Menina. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
