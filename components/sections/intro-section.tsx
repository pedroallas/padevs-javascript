import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Play, Target, Lightbulb, CheckCircle, Globe, Database, Settings, Rocket } from "lucide-react"

export function IntroSection() {
  return (
    <section id="introducao" className="mb-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Aprenda JavaScript Completo</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Um guia completo e interativo para dominar JavaScript, desde os conceitos básicos até técnicas avançadas de
          programação.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <Card className="border-blue-200 bg-blue-50/50">
          <CardHeader>
            <BookOpen className="h-8 w-8 text-blue-600 mb-2" />
            <CardTitle className="text-blue-900">Conteúdo Estruturado</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-blue-700">Aprenda de forma progressiva com conteúdo organizado do básico ao avançado.</p>
          </CardContent>
        </Card>

        <Card className="border-green-200 bg-green-50/50">
          <CardHeader>
            <Play className="h-8 w-8 text-green-600 mb-2" />
            <CardTitle className="text-green-900">Exemplos Interativos</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-green-700">Teste e execute código diretamente no navegador com exemplos práticos.</p>
          </CardContent>
        </Card>

        <Card className="border-purple-200 bg-purple-50/50">
          <CardHeader>
            <Target className="h-8 w-8 text-purple-600 mb-2" />
            <CardTitle className="text-purple-900">Exercícios Práticos</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-purple-700">Desafios e exercícios para fixar o conhecimento adquirido.</p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-yellow-900">
            <Lightbulb className="h-5 w-5" />O que é JavaScript?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-700">
            JavaScript é uma linguagem de programação dinâmica e versátil, originalmente criada para adicionar
            interatividade às páginas web. Hoje, é uma das linguagens mais populares do mundo, usada tanto no frontend
            quanto no backend.
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Características Principais:</h4>
              <ul className="space-y-1 text-sm text-gray-700">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Linguagem interpretada
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Tipagem dinâmica
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Orientada a objetos e funcional
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Executa no navegador e servidor
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Onde é Usado:</h4>
              <ul className="space-y-1 text-sm text-gray-700">
                <li className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-blue-500" />
                  Desenvolvimento web frontend
                </li>
                <li className="flex items-center gap-2">
                  <Database className="h-4 w-4 text-green-500" />
                  Desenvolvimento backend (Node.js)
                </li>
                <li className="flex items-center gap-2">
                  <Settings className="h-4 w-4 text-purple-500" />
                  Aplicações desktop (Electron)
                </li>
                <li className="flex items-center gap-2">
                  <Rocket className="h-4 w-4 text-red-500" />
                  Aplicações móveis (React Native)
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
