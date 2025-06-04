"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="w-full border-b bg-white">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-3">
          <img src="/images/logo.png" alt="Logo Casa da Menina" className="h-10 w-10" />
          <span className="text-2xl font-bold text-pink-600">Casa da Menina</span>
        </Link>
        <nav className="hidden md:flex gap-6">
          <Link href="/" className="text-sm font-medium hover:underline underline-offset-4">
            Início
          </Link>
          <Link href="/sobre" className="text-sm font-medium hover:underline underline-offset-4">
            Sobre Nós
          </Link>
          <Link href="/programas" className="text-sm font-medium hover:underline underline-offset-4">
            Programas
          </Link>
          <Link href="/transparencia" className="text-sm font-medium hover:underline underline-offset-4">
            Transparência
          </Link>
          <Link href="/contato" className="text-sm font-medium hover:underline underline-offset-4">
            Contato
          </Link>
        </nav>
        <div className="hidden md:flex">
          <Link href="/admin">
            <Button variant="outline" className="border-pink-600 text-pink-600 hover:bg-pink-100">
              Área Administrativa
            </Button>
          </Link>
        </div>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="outline" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <nav className="flex flex-col gap-4 mt-8">
              <Link href="/" onClick={() => setIsOpen(false)} className="text-lg font-medium hover:text-pink-600">
                Início
              </Link>
              <Link href="/sobre" onClick={() => setIsOpen(false)} className="text-lg font-medium hover:text-pink-600">
                Sobre Nós
              </Link>
              <Link
                href="/programas"
                onClick={() => setIsOpen(false)}
                className="text-lg font-medium hover:text-pink-600"
              >
                Programas
              </Link>
              <Link
                href="/transparencia"
                onClick={() => setIsOpen(false)}
                className="text-lg font-medium hover:text-pink-600"
              >
                Transparência
              </Link>
              <Link
                href="/contato"
                onClick={() => setIsOpen(false)}
                className="text-lg font-medium hover:text-pink-600"
              >
                Contato
              </Link>
              <Link href="/admin" onClick={() => setIsOpen(false)}>
                <Button variant="outline" className="w-full border-pink-600 text-pink-600 hover:bg-pink-100">
                  Área Administrativa
                </Button>
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
