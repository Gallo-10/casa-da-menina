"use client"
import { useState, useEffect } from 'react'
import { InstagramGrid } from "./instagram-grid"
import { GraphApiResponse, GraphPaging, GraphFeedPost } from '@/lib/api/graph-api/graph-api.interface'
import { GraphApi } from '@/lib/api/graph-api/instagram.api'

interface InstagramSectionProps extends Partial<GraphApiResponse> {
  title?: string
  subtitle?: string
  instagramUsername?: string
  limit?: number
}

export function InstagramSection({
  data = [],
  paging,
  title = "Acompanhe Nossa Jornada",
  subtitle = "Veja os momentos especiais e atividades da Casa da Menina através das nossas redes sociais.",
  instagramUsername = "casada.menina",
  limit = 8,
}: InstagramSectionProps) {
  const defaultPaging: GraphPaging = paging ?? { cursors: { before: '', after: '' } }
  const [fetched, setFetched] = useState<GraphApiResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true)
        setError(null)
        const resp = await GraphApi.getFeedPosts()
        setFetched(resp)
      } catch (e: any) {
        setError(e?.message || 'Erro ao buscar posts do Instagram')
        // Em caso de erro, usa dados vindos por props como fallback
        setFetched({ data: data as GraphFeedPost[], paging: defaultPaging })
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  const gridResponse: GraphApiResponse = fetched ?? { data: data as GraphFeedPost[], paging: defaultPaging }
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-white to-blue-50/30">
      <div className="container px-4 md:px-6">
        {/* Header da seção */}
        <div className="flex flex-col items-center space-y-4 text-center mb-12">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-blue-700">
              {title}
            </h2>
            <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl">
              {subtitle}
            </p>
          </div>

          {/* Link para o Instagram */}
          <div className="flex items-center gap-2 mt-4">
            <a
              href={`https://instagram.com/${instagramUsername}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
              Siga @{instagramUsername}
            </a>
          </div>
        </div>

        {/* Grid de posts */}
        {loading ? (
          <div className="w-full max-w-6xl mx-auto">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6 grid-rows-2">
              {Array.from({ length: limit }).map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-200 rounded-lg aspect-square mb-3"></div>
                  <div className="flex items-center gap-3 px-3">
                    <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-24"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <p className="text-gray-500 text-sm">Não foi possível carregar os posts do Instagram</p>
          </div>
        ) : (
          <InstagramGrid {...gridResponse} limit={limit} />
        )}

        {/* Call to action adicional */}
        <div className="flex justify-center mt-8">
          <a
            href={`https://instagram.com/${instagramUsername}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200 flex items-center gap-1"
          >
            Ver mais posts no Instagram
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}