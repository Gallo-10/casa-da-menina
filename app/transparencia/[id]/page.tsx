"use client"

import { useParams, useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import TransparencyDocument from "@/components/transparency-document"
import { PostsService } from "@/lib/services/posts.service"
import type { TransparencyDocumentData } from "@/lib/types/transparency"

export default function TransparencyDocumentPage() {
  const params = useParams()
  const router = useRouter()
  const documentId = params.id as string

  const [document, setDocument] = useState<TransparencyDocumentData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        setLoading(true)
        setError(null)

        const fetchedDocument = await PostsService.getPostById(documentId)

        setDocument(fetchedDocument)
      } catch (err) {
        setError("Erro ao carregar documento. Tente novamente.")
      } finally {
        setLoading(false)
      }
    }

    if (documentId) {
      fetchDocument()
    }
  }, [documentId])

  const handleBack = () => {
    router.push("/transparencia")
  }

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen items-center justify-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Carregando documento...</h1>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col min-h-screen items-center justify-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Erro ao carregar</h1>
        <p className="text-gray-600 mb-4">{error}</p>
        <Button onClick={handleBack} className="bg-blue-600 hover:bg-blue-700">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar ao Portal da Transparência
        </Button>
      </div>
    )
  }

  if (!document) {
    return (
      <div className="flex flex-col min-h-screen items-center justify-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Documento não encontrado</h1>
        <Button onClick={handleBack} className="bg-blue-600 hover:bg-blue-700">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar ao Portal da Transparência
        </Button>
      </div>
    )
  }

  return <TransparencyDocument document={document} onBack={handleBack} />
}
