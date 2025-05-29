"use client"

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Target } from "lucide-react"
import { useState } from "react"

export function ExerciseSection() {
  const [showSolution, setShowSolution] = useState(false)

  return (
    <section id="exercicio-basico" className="mb-16">
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-900">
            <Target className="h-5 w-5" />
            Exercício Prático: Calculadora de IMC
          </CardTitle>
          <CardDescription>
            Vamos criar uma calculadora de Índice de Massa Corporal usando os conceitos aprendidos
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-white rounded-lg p-4 border">
            <h4 className="font-semibold mb-3">Desafio:</h4>
            <p className="text-gray-700 mb-4">
              Crie um programa que calcule o IMC (peso / altura²) e classifique o resultado:
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 mb-4">
              <li>Abaixo de 18.5: Abaixo do peso</li>
              <li>18.5 - 24.9: Peso normal</li>
              <li>25.0 - 29.9: Sobrepeso</li>
              <li>30.0 ou mais: Obesidade</li>
            </ul>

            <Button
              variant="outline"
              className="mb-4"
              onClick={() => setShowSolution(!showSolution)}
            >
              {showSolution ? "Ocultar Solução" : "Ver Solução"}
            </Button>

            {showSolution && (
              <div className="bg-gray-100 rounded-lg p-4 mt-4">
                <h4 className="font-semibold mb-3">Solução:</h4>
                <p className="text-gray-700">
                  Aqui está uma possível solução para o exercício:
                </p>
                <pre className="bg-gray-200 rounded-lg p-3 text-sm mt-2 overflow-x-auto">
                  <code>
                    {`function calcularIMC(peso, altura) {
  const imc = peso / (altura * altura);
  if (imc < 18.5) {
    return "Abaixo do peso";
  } else if (imc < 25) {
    return "Peso normal";
  } else if (imc < 30) {
    return "Sobrepeso";
  } else {
    return "Obesidade";
  }
}`}
                  </code>
                </pre>
              </div>\
            )}
