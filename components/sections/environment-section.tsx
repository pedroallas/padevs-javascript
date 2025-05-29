import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Globe, FileText, Info } from "lucide-react"

export function EnvironmentSection() {
  return (
    <section id="ambiente" className="mb-16">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Configuração do Ambiente</h2>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-blue-500" />
              Console do Navegador
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700">O console do navegador é a ferramenta mais básica para testar JavaScript.</p>

            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription>
                <strong>Como abrir:</strong> Pressione F12 ou Ctrl+Shift+I (Cmd+Option+I no Mac) e vá para a aba
                "Console".
              </AlertDescription>
            </Alert>

            <div className="bg-gray-900 rounded-lg p-4 text-green-400 font-mono text-sm">
              <div className="text-gray-500">// Teste no console:</div>
              <div>console.log("Olá, JavaScript!");</div>
              <div className="text-white">// Saída: Olá, JavaScript!</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-green-500" />
              Arquivo HTML + JS
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700">Para projetos maiores, crie arquivos separados.</p>

            <Tabs defaultValue="html" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="html">index.html</TabsTrigger>
                <TabsTrigger value="js">script.js</TabsTrigger>
              </TabsList>

              <TabsContent value="html">
                <div className="bg-gray-900 rounded-lg p-4 text-green-400 font-mono text-sm">
                  <div className="text-blue-400">{"<!DOCTYPE html>"}</div>
                  <div className="text-blue-400">{"<html>"}</div>
                  <div className="text-blue-400">{"<head>"}</div>
                  <div className="text-yellow-400 ml-4">{"<title>Meu JS</title>"}</div>
                  <div className="text-blue-400">{"</head>"}</div>
                  <div className="text-blue-400">{"<body>"}</div>
                  <div className="text-yellow-400 ml-4">{'<script src="script.js"></script>'}</div>
                  <div className="text-blue-400">{"</body>"}</div>
                  <div className="text-blue-400">{"</html>"}</div>
                </div>
              </TabsContent>

              <TabsContent value="js">
                <div className="bg-gray-900 rounded-lg p-4 text-green-400 font-mono text-sm">
                  <div className="text-gray-500">// script.js</div>
                  <div>console.log("JavaScript carregado!");</div>
                  <div>alert("Bem-vindo!");</div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
