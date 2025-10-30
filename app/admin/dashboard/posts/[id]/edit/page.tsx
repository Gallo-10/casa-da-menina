"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Trash2, Upload } from "lucide-react"
import { useAuthGuard } from "@/lib/hooks/use-auth-guard"
import { PostsService } from "@/lib/services/posts.service"
import type { TransparencyCategory, DocumentAttachment } from "@/lib/types/transparency"

export default function EditPostPage() {
  const { isAuthenticated, isLoading } = useAuthGuard()
  const router = useRouter()
  const params = useParams<{ id: string }>()
  const id = Array.isArray(params?.id) ? params?.id[0] : params?.id

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [type, setType] = useState("")
  const [files, setFiles] = useState<File[]>([])
  const [existingAttachments, setExistingAttachments] = useState<DocumentAttachment[]>([])
  const [attachmentsToDelete, setAttachmentsToDelete] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [loadingPost, setLoadingPost] = useState(true)
  const [loadError, setLoadError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true
    const load = async () => {
      if (!id) return
      try {
        setLoadingPost(true)
        const post = await PostsService.getPostById(String(id))
        if (!mounted) return
        setTitle(post.title ?? "")
        setContent(post.content ?? "")
        setType((post.type as string) ?? "")
        setExistingAttachments(post.attachments || [])
      } catch (e) {
        setLoadError("Não foi possível carregar a postagem.")
      } finally {
        setLoadingPost(false)
      }
    }
    load()
    return () => { mounted = false }
  }, [id])

  if (isLoading || loadingPost) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-2 text-gray-600">Carregando...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const filesArray = files && files.length > 0 ? files : undefined

      await PostsService.updatePost({
        id: String(id),
        title,
        content,
        type: type as TransparencyCategory,
        files: filesArray,
        novos_arquivos: filesArray,
        remover_arquivos_ids: attachmentsToDelete
      })

      router.push("/admin/dashboard?tab=posts")
    } catch (error) {
      // Optionally show a toast
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center mb-6">
        <Button variant="ghost" onClick={() => router.back()} className="mr-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar
        </Button>
        <h1 className="text-2xl font-bold text-blue-700">Editar Postagem</h1>
      </div>

      {loadError && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded mb-4">{loadError}</div>
      )}

      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Informações da Postagem</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Título</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Digite o título da postagem"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Tipo</Label>
              <Select value={type} onValueChange={setType} required>
                <SelectTrigger id="type">
                  <SelectValue placeholder="Selecione o tipo de postagem" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Documentos Constitutivos">Documentos Constitutivos</SelectItem>
                  <SelectItem value="Organização Administrativa">Organização Administrativa</SelectItem>
                  <SelectItem value="Contratos Vigentes">Contratos Vigentes</SelectItem>
                  <SelectItem value="Relação dos Fornecedores">Relação dos Fornecedores</SelectItem>
                  <SelectItem value="Mural de Publicações">Mural de Publicações</SelectItem>
                  <SelectItem value="Relação das Parcerias">Relação das Parcerias</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Conteúdo</Label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Digite o conteúdo detalhado da postagem"
                className="min-h-[200px]"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="files">Documentos atuais</Label>
              {existingAttachments.length > 0 ? (
                <ul className="space-y-2">
                  {existingAttachments.map((att, idx) => (
                    <li key={`${att.name}-${idx}`} className="flex items-center justify-between rounded border p-2">
                      <div>
                        <p className="text-sm font-medium">{att.name}</p>
                        <p className="text-xs text-muted-foreground">{att.size || 'Arquivo existente'}</p>
                      </div>
                      <Button
                        type="button"
                        variant="destructive"
                        onClick={() => {
                          const attachmentToRemove = existingAttachments[idx]
                          if (attachmentToRemove.id) {
                            const idToDelete = attachmentToRemove.id
                            setAttachmentsToDelete(prev => [...prev, idToDelete])
                          }

                          setExistingAttachments(prev => prev.filter((_, i) => i !== idx))
                        }}
                      >
                        <Trash2 className="h-4 w-4 mr-2" /> Remover
                      </Button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground">Nenhum documento atual. Você pode adicionar novos abaixo.</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="files">Adicionar novos documentos</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center">
                <Upload className="h-8 w-8 text-gray-400 mb-2" />
                <p className="text-sm text-gray-500 mb-2">Arraste arquivos aqui ou clique para selecionar</p>
                <Input
                  id="files"
                  type="file"
                  multiple
                  onChange={(e) => {
                    const fl = e.target.files
                    const newFiles = fl ? Array.from(fl) : []
                    if (newFiles.length === 0) return
                    setFiles(prev => [...prev, ...newFiles])
                  }}
                  className="hidden"
                />
                <Button type="button" variant="outline" onClick={() => document.getElementById("files")?.click()}>
                  Selecionar Arquivos
                </Button>
                {files && files.length > 0 && (
                  <div className="mt-4 w-full">
                    <p className="text-sm font-medium">Novos arquivos selecionados:</p>
                    <ul className="list-disc list-inside text-sm text-gray-600">
                      {files.map((file, index) => (
                        <li key={index}>{file.name}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <p className="text-xs text-muted-foreground">Os documentos listados acima serão mantidos. Ao clicar em Remover, eles serão excluídos após salvar.</p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Cancelar
            </Button>
            <div className="space-x-2">
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700" disabled={isSubmitting}>
                {isSubmitting ? "Salvando..." : "Salvar alterações"}
              </Button>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
