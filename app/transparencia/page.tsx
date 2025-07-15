"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { PostsService } from "@/lib/services/posts.service"
import type { TransparencyPost, TransparencyCategory } from "@/lib/types/transparency"

export default function TransparencyPage() {
  const [currentFilter, setCurrentFilter] = useState<TransparencyCategory>("Todos")
  const [posts, setPosts] = useState<TransparencyPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true)
        setError(null)

        const fetchedPostsRaw = await PostsService.getAllPostsMeta()
        const mappedPosts = fetchedPostsRaw.map((post: any) => {
          const dateObj = new Date(post.postagem_created_at)
          const formattedDate = dateObj.toLocaleDateString('pt-BR')
          return {
            id: post.postagem_id,
            title: post.postagem_titulo,
            content: post.postagem_conteudo,
            type: post.postagem_tipo,
            date: formattedDate, 
            updatedAt: post.postagem_updated_at,
            excerpt: post.postagem_conteudo?.slice(0, 150) + (post.postagem_conteudo?.length > 150 ? '...' : ''),
          }
        })
        setPosts(mappedPosts)
      } catch (err) {
        setError("Erro ao carregar documentos. Tente novamente.")
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [currentFilter])

  const handleFilterChange = (filter: TransparencyCategory) => {
    setCurrentFilter(filter)
  }

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
          <div className="flex flex-wrap gap-2 justify-center mb-4">
            <Button
              variant={currentFilter === "Todos" ? "outline" : "ghost"}
              className={currentFilter === "Todos" ? "border-blue-600 text-blue-600 hover:bg-blue-100" : ""}
              onClick={() => handleFilterChange("Todos")}
            >
              Todos
            </Button>
            <Button
              variant={currentFilter === "Documentos Constitutivos" ? "outline" : "ghost"}
              className={currentFilter === "Documentos Constitutivos" ? "border-blue-600 text-blue-600 hover:bg-blue-100" : ""}
              onClick={() => handleFilterChange("Documentos Constitutivos")}
            >
              Documentos Constitutivos
            </Button>
            <Button
              variant={currentFilter === "Organização Administrativa" ? "outline" : "ghost"}
              className={currentFilter === "Organização Administrativa" ? "border-blue-600 text-blue-600 hover:bg-blue-100" : ""}
              onClick={() => handleFilterChange("Organização Administrativa")}
            >
              Organização Administrativa
            </Button>
            <Button
              variant={currentFilter === "Contratos Vigentes" ? "outline" : "ghost"}
              className={currentFilter === "Contratos Vigentes" ? "border-blue-600 text-blue-600 hover:bg-blue-100" : ""}
              onClick={() => handleFilterChange("Contratos Vigentes")}
            >
              Contratos Vigentes
            </Button>
            <Button
              variant={currentFilter === "Relação dos Fornecedores" ? "outline" : "ghost"}
              className={currentFilter === "Relação dos Fornecedores" ? "border-blue-600 text-blue-600 hover:bg-blue-100" : ""}
              onClick={() => handleFilterChange("Relação dos Fornecedores")}
            >
              Relação dos Fornecedores
            </Button>
            <Button
              variant={currentFilter === "Mural de Publicações" ? "outline" : "ghost"}
              className={currentFilter === "Mural de Publicações" ? "border-blue-600 text-blue-600 hover:bg-blue-100" : ""}
              onClick={() => handleFilterChange("Mural de Publicações")}
            >
              Mural de Publicações
            </Button>
            <Button
              variant={currentFilter === "Relação das Parcerias" ? "outline" : "ghost"}
              className={currentFilter === "Relação das Parcerias" ? "border-blue-600 text-blue-600 hover:bg-blue-100" : ""}
              onClick={() => handleFilterChange("Relação das Parcerias")}
            >
              Relação das Parcerias
            </Button>
          </div>
          {/* Debug info */}
          <div className="text-center mt-4">
            <p className="text-sm text-gray-500">
              Filtro atual: <strong>{currentFilter}</strong> |
              Posts encontrados: <strong>{posts.length}</strong> |
              Status: <strong>{loading ? 'Carregando...' : error ? 'Erro' : 'Carregado'}</strong>
            </p>
          </div>
        </div>
      </section>

      {/* Posts Section */}
      <section className="w-full py-12">
        <div className="container px-4 md:px-6">
          {loading ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium text-gray-600">Carregando documentos...</h3>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium text-red-600">Erro ao carregar</h3>
              <p className="text-gray-500 mt-2">{error}</p>
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium text-gray-600">Nenhum documento encontrado para esta categoria.</h3>
              <p className="text-gray-500 mt-2">Tente selecionar outra categoria ou volte para "Todos".</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
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
                      <Button variant="outline" className="w-full border-blue-600 text-blue-600 hover:bg-blue-100">
                        Ver Detalhes
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
