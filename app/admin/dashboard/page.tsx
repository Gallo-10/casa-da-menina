"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, ImageIcon, LayoutDashboard, LogOut, Plus } from "lucide-react"
import { useAdminAuth } from "@/lib/hooks/useAdminAuth"

export default function AdminDashboard() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("overview")
  const { logout } = useAdminAuth()

  // Simulação de posts de transparência
  const transparencyPosts = [
    {
      id: 1,
      title: "Relatório Financeiro - 1º Trimestre 2025",
      date: "01/04/2025",
      type: "Financeiro",
    },
    {
      id: 2,
      title: "Prestação de Contas - Projeto Educação em Foco",
      date: "15/03/2025",
      type: "Projetos",
    },
    {
      id: 3,
      title: "Auditoria Externa - Exercício 2024",
      date: "28/02/2025",
      type: "Auditoria",
    },
    {
      id: 4,
      title: "Doações Recebidas - Campanha de Inverno",
      date: "10/02/2025",
      type: "Doações",
    },
  ]

  // Simulação de imagens do site
  const siteImages = [
    {
      id: 1,
      name: "Banner Principal",
      location: "Página Inicial",
      lastUpdated: "10/03/2025",
    },
    {
      id: 2,
      name: "Imagem Sobre Nós",
      location: "Página Sobre",
      lastUpdated: "05/02/2025",
    },
    {
      id: 3,
      name: "Banner Programas",
      location: "Página Programas",
      lastUpdated: "20/01/2025",
    },
  ]

  const handleLogout = async () => {
    await logout()
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex">
        {/* Sidebar */}
        <div className="hidden md:flex flex-col w-64 bg-white border-r h-screen p-4">
          <div className="text-xl font-bold text-blue-700 mb-8">Painel Administrativo</div>
          <nav className="space-y-2 flex-1">
            <Button
              variant={activeTab === "overview" ? "default" : "ghost"}
              className={
                activeTab === "overview" ? "bg-blue-600 hover:bg-blue-700 w-full justify-start" : "w-full justify-start"
              }
              onClick={() => setActiveTab("overview")}
            >
              <LayoutDashboard className="mr-2 h-4 w-4" />
              Visão Geral
            </Button>
            <Button
              variant={activeTab === "posts" ? "default" : "ghost"}
              className={
                activeTab === "posts" ? "bg-blue-600 hover:bg-blue-700 w-full justify-start" : "w-full justify-start"
              }
              onClick={() => setActiveTab("posts")}
            >
              <FileText className="mr-2 h-4 w-4" />
              Postagens
            </Button>
            <Button
              variant={activeTab === "images" ? "default" : "ghost"}
              className={
                activeTab === "images" ? "bg-blue-600 hover:bg-blue-700 w-full justify-start" : "w-full justify-start"
              }
              onClick={() => setActiveTab("images")}
            >
              <ImageIcon className="mr-2 h-4 w-4" />
              Imagens
            </Button>
          </nav>
          <Button variant="outline" className="mt-auto" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Sair
          </Button>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 overflow-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-blue-700">Bem-vindo, Administrador</h1>
            <div className="md:hidden">
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="md:hidden grid w-full grid-cols-3">
              <TabsTrigger value="overview">Visão Geral</TabsTrigger>
              <TabsTrigger value="posts">Postagens</TabsTrigger>
              <TabsTrigger value="images">Imagens</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total de Postagens</CardTitle>
                    <FileText className="h-4 w-4 text-blue-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{transparencyPosts.length}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Imagens do Site</CardTitle>
                    <ImageIcon className="h-4 w-4 text-blue-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{siteImages.length}</div>
                    <p className="text-xs text-gray-500">
                      Última atualização em{" "}
                      {
                        siteImages.sort(
                          (a, b) =>
                            new Date(b.lastUpdated.split("/").reverse().join("-")).getTime() -
                            new Date(a.lastUpdated.split("/").reverse().join("-")).getTime(),
                        )[0].lastUpdated
                      }
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Ações Rápidas</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Link href="/admin/dashboard/posts/new">
                      <Button className="w-full bg-blue-600 hover:bg-blue-700">
                        <Plus className="mr-2 h-4 w-4" /> Nova Postagem
                      </Button>
                    </Link>
                    <Link href="/admin/dashboard/images/upload">
                      <Button variant="outline" className="w-full">
                        <Plus className="mr-2 h-4 w-4" /> Adicionar Imagem
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="posts">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Postagens de Transparência</CardTitle>
                    <Link href="/admin/dashboard/posts/new">
                      <Button className="bg-blue-600 hover:bg-blue-700">
                        <Plus className="mr-2 h-4 w-4" /> Nova Postagem
                      </Button>
                    </Link>
                  </div>
                  <CardDescription>Gerencie todas as postagens do Portal da Transparência</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-2">Título</th>
                          <th className="text-left py-3 px-2">Data</th>
                          <th className="text-left py-3 px-2">Tipo</th>
                          <th className="text-right py-3 px-2">Ações</th>
                        </tr>
                      </thead>
                      <tbody>
                        {transparencyPosts.map((post) => (
                          <tr key={post.id} className="border-b">
                            <td className="py-3 px-2">{post.title}</td>
                            <td className="py-3 px-2">{post.date}</td>
                            <td className="py-3 px-2">{post.type}</td>
                            <td className="py-3 px-2 text-right">
                              <Link href={`/admin/dashboard/posts/edit/${post.id}`}>
                                <Button variant="ghost" size="sm">
                                  Editar
                                </Button>
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="images">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Imagens do Site</CardTitle>
                    <Link href="/admin/dashboard/images/upload">
                      <Button className="bg-blue-600 hover:bg-blue-700">
                        <Plus className="mr-2 h-4 w-4" /> Adicionar Imagem
                      </Button>
                    </Link>
                  </div>
                  <CardDescription>Gerencie as imagens utilizadas no site</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-2">Nome</th>
                          <th className="text-left py-3 px-2">Localização</th>
                          <th className="text-left py-3 px-2">Última Atualização</th>
                          <th className="text-right py-3 px-2">Ações</th>
                        </tr>
                      </thead>
                      <tbody>
                        {siteImages.map((image) => (
                          <tr key={image.id} className="border-b">
                            <td className="py-3 px-2">{image.name}</td>
                            <td className="py-3 px-2">{image.location}</td>
                            <td className="py-3 px-2">{image.lastUpdated}</td>
                            <td className="py-3 px-2 text-right">
                              <Link href={`/admin/dashboard/images/edit/${image.id}`}>
                                <Button variant="ghost" size="sm">
                                  Substituir
                                </Button>
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
