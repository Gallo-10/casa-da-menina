"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Upload } from "lucide-react"
import { useAdminAuth } from "@/lib/hooks/useAdminAuth"
import { PostsService } from "@/lib/services/posts.service"
import type { TransparencyCategory } from "@/lib/types/transparency"

export default function NewPostPage() {
  useAdminAuth() // Verificar autenticação
  const router = useRouter()
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [type, setType] = useState("")
  const [files, setFiles] = useState<FileList | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const filesArray = files ? Array.from(files) : undefined

      await PostsService.createPost({
        title,
        content,
        type: type as TransparencyCategory,
        files: filesArray,
        isDraft: false
      })

      router.push("/admin/dashboard?tab=posts")
    } catch (error) {
      console.error('Erro ao criar post:', error)
      // Aqui você pode adicionar uma notificação de erro
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSaveDraft = async () => {
    setIsSubmitting(true)

    try {
      const filesArray = files ? Array.from(files) : undefined

      await PostsService.saveDraft({
        title,
        content,
        type: type as TransparencyCategory,
        files: filesArray
      })

      router.push("/admin/dashboard?tab=posts")
    } catch (error) {
      console.error('Erro ao salvar rascunho:', error)
      // Aqui você pode adicionar uma notificação de erro
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
        <h1 className="text-2xl font-bold text-blue-700">Nova Postagem de Transparência</h1>
      </div>

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
              <Label htmlFor="files">Arquivos (opcional)</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center">
                <Upload className="h-8 w-8 text-gray-400 mb-2" />
                <p className="text-sm text-gray-500 mb-2">Arraste arquivos aqui ou clique para selecionar</p>
                <Input id="files" type="file" multiple onChange={(e) => setFiles(e.target.files)} className="hidden" />
                <Button type="button" variant="outline" onClick={() => document.getElementById("files")?.click()}>
                  Selecionar Arquivos
                </Button>
                {files && files.length > 0 && (
                  <div className="mt-4 w-full">
                    <p className="text-sm font-medium">Arquivos selecionados:</p>
                    <ul className="list-disc list-inside text-sm text-gray-600">
                      {Array.from(files).map((file, index) => (
                        <li key={index}>{file.name}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Cancelar
            </Button>
            <div className="space-x-2">
              <Button type="button" variant="outline" disabled={isSubmitting} onClick={handleSaveDraft}>
                {isSubmitting ? "Salvando..." : "Salvar como Rascunho"}
              </Button>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700" disabled={isSubmitting}>
                {isSubmitting ? "Publicando..." : "Publicar"}
              </Button>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
