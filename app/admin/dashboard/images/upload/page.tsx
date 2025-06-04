"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Upload } from "lucide-react"

export default function UploadImagePage() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [location, setLocation] = useState("")
  const [image, setImage] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setImage(file)

      // Create preview
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulação de envio - em produção, isso enviaria para o backend
    setTimeout(() => {
      setIsSubmitting(false)
      router.push("/admin/dashboard?tab=images")
    }, 1500)
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center mb-6">
        <Button variant="ghost" onClick={() => router.back()} className="mr-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar
        </Button>
        <h1 className="text-2xl font-bold text-pink-700">Adicionar Nova Imagem</h1>
      </div>

      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Informações da Imagem</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome da Imagem</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: Banner Principal"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Localização no Site</Label>
              <Select value={location} onValueChange={setLocation} required>
                <SelectTrigger id="location">
                  <SelectValue placeholder="Selecione onde a imagem será exibida" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="home">Página Inicial</SelectItem>
                  <SelectItem value="about">Página Sobre</SelectItem>
                  <SelectItem value="programs">Página Programas</SelectItem>
                  <SelectItem value="transparency">Portal da Transparência</SelectItem>
                  <SelectItem value="contact">Página de Contato</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Selecionar Imagem</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center">
                {preview ? (
                  <div className="w-full flex flex-col items-center">
                    <img src={preview || "/placeholder.svg"} alt="Preview" className="max-h-64 object-contain mb-4" />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setImage(null)
                        setPreview(null)
                      }}
                    >
                      Remover e selecionar outra
                    </Button>
                  </div>
                ) : (
                  <>
                    <Upload className="h-8 w-8 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500 mb-2">Arraste uma imagem aqui ou clique para selecionar</p>
                    <Input
                      id="image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                      required
                    />
                    <Button type="button" variant="outline" onClick={() => document.getElementById("image")?.click()}>
                      Selecionar Imagem
                    </Button>
                  </>
                )}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-pink-600 hover:bg-pink-700" disabled={isSubmitting || !image}>
              {isSubmitting ? "Enviando..." : "Enviar Imagem"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
