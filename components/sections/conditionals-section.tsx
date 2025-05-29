import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Brain, Settings, Info, AlertCircle } from "lucide-react"

export function ConditionalsSection() {
  return (
    <section id="condicionais" className="mb-16">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Estruturas Condicionais</h2>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-purple-500" />
              if / else if / else
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700">Executa código baseado em condições verdadeiras ou falsas.</p>

            <div className="bg-gray-900 rounded-lg p-4 text-green-400 font-mono text-sm">
              <div className="text-gray-500">// Estrutura básica</div>
              let idade = 18;
              <br />
              <br />
              <span className="text-blue-400">if</span> (idade {"<"} 13) {"{"}
              <br />
              &nbsp;&nbsp;console.log("Criança");
              <br />
              {"}"} <span className="text-blue-400">else if</span> (idade {"<"} 18) {"{"}
              <br />
              &nbsp;&nbsp;console.log("Adolescente");
              <br />
              {"}"} <span className="text-blue-400">else</span> {"{"}
              <br />
              &nbsp;&nbsp;console.log("Adulto");
              <br />
              {"}"}
            </div>

            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription>
                <strong>Dica:</strong> Para uma única instrução, as chaves são opcionais, mas é recomendado sempre
                usá-las para melhor legibilidade.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-blue-500" />
              switch / case
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700">Útil quando você tem muitas condições baseadas no mesmo valor.</p>

            <div className="bg-gray-900 rounded-lg p-4 text-green-400 font-mono text-sm">
              <div className="text-gray-500">// Exemplo com dias da semana</div>
              let dia = 3;
              <br />
              let nomeDia;
              <br />
              <br />
              <span className="text-blue-400">switch</span> (dia) {"{"}
              <br />
              &nbsp;&nbsp;<span className="text-blue-400">case</span> 1:
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;nomeDia = "Segunda";
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-400">break</span>;<br />
              &nbsp;&nbsp;<span className="text-blue-400">case</span> 2:
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;nomeDia = "Terça";
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-400">break</span>;<br />
              &nbsp;&nbsp;<span className="text-blue-400">default</span>:<br />
              &nbsp;&nbsp;&nbsp;&nbsp;nomeDia = "Dia inválido";
              <br />
              {"}"}
            </div>

            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                <strong>Importante:</strong> Não esqueça do <code>break</code> para evitar que o código continue
                executando os próximos casos.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
