import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { Database, Zap, Lightbulb, AlertCircle } from "lucide-react"

export function FundamentalsSection() {
  return (
    <section id="fundamentos" className="mb-16">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Fundamentos do JavaScript</h2>

      {/* Variáveis */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5 text-blue-500" />
            Variáveis e Tipos de Dados
          </CardTitle>
          <CardDescription>Aprenda a declarar variáveis e trabalhar com diferentes tipos de dados</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Declaração de Variáveis:</h4>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <Badge variant="destructive" className="mb-2">
                  var
                </Badge>
                <p className="text-sm text-gray-700">Escopo de função, pode ser redeclarada</p>
                <div className="bg-gray-900 rounded p-2 mt-2 text-green-400 font-mono text-xs">var nome = "João";</div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <Badge className="mb-2">let</Badge>
                <p className="text-sm text-gray-700">Escopo de bloco, pode ser reatribuída</p>
                <div className="bg-gray-900 rounded p-2 mt-2 text-green-400 font-mono text-xs">let idade = 25;</div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <Badge variant="secondary" className="mb-2">
                  const
                </Badge>
                <p className="text-sm text-gray-700">Escopo de bloco, não pode ser reatribuída</p>
                <div className="bg-gray-900 rounded p-2 mt-2 text-green-400 font-mono text-xs">const PI = 3.14159;</div>
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Tipos de Dados Primitivos:</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline">string</Badge>
                    <span className="text-sm text-gray-600">Texto</span>
                  </div>
                  <div className="bg-gray-900 rounded p-2 text-green-400 font-mono text-xs">
                    let nome = "JavaScript";
                    <br />
                    let frase = 'Olá mundo!';
                    <br />
                    let template = `Bem-vindo, ${"${nome}"}`;
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline">number</Badge>
                    <span className="text-sm text-gray-600">Números</span>
                  </div>
                  <div className="bg-gray-900 rounded p-2 text-green-400 font-mono text-xs">
                    let inteiro = 42;
                    <br />
                    let decimal = 3.14;
                    <br />
                    let negativo = -10;
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline">boolean</Badge>
                    <span className="text-sm text-gray-600">Verdadeiro/Falso</span>
                  </div>
                  <div className="bg-gray-900 rounded p-2 text-green-400 font-mono text-xs">
                    let ativo = true;
                    <br />
                    let inativo = false;
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline">undefined/null</Badge>
                    <span className="text-sm text-gray-600">Valores vazios</span>
                  </div>
                  <div className="bg-gray-900 rounded p-2 text-green-400 font-mono text-xs">
                    let variavel; // undefined
                    <br />
                    let dados = null; // null
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Alert>
            <Lightbulb className="h-4 w-4" />
            <AlertDescription>
              <strong>Dica:</strong> Use <code>typeof</code> para verificar o tipo de uma variável:
              <code className="ml-1">typeof "texto"</code> retorna <code>"string"</code>.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Operadores */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-yellow-500" />
            Operadores
          </CardTitle>
          <CardDescription>Operadores para realizar cálculos, comparações e operações lógicas</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="aritmeticos" className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
              <TabsTrigger value="aritmeticos">Aritméticos</TabsTrigger>
              <TabsTrigger value="comparacao">Comparação</TabsTrigger>
              <TabsTrigger value="logicos">Lógicos</TabsTrigger>
              <TabsTrigger value="atribuicao">Atribuição</TabsTrigger>
            </TabsList>

            <TabsContent value="aritmeticos" className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <h5 className="font-semibold mb-3">Operadores Básicos:</h5>
                <div className="bg-gray-900 rounded p-3 text-green-400 font-mono text-sm">
                  let a = 10, b = 3;
                  <br />
                  <br />
                  console.log(a + b); // 13 (soma)
                  <br />
                  console.log(a - b); // 7 (subtração)
                  <br />
                  console.log(a * b); // 30 (multiplicação)
                  <br />
                  console.log(a / b); // 3.33... (divisão)
                </div>
              </div>
            </TabsContent>

            <TabsContent value="comparacao" className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <h5 className="font-semibold mb-3">Operadores de Comparação:</h5>
                <div className="bg-gray-900 rounded p-3 text-green-400 font-mono text-sm">
                  let x = 5, y = "5";
                  <br />
                  <br />
                  console.log(x == y); // true (igualdade com conversão)
                  <br />
                  console.log(x === y); // false (igualdade estrita)
                  <br />
                  console.log(x != y); // false (diferença com conversão)
                  <br />
                  console.log(x !== y); // true (diferença estrita)
                </div>
              </div>

              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Importante:</strong> Sempre prefira <code>===</code> e <code>!==</code>
                  para evitar conversões automáticas inesperadas.
                </AlertDescription>
              </Alert>
            </TabsContent>

            <TabsContent value="logicos" className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <h5 className="font-semibold mb-3">Operadores Lógicos:</h5>
                <div className="bg-gray-900 rounded p-3 text-green-400 font-mono text-sm">
                  let a = true, b = false;
                  <br />
                  <br />
                  console.log(a && b); // false (AND - ambos devem ser true)
                  <br />
                  console.log(a || b); // true (OR - pelo menos um deve ser true)
                  <br />
                  console.log(!a); // false (NOT - inverte o valor)
                </div>
              </div>
            </TabsContent>

            <TabsContent value="atribuicao" className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <h5 className="font-semibold mb-3">Operadores de Atribuição:</h5>
                <div className="bg-gray-900 rounded p-3 text-green-400 font-mono text-sm">
                  let num = 10;
                  <br />
                  <br />
                  num += 5; // num = num + 5 (15)
                  <br />
                  num -= 3; // num = num - 3 (12)
                  <br />
                  num *= 2; // num = num * 2 (24)
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </section>
  )
}
