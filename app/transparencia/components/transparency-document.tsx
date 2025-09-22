"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Download, Calendar, Tag, FileText } from "lucide-react"
import type { TransparencyDocumentData } from "@/lib/types/transparency"

interface TransparencyDocumentProps {
  document: TransparencyDocumentData
  onBack: () => void
}

export default function TransparencyDocument({ document, onBack }: TransparencyDocumentProps) {
  // Função para converter base64 em blob e abrir PDF
  const openPdfFromBase64 = (base64Data: string, fileName: string) => {
    try {
      const base64String = base64Data.includes(',') ? base64Data.split(',')[1] : base64Data

      const binaryString = window.atob(base64String)
      const bytes = new Uint8Array(binaryString.length)

      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i)
      }

      const blob = new Blob([bytes], { type: 'application/pdf' })
      const url = URL.createObjectURL(blob)

      window.open(url, '_blank')

      setTimeout(() => URL.revokeObjectURL(url), 1000)
    } catch (error) {
      alert('Erro ao abrir o documento. Tente novamente.')
    }
  }

  // Função para download do PDF
  const downloadPdfFromBase64 = (base64Data: string, fileName: string) => {
    try {
      // Remover prefixo data: se existir
      const base64String = base64Data.includes(',') ? base64Data.split(',')[1] : base64Data

      // Converter base64 para bytes
      const binaryString = window.atob(base64String)
      const bytes = new Uint8Array(binaryString.length)

      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i)
      }

      // Criar blob PDF
      const blob = new Blob([bytes], { type: 'application/pdf' })
      const url = URL.createObjectURL(blob)

      // Criar link de download
      const link = window.document.createElement('a')
      link.href = url
      link.download = fileName
      link.click()

      // Limpar URL
      URL.revokeObjectURL(url)
    } catch (error) {
      alert('Erro ao baixar o documento. Tente novamente.')
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <section className="w-full py-8 bg-blue-50 border-b">
        <div className="container px-4 md:px-6">
          <div className="flex items-center mb-4">
            <Button variant="ghost" onClick={onBack} className="mr-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar
            </Button>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center">
                <Tag className="mr-1 h-4 w-4" />
                {document.type}
              </div>
              <div className="flex items-center">
                <FileText className="mr-1 h-4 w-4" />
                Por: {document.author}
              </div>
            </div>

            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl text-blue-700">
              {document.title}
            </h1>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="w-full py-12">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <Card>
                <CardContent className="p-8">
                  <div
                    className="prose prose-lg max-w-none prose-headings:text-blue-700 prose-h2:text-2xl prose-h3:text-xl prose-h4:text-lg prose-strong:text-gray-800 prose-ul:text-gray-700 prose-li:text-gray-700 prose-p:text-gray-700"
                    dangerouslySetInnerHTML={{ __html: document.content }}
                  />
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Document Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Informações do Documento</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <span className="font-medium text-gray-700">Data de Publicação:</span>
                    <p className="text-gray-600">{document.date}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Categoria:</span>
                    <p className="text-gray-600">{document.type}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Responsável:</span>
                    <p className="text-gray-600">{document.author}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Attachments */}
              {document.attachments && document.attachments.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Anexos</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {document.attachments.map((attachment, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div
                          className="flex items-center space-x-2 flex-1 cursor-pointer hover:bg-gray-100 rounded p-1 transition-colors"
                          onClick={() => attachment.url && openPdfFromBase64(attachment.url, attachment.name)}
                        >
                          <FileText className="h-4 w-4 text-blue-600" />
                          <div>
                            <p className="text-sm font-medium text-blue-600 hover:text-blue-800">{attachment.name}</p>
                            <p className="text-xs text-gray-500">{attachment.size}</p>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => attachment.url && downloadPdfFromBase64(attachment.url, attachment.name)}
                          title="Baixar arquivo"
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}

              {/* Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Ações</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {document.attachments && document.attachments.length > 0 && (
                    <Button
                      className="w-full"
                      variant="outline"
                      onClick={() => {
                        document.attachments?.forEach((attachment, index) => {
                          if (attachment.url) {
                            setTimeout(() => {
                              downloadPdfFromBase64(attachment.url!, attachment.name)
                            }, index * 500) // Delay entre downloads
                          }
                        })
                      }}
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Baixar Todos os Anexos
                    </Button>
                  )}
                  <Button
                    className="w-full"
                    variant="outline"
                    onClick={() => window.print()}
                  >
                    Imprimir Documento
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
