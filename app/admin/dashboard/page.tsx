"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, ImageIcon, LayoutDashboard, LogOut, Plus, Trash2 } from "lucide-react"
import { useAuthGuard } from "@/lib/hooks/use-auth-guard"
import { AuthService } from "@/lib/services/auth.service"
import { PostsService } from "@/lib/services/posts.service"
import type { TransparencyPost } from "@/lib/types/transparency"

export default function AdminDashboard() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("overview")
  const { isAuthenticated, isLoading } = useAuthGuard()

  // Estados para dados reais da API
  const [posts, setPosts] = useState<TransparencyPost[]>([])
  const [totalPosts, setTotalPosts] = useState(0)
  const [isLoadingPosts, setIsLoadingPosts] = useState(true)
  const [postsError, setPostsError] = useState<string | null>(null)
  const [deletingPostId, setDeletingPostId] = useState<string | null>(null)

  // Buscar posts da API
  const fetchPosts = async () => {
    try {
      setIsLoadingPosts(true)
      setPostsError(null)

      const allPosts = await PostsService.getAllPosts()

      setPosts(allPosts)
      setTotalPosts(allPosts.length)

    } catch (error) {
      setPostsError('Erro ao carregar posts')
    } finally {
      setIsLoadingPosts(false)
    }
  }

  // Deletar post
  const handleDeletePost = async (postId: string) => {
    if (!confirm('Tem certeza que deseja deletar esta postagem? Esta ação não pode ser desfeita.')) {
      return
    }

    try {
      setDeletingPostId(postId)

      await PostsService.deletePost(postId)

      // Atualizar lista de posts
      await fetchPosts()

    } catch (error) {
      alert('Erro ao deletar postagem. Tente novamente.')
    } finally {
      setDeletingPostId(null)
    }
  }

  // Carregar dados quando componente monta e usuário está autenticado
  useEffect(() => {
    if (isAuthenticated) {
      fetchPosts()
    }
  }, [isAuthenticated])

  // Verificar URL para abrir aba específica
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search)
      const tabParam = urlParams.get('tab')
      if (tabParam && ['overview', 'posts', 'images'].includes(tabParam)) {
        setActiveTab(tabParam)
      }
    }
  }, [])

  const handleLogout = async () => {
    await AuthService.logout()
    router.push('/admin')
  }

  // Atualizar URL quando aba muda
  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
    const url = new URL(window.location.href)
    url.searchParams.set('tab', tab)
    window.history.replaceState({}, '', url.toString())
  }

  // Mostrar loading enquanto verifica autenticação
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-2 text-gray-600">Verificando autenticação...</p>
        </div>
      </div>
    )
  }

  // Se não autenticado, o hook já redireciona
  if (!isAuthenticated) {
    return null
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
              onClick={() => handleTabChange("overview")}
            >
              <LayoutDashboard className="mr-2 h-4 w-4" />
              Visão Geral
            </Button>
            <Button
              variant={activeTab === "posts" ? "default" : "ghost"}
              className={
                activeTab === "posts" ? "bg-blue-600 hover:bg-blue-700 w-full justify-start" : "w-full justify-start"
              }
              onClick={() => handleTabChange("posts")}
            >
              <FileText className="mr-2 h-4 w-4" />
              Postagens
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

          <Tabs defaultValue="overview" value={activeTab} onValueChange={handleTabChange} className="w-full">
            <TabsList className="md:hidden grid w-full grid-cols-3">
              <TabsTrigger value="overview">Visão Geral</TabsTrigger>
              <TabsTrigger value="posts">Postagens</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total de Postagens</CardTitle>
                    <FileText className="h-4 w-4 text-blue-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {isLoadingPosts ? (
                        <div className="animate-pulse">...</div>
                      ) : postsError ? (
                        <span className="text-red-500">Erro</span>
                      ) : (
                        totalPosts
                      )}
                    </div>
                    {!isLoadingPosts && !postsError && (
                      <p className="text-xs text-muted-foreground">
                        {totalPosts === 1 ? '1 postagem encontrada' : `${totalPosts} postagens encontradas`}
                      </p>
                    )}
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
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="posts">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Postagens de Transparência</CardTitle>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        onClick={fetchPosts}
                        disabled={isLoadingPosts}
                      >
                        {isLoadingPosts ? 'Carregando...' : 'Atualizar'}
                      </Button>
                      <Link href="/admin/dashboard/posts/new">
                        <Button className="bg-blue-600 hover:bg-blue-700">
                          <Plus className="mr-2 h-4 w-4" /> Nova Postagem
                        </Button>
                      </Link>
                    </div>
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
                        {isLoadingPosts ? (
                          <tr>
                            <td colSpan={4} className="py-8 text-center text-gray-500">
                              <div className="flex items-center justify-center">
                                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900 mr-2"></div>
                                Carregando posts...
                              </div>
                            </td>
                          </tr>
                        ) : postsError ? (
                          <tr>
                            <td colSpan={4} className="py-8 text-center text-red-500">
                              {postsError}
                            </td>
                          </tr>
                        ) : posts.length === 0 ? (
                          <tr>
                            <td colSpan={4} className="py-8 text-center text-gray-500">
                              Nenhuma postagem encontrada
                            </td>
                          </tr>
                        ) : (
                          posts.map((post) => (
                            <tr key={post.id} className="border-b">
                              <td className="py-3 px-2">{post.title}</td>
                              <td className="py-3 px-2">{post.date}</td>
                              <td className="py-3 px-2">{post.type}</td>
                              <td className="py-3 px-2 text-right">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleDeletePost(post.id)}
                                  disabled={deletingPostId === post.id}
                                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                >
                                  {deletingPostId === post.id ? (
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600"></div>
                                  ) : (
                                    <>
                                      <Trash2 className="h-4 w-4 mr-1" />
                                      Deletar
                                    </>
                                  )}
                                </Button>
                              </td>
                            </tr>
                          ))
                        )}
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
