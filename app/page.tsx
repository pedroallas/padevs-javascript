"use client";

import type React from "react";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import {
  Code,
  Play,
  BookOpen,
  Lightbulb,
  Target,
  CheckCircle,
  AlertCircle,
  Info,
  Zap,
  Brain,
  Rocket,
  Globe,
  Database,
  Settings,
  Users,
  FileText,
  ExternalLink,
  Menu,
  Sun,
  Moon,
} from "lucide-react";
import {
  ChevronDown,
  ChevronRight,
  Copy,
  Check,
  Terminal,
  CloudLightningIcon as Lightning,
} from "lucide-react";
import Image from "next/image";

export default function JavaScriptLearningPage() {
  const [activeSection, setActiveSection] = useState("introducao");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showSolution, setShowSolution] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [consoleOutput, setConsoleOutput] = useState<string[]>([]);
  const [consoleInput, setConsoleInput] = useState("");
  const [progress, setProgress] = useState(0);
  const [darkMode, setDarkMode] = useState(false);

  // Initialize dark mode from localStorage
  useEffect(() => {
    const savedDarkMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(savedDarkMode);
    if (savedDarkMode) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section[id]");
      const scrollPosition = window.scrollY + 80; // Match the headerOffset value

      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop;
        const sectionHeight = (section as HTMLElement).offsetHeight;
        const sectionId = section.getAttribute("id");

        if (
          scrollPosition >= sectionTop &&
          scrollPosition < sectionTop + sectionHeight
        ) {
          if (sectionId) {
            setActiveSection(sectionId);
          }
        }
      });

      // Check if we're at the bottom of the page
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 100
      ) {
        setActiveSection("recursos");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80; // Adjust this value to match the header height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setSidebarOpen(false);
    }
  };

  const toggleSolution = (exerciseId: string) => {
    setShowSolution((prev) => ({
      ...prev,
      [exerciseId]: !prev[exerciseId],
    }));
  };

  const copyToClipboard = async (code: string, id: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(id);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (err) {
      console.error("Falha ao copiar código:", err);
    }
  };

  const executeCode = (code: string) => {
    try {
      // Captura console.log
      const originalLog = console.log;
      const logs: string[] = [];
      console.log = (...args) => {
        logs.push(args.map((arg) => String(arg)).join(" "));
      };

      // Executa o código
      eval(code);

      // Restaura console.log
      console.log = originalLog;

      setConsoleOutput((prev) => [...prev, ...logs]);
    } catch (error) {
      setConsoleOutput((prev) => [...prev, `Erro: ${error}`]);
    }
  };

  const handleConsoleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (consoleInput.trim()) {
      setConsoleOutput((prev) => [...prev, `> ${consoleInput}`]);
      executeCode(consoleInput);
      setConsoleInput("");
    }
  };

  const clearConsole = () => {
    setConsoleOutput([]);
  };

  const calculateProgress = () => {
    const totalSections = sections.length;
    const currentIndex = sections.findIndex(
      (section) => section.id === activeSection
    );
    // Ensure we reach 100% when on the last section
    if (currentIndex === totalSections - 1) {
      return 100;
    }
    return Math.round(((currentIndex + 1) / totalSections) * 100);
  };

  useEffect(() => {
    setProgress(calculateProgress());
  }, [activeSection]);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem("darkMode", newDarkMode.toString());
    document.documentElement.classList.toggle("dark", newDarkMode);
  };

  const sections = [
    { title: "Introdução", id: "introducao", icon: BookOpen },
    { title: "Ambiente", id: "ambiente", icon: Globe },
    { title: "Fundamentos", id: "fundamentos", icon: Database },
    { title: "Condicionais", id: "condicionais", icon: Brain },
    { title: "Exercício", id: "exercicio-basico", icon: Target },
    { title: "Console", id: "console-interativo", icon: Terminal },
    { title: "Exercícios Extras", id: "exercicios-extras", icon: Lightning },
    { title: "Glossário", id: "glossario", icon: FileText },
    { title: "Recursos", id: "recursos", icon: Users },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-50 h-full w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="font-semibold text-gray-900 dark:text-white">
            JavaScript Completo
          </h2>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            {sections.map((section) => (
              <li key={section.id}>
                <button
                  onClick={() => scrollToSection(section.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    activeSection === section.id
                      ? "bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  <section.icon className="h-4 w-4" />
                  <span className="text-sm">{section.title}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="md:ml-64">
        {/* Header */}
        <header className="sticky top-0 z-30 w-full border-b border-gray-200 dark:border-gray-700 bg-white/95 dark:bg-gray-800/95 backdrop-blur">
          <div className="flex h-16 items-center px-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden mr-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-4 flex-1">
                <Image
                  src="/logo.svg"
                  alt="JavaScript Logo"
                  width={150}
                  height={150}
                  className="rounded-lg hidden md:block"
                />
                <div className="flex-1 text-center md:text-left">
                  <h1 className="text-xl font-bold text-gray-900 dark:text-white text-center md:text-left">
                    JavaScript Completo
                  </h1>
                  <p className="text-sm text-gray-600 dark:text-gray-400 text-center md:text-left">
                    Do Básico ao Avançado
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 md:gap-4">
                {/* Progress Bar */}
                <div className="hidden md:flex items-center space-x-3">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Progresso:
                  </span>
                  <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-blue-600 dark:bg-blue-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {progress}%
                  </span>
                </div>

                {/* Dark Mode Toggle */}
                <button
                  onClick={toggleDarkMode}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition-colors"
                >
                  {darkMode ? (
                    <Sun className="h-5 w-5" />
                  ) : (
                    <Moon className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          {/* Introdução */}
          <section id="introducao" className="mb-16">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Aprenda JavaScript Completo
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Um guia completo e interativo para dominar JavaScript, desde os
                conceitos básicos até técnicas avançadas de programação.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <Card className="border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-900/20">
                <CardHeader>
                  <BookOpen className="h-8 w-8 text-blue-600 dark:text-blue-400 mb-2" />
                  <CardTitle className="text-blue-900 dark:text-blue-100">
                    Conteúdo Estruturado
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-blue-700 dark:text-blue-300">
                    Aprenda de forma progressiva com conteúdo organizado do
                    básico ao avançado.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-green-200 dark:border-green-800 bg-green-50/50 dark:bg-green-900/20">
                <CardHeader>
                  <Play className="h-8 w-8 text-green-600 dark:text-green-400 mb-2" />
                  <CardTitle className="text-green-900 dark:text-green-100">
                    Exemplos Interativos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-green-700 dark:text-green-300">
                    Teste e execute código diretamente no navegador com exemplos
                    práticos.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-purple-200 dark:border-purple-800 bg-purple-50/50 dark:bg-purple-900/20">
                <CardHeader>
                  <Target className="h-8 w-8 text-purple-600 dark:text-purple-400 mb-2" />
                  <CardTitle className="text-purple-900 dark:text-purple-100">
                    Exercícios Práticos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-purple-700 dark:text-purple-300">
                    Desafios e exercícios para fixar o conhecimento adquirido.
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-yellow-200 dark:border-yellow-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-yellow-900 dark:text-yellow-100">
                  <Lightbulb className="h-5 w-5" />O que é JavaScript?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700 dark:text-gray-300">
                  JavaScript é uma linguagem de programação dinâmica e versátil,
                  originalmente criada para adicionar interatividade às páginas
                  web. Hoje, é uma das linguagens mais populares do mundo, usada
                  tanto no frontend quanto no backend.
                </p>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                      Características Principais:
                    </h4>
                    <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
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
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                      Onde é Usado:
                    </h4>
                    <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
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

          {/* Configuração do Ambiente */}
          <section id="ambiente" className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
              Configuração do Ambiente
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="dark:bg-gray-800 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5 text-blue-500" />
                    Console do Navegador
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-700 dark:text-gray-300">
                    O console do navegador é a ferramenta mais básica para
                    testar JavaScript.
                  </p>

                  <Alert className="dark:bg-blue-900/20 dark:border-blue-800">
                    <Info className="h-4 w-4" />
                    <AlertDescription className="dark:text-gray-300">
                      <strong>Como abrir:</strong> Pressione F12 ou Ctrl+Shift+I
                      (Cmd+Option+I no Mac) e vá para a aba "Console".
                    </AlertDescription>
                  </Alert>

                  <div className="bg-gray-900 dark:bg-gray-950 rounded-lg p-4 text-green-400 font-mono text-sm">
                    <div className="text-gray-500">// Teste no console:</div>
                    <div>console.log("Olá, JavaScript!");</div>
                    <div className="text-white">// Saída: Olá, JavaScript!</div>
                  </div>
                </CardContent>
              </Card>

              <Card className="dark:bg-gray-800 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-green-500" />
                    Arquivo HTML + JS
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-700 dark:text-gray-300">
                    Para projetos maiores, crie arquivos separados.
                  </p>

                  <Tabs defaultValue="html" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 dark:bg-gray-700">
                      <TabsTrigger
                        value="html"
                        className="dark:data-[state=active]:bg-gray-600"
                      >
                        index.html
                      </TabsTrigger>
                      <TabsTrigger
                        value="js"
                        className="dark:data-[state=active]:bg-gray-600"
                      >
                        script.js
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="html">
                      <div className="bg-gray-900 dark:bg-gray-950 rounded-lg p-4 text-green-400 font-mono text-sm">
                        <div className="text-blue-400">{"<!DOCTYPE html>"}</div>
                        <div className="text-blue-400">{"<html>"}</div>
                        <div className="text-blue-400">{"<head>"}</div>
                        <div className="text-yellow-400 ml-4">
                          {"<title>Meu JS</title>"}
                        </div>
                        <div className="text-blue-400">{"</head>"}</div>
                        <div className="text-blue-400">{"<body>"}</div>
                        <div className="text-yellow-400 ml-4">
                          {'<script src="script.js"></script>'}
                        </div>
                        <div className="text-blue-400">{"</body>"}</div>
                        <div className="text-blue-400">{"</html>"}</div>
                      </div>
                    </TabsContent>

                    <TabsContent value="js">
                      <div className="bg-gray-900 dark:bg-gray-950 rounded-lg p-4 text-green-400 font-mono text-sm">
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

          {/* Fundamentos */}
          <section id="fundamentos" className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
              Fundamentos do JavaScript
            </h2>

            {/* Variáveis */}
            <Card className="mb-8 dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5 text-blue-500" />
                  Variáveis e Tipos de Dados
                </CardTitle>
                <CardDescription className="dark:text-gray-400">
                  Aprenda a declarar variáveis e trabalhar com diferentes tipos
                  de dados
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                    Declaração de Variáveis:
                  </h4>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                      <Badge variant="destructive" className="mb-2">
                        var
                      </Badge>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        Escopo de função, pode ser redeclarada
                      </p>
                      <div className="bg-gray-900 dark:bg-gray-950 rounded p-2 mt-2 text-green-400 font-mono text-xs">
                        var nome = "João";
                      </div>
                    </div>

                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                      <Badge className="mb-2">let</Badge>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        Escopo de bloco, pode ser reatribuída
                      </p>
                      <div className="bg-gray-900 dark:bg-gray-950 rounded p-2 mt-2 text-green-400 font-mono text-xs">
                        let idade = 25;
                      </div>
                    </div>

                    <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                      <Badge variant="secondary" className="mb-2">
                        const
                      </Badge>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        Escopo de bloco, não pode ser reatribuída
                      </p>
                      <div className="bg-gray-900 dark:bg-gray-950 rounded p-2 mt-2 text-green-400 font-mono text-xs">
                        const PI = 3.14159;
                      </div>
                    </div>
                  </div>
                </div>

                <Separator className="dark:bg-gray-700" />

                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                    Tipos de Dados Primitivos:
                  </h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge
                            variant="outline"
                            className="dark:border-gray-600"
                          >
                            string
                          </Badge>
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            Texto
                          </span>
                        </div>
                        <div className="bg-gray-900 dark:bg-gray-950 rounded p-2 text-green-400 font-mono text-xs">
                          let nome = "JavaScript";
                          <br />
                          let frase = 'Olá mundo!';
                          <br />
                          let template = `Bem-vindo, nome`;
                        </div>
                      </div>

                      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge
                            variant="outline"
                            className="dark:border-gray-600"
                          >
                            number
                          </Badge>
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            Números
                          </span>
                        </div>
                        <div className="bg-gray-900 dark:bg-gray-950 rounded p-2 text-green-400 font-mono text-xs">
                          let inteiro = 42;
                          <br />
                          let decimal = 3.14;
                          <br />
                          let negativo = -10;
                        </div>
                      </div>

                      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge
                            variant="outline"
                            className="dark:border-gray-600"
                          >
                            boolean
                          </Badge>
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            Verdadeiro/Falso
                          </span>
                        </div>
                        <div className="bg-gray-900 dark:bg-gray-950 rounded p-2 text-green-400 font-mono text-xs">
                          let ativo = true;
                          <br />
                          let inativo = false;
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge
                            variant="outline"
                            className="dark:border-gray-600"
                          >
                            undefined
                          </Badge>
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            Não definido
                          </span>
                        </div>
                        <div className="bg-gray-900 dark:bg-gray-950 rounded p-2 text-green-400 font-mono text-xs">
                          let variavel;
                          <br />
                          console.log(variavel); // undefined
                        </div>
                      </div>

                      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge
                            variant="outline"
                            className="dark:border-gray-600"
                          >
                            null
                          </Badge>
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            Valor nulo
                          </span>
                        </div>
                        <div className="bg-gray-900 dark:bg-gray-950 rounded p-2 text-green-400 font-mono text-xs">
                          let dados = null;
                          <br />
                          console.log(dados); // null
                        </div>
                      </div>

                      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge
                            variant="outline"
                            className="dark:border-gray-600"
                          >
                            symbol
                          </Badge>
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            Identificador único
                          </span>
                        </div>
                        <div className="bg-gray-900 dark:bg-gray-950 rounded p-2 text-green-400 font-mono text-xs">
                          let id = Symbol('id');
                          <br />
                          let id2 = Symbol('id');
                          <br />
                          console.log(id === id2); // false
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <Alert className="dark:bg-yellow-900/20 dark:border-yellow-800">
                  <Lightbulb className="h-4 w-4" />
                  <AlertDescription className="dark:text-gray-300">
                    <strong>Dica:</strong> Use{" "}
                    <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">
                      typeof
                    </code>{" "}
                    para verificar o tipo de uma variável:
                    <code className="ml-1 bg-gray-200 dark:bg-gray-700 px-1 rounded">
                      typeof "texto"
                    </code>{" "}
                    retorna{" "}
                    <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">
                      "string"
                    </code>
                    .
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>

            {/* Operadores */}
            <Card className="mb-8 dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-yellow-500" />
                  Operadores
                </CardTitle>
                <CardDescription className="dark:text-gray-400">
                  Operadores para realizar cálculos, comparações e operações
                  lógicas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="aritmeticos" className="w-full">
                  <TabsList className="grid w-full grid-cols-4 dark:bg-gray-700">
                    <TabsTrigger
                      value="aritmeticos"
                      className="dark:data-[state=active]:bg-gray-600"
                    >
                      Aritméticos
                    </TabsTrigger>
                    <TabsTrigger
                      value="comparacao"
                      className="dark:data-[state=active]:bg-gray-600"
                    >
                      Comparação
                    </TabsTrigger>
                    <TabsTrigger
                      value="logicos"
                      className="dark:data-[state=active]:bg-gray-600"
                    >
                      Lógicos
                    </TabsTrigger>
                    <TabsTrigger
                      value="atribuicao"
                      className="dark:data-[state=active]:bg-gray-600"
                    >
                      Atribuição
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="aritmeticos" className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                        <h5 className="font-semibold mb-3 dark:text-white">
                          Operadores Básicos:
                        </h5>
                        <div className="bg-gray-900 dark:bg-gray-950 rounded p-3 text-green-400 font-mono text-sm">
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
                          <br />
                          console.log(a % b); // 1 (resto da divisão)
                          <br />
                          console.log(a ** b); // 1000 (exponenciação)
                        </div>
                      </div>

                      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                        <h5 className="font-semibold mb-3 dark:text-white">
                          Incremento e Decremento:
                        </h5>
                        <div className="bg-gray-900 dark:bg-gray-950 rounded p-3 text-green-400 font-mono text-sm">
                          let contador = 5;
                          <br />
                          <br />
                          contador++; // 6 (pós-incremento)
                          <br />
                          ++contador; // 7 (pré-incremento)
                          <br />
                          contador--; // 6 (pós-decremento)
                          <br />
                          --contador; // 5 (pré-decremento)
                          <br />
                          <br />
                          console.log(contador); // 5
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="comparacao" className="space-y-4">
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                      <h5 className="font-semibold mb-3 dark:text-white">
                        Operadores de Comparação:
                      </h5>
                      <div className="bg-gray-900 dark:bg-gray-950 rounded p-3 text-green-400 font-mono text-sm">
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
                        <br />
                        console.log(x {">"} 3); // true (maior que)
                        <br />
                        console.log(x {"<"} 10); // true (menor que)
                        <br />
                        console.log(x {">="} 5); // true (maior ou igual)
                        <br />
                        console.log(x {"<="} 4); // false (menor ou igual)
                      </div>
                    </div>

                    <Alert className="dark:bg-red-900/20 dark:border-red-800">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription className="dark:text-gray-300">
                        <strong>Importante:</strong> Sempre prefira{" "}
                        <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">
                          ===
                        </code>{" "}
                        e{" "}
                        <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">
                          !==
                        </code>
                        para evitar conversões automáticas inesperadas.
                      </AlertDescription>
                    </Alert>
                  </TabsContent>

                  <TabsContent value="logicos" className="space-y-4">
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                      <h5 className="font-semibold mb-3 dark:text-white">
                        Operadores Lógicos:
                      </h5>
                      <div className="bg-gray-900 dark:bg-gray-950 rounded p-3 text-green-400 font-mono text-sm">
                        let a = true, b = false;
                        <br />
                        <br />
                        console.log(a && b); // false (AND - ambos devem ser
                        true)
                        <br />
                        console.log(a || b); // true (OR - pelo menos um deve
                        ser true)
                        <br />
                        console.log(!a); // false (NOT - inverte o valor)
                        <br />
                        console.log(!b); // true
                        <br />
                        <br />
                        // Operador ternário
                        <br />
                        let resultado = a ? "verdadeiro" : "falso";
                        <br />
                        console.log(resultado); // "verdadeiro"
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="atribuicao" className="space-y-4">
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                      <h5 className="font-semibold mb-3 dark:text-white">
                        Operadores de Atribuição:
                      </h5>
                      <div className="bg-gray-900 dark:bg-gray-950 rounded p-3 text-green-400 font-mono text-sm">
                        let num = 10;
                        <br />
                        <br />
                        num += 5; // num = num + 5 (15)
                        <br />
                        num -= 3; // num = num - 3 (12)
                        <br />
                        num *= 2; // num = num * 2 (24)
                        <br />
                        num /= 4; // num = num / 4 (6)
                        <br />
                        num %= 4; // num = num % 4 (2)
                        <br />
                        num **= 3; // num = num ** 3 (8)
                        <br />
                        <br />
                        console.log(num); // 8
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </section>

          {/* Estruturas Condicionais */}
          <section id="condicionais" className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
              Estruturas Condicionais
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="dark:bg-gray-800 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5 text-purple-500" />
                    if / else if / else
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-700 dark:text-gray-300">
                    Executa código baseado em condições verdadeiras ou falsas.
                  </p>

                  <div className="bg-gray-900 dark:bg-gray-950 rounded-lg p-4 text-green-400 font-mono text-sm">
                    <div className="text-gray-500">// Estrutura básica</div>
                    let idade = 18;
                    <br />
                    <br />
                    <span className="text-blue-400">if</span> (idade {"<"} 13){" "}
                    {"{"}
                    <br />
                    &nbsp;&nbsp;console.log("Criança");
                    <br />
                    {"}"} <span className="text-blue-400">else if</span> (idade{" "}
                    {"<"} 18) {"{"}
                    <br />
                    &nbsp;&nbsp;console.log("Adolescente");
                    <br />
                    {"}"} <span className="text-blue-400">else if</span> (idade{" "}
                    {"<"} 60) {"{"}
                    <br />
                    &nbsp;&nbsp;console.log("Adulto");
                    <br />
                    {"}"} <span className="text-blue-400">else</span> {"{"}
                    <br />
                    &nbsp;&nbsp;console.log("Idoso");
                    <br />
                    {"}"}
                  </div>

                  <Alert className="dark:bg-blue-900/20 dark:border-blue-800">
                    <Info className="h-4 w-4" />
                    <AlertDescription className="dark:text-gray-300">
                      <strong>Dica:</strong> Para uma única instrução, as chaves
                      são opcionais, mas é recomendado sempre usá-las para
                      melhor legibilidade.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>

              <Card className="dark:bg-gray-800 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5 text-blue-500" />
                    switch / case
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-700 dark:text-gray-300">
                    Útil quando você tem muitas condições baseadas no mesmo
                    valor.
                  </p>

                  <div className="bg-gray-900 dark:bg-gray-950 rounded-lg p-4 text-green-400 font-mono text-sm">
                    <div className="text-gray-500">
                      // Exemplo com dias da semana
                    </div>
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
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <span className="text-blue-400">break</span>;<br />
                    &nbsp;&nbsp;<span className="text-blue-400">case</span> 2:
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;nomeDia = "Terça";
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <span className="text-blue-400">break</span>;<br />
                    &nbsp;&nbsp;<span className="text-blue-400">case</span> 3:
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;nomeDia = "Quarta";
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <span className="text-blue-400">break</span>;<br />
                    &nbsp;&nbsp;<span className="text-blue-400">default</span>:
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;nomeDia = "Dia inválido";
                    <br />
                    {"}"}
                  </div>

                  <Alert className="dark:bg-red-900/20 dark:border-red-800">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription className="dark:text-gray-300">
                      <strong>Importante:</strong> Não esqueça do{" "}
                      <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">
                        break
                      </code>{" "}
                      para evitar que o código continue executando os próximos
                      casos.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Exercício Prático */}
          <section id="exercicio-basico" className="mb-16">
            <Card className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border-green-200 dark:border-green-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-900 dark:text-green-100">
                  <Target className="h-5 w-5" />
                  Exercício Prático: Calculadora de IMC
                </CardTitle>
                <CardDescription className="dark:text-gray-300">
                  Vamos criar uma calculadora de Índice de Massa Corporal usando
                  os conceitos aprendidos
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border dark:border-gray-700">
                  <h4 className="font-semibold mb-3 dark:text-white">
                    Desafio:
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Crie um programa que calcule o IMC (peso / altura²) e
                    classifique o resultado:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-gray-400 mb-4">
                    <li>Abaixo de 18.5: Abaixo do peso</li>
                    <li>18.5 - 24.9: Peso normal</li>
                    <li>25.0 - 29.9: Sobrepeso</li>
                    <li>30.0 ou mais: Obesidade</li>
                  </ul>

                  <Button
                    variant="outline"
                    className="mb-4 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                    onClick={() => toggleSolution("imc")}
                  >
                    {showSolution.imc ? "Ocultar Solução" : "Ver Solução"}
                  </Button>

                  {showSolution.imc && (
                    <div className="bg-gray-900 dark:bg-gray-950 rounded-lg p-4 text-green-400 font-mono text-sm">
                      <div className="text-gray-500">
                        // Solução do exercício
                      </div>
                      const peso = 70; // kg
                      <br />
                      const altura = 1.75; // metros
                      <br />
                      <br />
                      const imc = peso / (altura * altura);
                      <br />
                      let classificacao;
                      <br />
                      <br />
                      if (imc {"<"} 18.5) {"{"}
                      <br />
                      &nbsp;&nbsp;classificacao = "Abaixo do peso";
                      <br />
                      {"}"} else if (imc {"<"} 25) {"{"}
                      <br />
                      &nbsp;&nbsp;classificacao = "Peso normal";
                      <br />
                      {"}"} else if (imc {"<"} 30) {"{"}
                      <br />
                      &nbsp;&nbsp;classificacao = "Sobrepeso";
                      <br />
                      {"}"} else {"{"}
                      <br />
                      &nbsp;&nbsp;classificacao = "Obesidade";
                      <br />
                      {"}"}
                      <br />
                      <br />
                      console.log(`IMC: ${"{imc.toFixed(2)}"} - $
                      {"{classificacao}"}`);
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Console Interativo */}
          <section id="console-interativo" className="mb-16">
            <Card className="bg-gradient-to-r from-gray-900 to-gray-800 dark:from-gray-950 dark:to-gray-900 text-white border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Terminal className="h-5 w-5 text-green-400" />
                  Console JavaScript Interativo
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Teste código JavaScript em tempo real
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-black dark:bg-gray-950 rounded-lg p-4 h-64 overflow-y-auto font-mono text-sm">
                  <div className="text-green-400 mb-2">
                    JavaScript Console v1.0
                  </div>
                  {consoleOutput.map((output, index) => (
                    <div key={index} className="text-gray-300 mb-1">
                      {output}
                    </div>
                  ))}
                </div>

                <form onSubmit={handleConsoleSubmit} className="flex gap-2">
                  <div className="flex-1 relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-400">
                      {">"}
                    </span>
                    <input
                      type="text"
                      value={consoleInput}
                      onChange={(e) => setConsoleInput(e.target.value)}
                      placeholder="Digite seu código JavaScript aqui..."
                      className="w-full pl-8 pr-4 py-2 bg-gray-800 dark:bg-gray-900 border border-gray-600 dark:border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-green-400"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Executar
                  </Button>
                  <Button
                    type="button"
                    onClick={clearConsole}
                    variant="outline"
                    className="border-gray-600 text-gray-300 hover:bg-gray-700"
                  >
                    Limpar
                  </Button>
                </form>

                <div className="text-sm text-gray-400">
                  <p>
                    <strong>Dicas:</strong>
                  </p>
                  <ul className="list-disc list-inside space-y-1 mt-2">
                    <li>Use console.log() para exibir resultados</li>
                    <li>Teste variáveis, funções e operadores</li>
                    <li>Experimente com os exemplos das seções acima</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Exercícios Adicionais */}
          <section id="exercicios-extras" className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
              Exercícios Práticos Adicionais
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Exercício 1: Calculadora */}
              <Card className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-200 dark:border-purple-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-purple-900 dark:text-purple-100">
                    <Lightning className="h-5 w-5" />
                    Calculadora Simples
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-700 dark:text-gray-300">
                    Crie uma calculadora que realize as quatro operações
                    básicas.
                  </p>

                  <Button
                    variant="outline"
                    onClick={() => toggleSolution("calculadora")}
                    className="flex items-center gap-2 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                  >
                    {showSolution.calculadora ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                    {showSolution.calculadora ? "Ocultar" : "Ver"} Solução
                  </Button>

                  {showSolution.calculadora && (
                    <div className="relative">
                      <button
                        onClick={() =>
                          copyToClipboard(
                            `function calculadora(a, b, operacao) {
  switch(operacao) {
    case '+': return a + b;
    case '-': return a - b;
    case '*': return a * b;
    case '/': return b !== 0 ? a / b : 'Erro: Divisão por zero';
    default: return 'Operação inválida';
  }
}

console.log(calculadora(10, 5, '+')); // 15
console.log(calculadora(10, 5, '-')); // 5
console.log(calculadora(10, 5, '*')); // 50
console.log(calculadora(10, 5, '/')); // 2`,
                            "calc"
                          )
                        }
                        className="absolute top-2 right-2 p-2 bg-gray-700 hover:bg-gray-600 rounded text-white"
                      >
                        {copiedCode === "calc" ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </button>
                      <div className="bg-gray-900 dark:bg-gray-950 rounded-lg p-4 text-green-400 font-mono text-sm">
                        function calculadora(a, b, operacao) {"{"}
                        <br />
                        &nbsp;&nbsp;switch(operacao) {"{"}
                        <br />
                        &nbsp;&nbsp;&nbsp;&nbsp;case '+': return a + b;
                        <br />
                        &nbsp;&nbsp;&nbsp;&nbsp;case '-': return a - b;
                        <br />
                        &nbsp;&nbsp;&nbsp;&nbsp;case '*': return a * b;
                        <br />
                        &nbsp;&nbsp;&nbsp;&nbsp;case '/': return b !== 0 ? a / b
                        : 'Erro: Divisão por zero';
                        <br />
                        &nbsp;&nbsp;&nbsp;&nbsp;default: return 'Operação
                        inválida';
                        <br />
                        &nbsp;&nbsp;{"}"}
                        <br />
                        {"}"}
                        <br />
                        <br />
                        console.log(calculadora(10, 5, '+')); // 15
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Exercício 2: Verificador de Número Par/Ímpar */}
              <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border-blue-200 dark:border-blue-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-900 dark:text-blue-100">
                    <Target className="h-5 w-5" />
                    Par ou Ímpar
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-700 dark:text-gray-300">
                    Crie uma função que determine se um número é par ou ímpar.
                  </p>

                  <Button
                    variant="outline"
                    onClick={() => toggleSolution("parImpar")}
                    className="flex items-center gap-2 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                  >
                    {showSolution.parImpar ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                    {showSolution.parImpar ? "Ocultar" : "Ver"} Solução
                  </Button>

                  {showSolution.parImpar && (
                    <div className="relative">
                      <button
                        onClick={() =>
                          copyToClipboard(
                            `function verificarParImpar(numero) {
  if (numero % 2 === 0) {
    return numero + " é par";
  } else {
    return numero + " é ímpar";
  }
}

// Versão mais concisa
const parOuImpar = num => num % 2 === 0 ? "par" : "ímpar";

console.log(verificarParImpar(4)); // "4 é par"
console.log(verificarParImpar(7)); // "7 é ímpar"`,
                            "parImpar"
                          )
                        }
                        className="absolute top-2 right-2 p-2 bg-gray-700 hover:bg-gray-600 rounded text-white"
                      >
                        {copiedCode === "parImpar" ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </button>
                      <div className="bg-gray-900 dark:bg-gray-950 rounded-lg p-4 text-green-400 font-mono text-sm">
                        function verificarParImpar(numero) {"{"}
                        <br />
                        &nbsp;&nbsp;if (numero % 2 === 0) {"{"}
                        <br />
                        &nbsp;&nbsp;&nbsp;&nbsp;return numero + " é par";
                        <br />
                        &nbsp;&nbsp;{"}"} else {"{"}
                        <br />
                        &nbsp;&nbsp;&nbsp;&nbsp;return numero + " é ímpar";
                        <br />
                        &nbsp;&nbsp;{"}"}
                        <br />
                        {"}"}
                        <br />
                        <br />
                        <span className="text-gray-500">
                          // Versão mais concisa
                        </span>
                        <br />
                        const parOuImpar = num ={">"} num % 2 === 0 ? "par" :
                        "ímpar";
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Exercício 3: Manipulação de Arrays */}
              <Card className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-900 dark:text-green-100">
                    <Database className="h-5 w-5" />
                    Manipulação de Arrays
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-700 dark:text-gray-300">
                    Crie funções para manipular arrays: encontrar o maior
                    número, somar todos os elementos e filtrar números pares.
                  </p>

                  <Button
                    variant="outline"
                    onClick={() => toggleSolution("arrays")}
                    className="flex items-center gap-2 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                  >
                    {showSolution.arrays ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                    {showSolution.arrays ? "Ocultar" : "Ver"} Solução
                  </Button>

                  {showSolution.arrays && (
                    <div className="relative">
                      <button
                        onClick={() =>
                          copyToClipboard(
                            `const numeros = [1, 5, 3, 9, 2, 8, 4];

// Encontrar o maior número
function encontrarMaior(arr) {
  return Math.max(...arr);
}

// Somar todos os elementos
function somarArray(arr) {
  return arr.reduce((soma, num) => soma + num, 0);
}

// Filtrar números pares
function filtrarPares(arr) {
  return arr.filter(num => num % 2 === 0);
}

console.log("Array:", numeros);
console.log("Maior número:", encontrarMaior(numeros)); // 9
console.log("Soma:", somarArray(numeros)); // 32
console.log("Números pares:", filtrarPares(numeros)); // [2, 8, 4]`,
                            "arrays"
                          )
                        }
                        className="absolute top-2 right-2 p-2 bg-gray-700 hover:bg-gray-600 rounded text-white"
                      >
                        {copiedCode === "arrays" ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </button>
                      <div className="bg-gray-900 dark:bg-gray-950 rounded-lg p-4 text-green-400 font-mono text-sm">
                        const numeros = [1, 5, 3, 9, 2, 8, 4];
                        <br />
                        <br />
                        <span className="text-gray-500">
                          // Encontrar o maior número
                        </span>
                        <br />
                        function encontrarMaior(arr) {"{"}
                        <br />
                        &nbsp;&nbsp;return Math.max(...arr);
                        <br />
                        {"}"}
                        <br />
                        <br />
                        <span className="text-gray-500">
                          // Somar todos os elementos
                        </span>
                        <br />
                        function somarArray(arr) {"{"}
                        <br />
                        &nbsp;&nbsp;return arr.reduce((soma, num) ={">"} soma +
                        num, 0);
                        <br />
                        {"}"}
                        <br />
                        <br />
                        <span className="text-gray-500">
                          // Filtrar números pares
                        </span>
                        <br />
                        function filtrarPares(arr) {"{"}
                        <br />
                        &nbsp;&nbsp;return arr.filter(num ={">"} num % 2 === 0);
                        <br />
                        {"}"}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Exercício 4: Manipulação de Strings */}
              <Card className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 border-orange-200 dark:border-orange-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-orange-900 dark:text-orange-100">
                    <FileText className="h-5 w-5" />
                    Manipulação de Strings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-700 dark:text-gray-300">
                    Crie funções para contar palavras, inverter texto e
                    verificar se uma palavra é um palíndromo.
                  </p>

                  <Button
                    variant="outline"
                    onClick={() => toggleSolution("strings")}
                    className="flex items-center gap-2 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                  >
                    {showSolution.strings ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                    {showSolution.strings ? "Ocultar" : "Ver"} Solução
                  </Button>

                  {showSolution.strings && (
                    <div className="relative">
                      <button
                        onClick={() =>
                          copyToClipboard(
                            `// Contar palavras em uma frase
function contarPalavras(frase) {
  return frase.trim().split(/\\s+/).length;
}

// Inverter texto
function inverterTexto(texto) {
  return texto.split('').reverse().join('');
}

// Verificar palíndromo
function ehPalindromo(palavra) {
  const limpa = palavra.toLowerCase().replace(/[^a-z]/g, '');
  return limpa === limpa.split('').reverse().join('');
}

// Capitalizar primeira letra de cada palavra
function capitalizarPalavras(frase) {
  return frase.split(' ')
    .map(palavra => palavra.charAt(0).toUpperCase() + palavra.slice(1).toLowerCase())
    .join(' ');
}

console.log(contarPalavras("Olá mundo JavaScript")); // 3
console.log(inverterTexto("JavaScript")); // "tpircSavaJ"
console.log(ehPalindromo("arara")); // true
console.log(capitalizarPalavras("olá mundo")); // "Olá Mundo"`,
                            "strings"
                          )
                        }
                        className="absolute top-2 right-2 p-2 bg-gray-700 hover:bg-gray-600 rounded text-white"
                      >
                        {copiedCode === "strings" ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </button>
                      <div className="bg-gray-900 dark:bg-gray-950 rounded-lg p-4 text-green-400 font-mono text-sm">
                        <span className="text-gray-500">
                          // Contar palavras em uma frase
                        </span>
                        <br />
                        function contarPalavras(frase) {"{"}
                        <br />
                        &nbsp;&nbsp;return frase.trim().split(/\\s+/).length;
                        <br />
                        {"}"}
                        <br />
                        <br />
                        <span className="text-gray-500">// Inverter texto</span>
                        <br />
                        function inverterTexto(texto) {"{"}
                        <br />
                        &nbsp;&nbsp;return texto.split('').reverse().join('');
                        <br />
                        {"}"}
                        <br />
                        <br />
                        <span className="text-gray-500">
                          // Verificar palíndromo
                        </span>
                        <br />
                        function ehPalindromo(palavra) {"{"}
                        <br />
                        &nbsp;&nbsp;const limpa =
                        palavra.toLowerCase().replace(/[^a-z]/g, '');
                        <br />
                        &nbsp;&nbsp;return limpa ===
                        limpa.split('').reverse().join('');
                        <br />
                        {"}"}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Exercício 5: Loops e Iterações */}
              <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border-indigo-200 dark:border-indigo-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-indigo-900 dark:text-indigo-100">
                    <Zap className="h-5 w-5" />
                    Loops e Iterações
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-700 dark:text-gray-300">
                    Crie uma função que gere a sequência de Fibonacci e outra
                    que calcule o fatorial de um número.
                  </p>

                  <Button
                    variant="outline"
                    onClick={() => toggleSolution("loops")}
                    className="flex items-center gap-2 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                  >
                    {showSolution.loops ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                    {showSolution.loops ? "Ocultar" : "Ver"} Solução
                  </Button>

                  {showSolution.loops && (
                    <div className="relative">
                      <button
                        onClick={() =>
                          copyToClipboard(
                            `// Sequência de Fibonacci
function fibonacci(n) {
  if (n <= 1) return n;
  
  let a = 0, b = 1;
  const sequencia = [a, b];
  
  for (let i = 2; i < n; i++) {
    const proximo = a + b;
    sequencia.push(proximo);
    a = b;
    b = proximo;
  }
  
  return sequencia;
}

// Calcular fatorial
function fatorial(n) {
  if (n <= 1) return 1;
  
  let resultado = 1;
  for (let i = 2; i <= n; i++) {
    resultado *= i;
  }
  
  return resultado;
}

// Versão recursiva do fatorial
function fatorialRecursivo(n) {
  return n <= 1 ? 1 : n * fatorialRecursivo(n - 1);
}

console.log(fibonacci(8)); // [0, 1, 1, 2, 3, 5, 8, 13]
console.log(fatorial(5)); // 120
console.log(fatorialRecursivo(5)); // 120`,
                            "loops"
                          )
                        }
                        className="absolute top-2 right-2 p-2 bg-gray-700 hover:bg-gray-600 rounded text-white"
                      >
                        {copiedCode === "loops" ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </button>
                      <div className="bg-gray-900 dark:bg-gray-950 rounded-lg p-4 text-green-400 font-mono text-sm">
                        <span className="text-gray-500">
                          // Sequência de Fibonacci
                        </span>
                        <br />
                        function fibonacci(n) {"{"}
                        <br />
                        &nbsp;&nbsp;if (n {"<="} 1) return n;
                        <br />
                        &nbsp;&nbsp;
                        <br />
                        &nbsp;&nbsp;let a = 0, b = 1;
                        <br />
                        &nbsp;&nbsp;const sequencia = [a, b];
                        <br />
                        &nbsp;&nbsp;
                        <br />
                        &nbsp;&nbsp;for (let i = 2; i {"<"} n; i++) {"{"}
                        <br />
                        &nbsp;&nbsp;&nbsp;&nbsp;const proximo = a + b;
                        <br />
                        &nbsp;&nbsp;&nbsp;&nbsp;sequencia.push(proximo);
                        <br />
                        &nbsp;&nbsp;&nbsp;&nbsp;a = b;
                        <br />
                        &nbsp;&nbsp;&nbsp;&nbsp;b = proximo;
                        <br />
                        &nbsp;&nbsp;{"}"}
                        <br />
                        &nbsp;&nbsp;
                        <br />
                        &nbsp;&nbsp;return sequencia;
                        <br />
                        {"}"}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Exercício 6: Objetos e Métodos */}
              <Card className="bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20 border-teal-200 dark:border-teal-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-teal-900 dark:text-teal-100">
                    <Settings className="h-5 w-5" />
                    Objetos e Métodos
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-700 dark:text-gray-300">
                    Crie um objeto "Pessoa" com propriedades e métodos para
                    calcular idade e apresentar-se.
                  </p>

                  <Button
                    variant="outline"
                    onClick={() => toggleSolution("objetos")}
                    className="flex items-center gap-2 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                  >
                    {showSolution.objetos ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                    {showSolution.objetos ? "Ocultar" : "Ver"} Solução
                  </Button>

                  {showSolution.objetos && (
                    <div className="relative">
                      <button
                        onClick={() =>
                          copyToClipboard(
                            `// Objeto Pessoa com métodos
const pessoa = {
  nome: "João",
  sobrenome: "Silva",
  anoNascimento: 1990,
  
  // Método para calcular idade
  calcularIdade() {
    const anoAtual = new Date().getFullYear();
    return anoAtual - this.anoNascimento;
  },
  
  // Método para apresentação
  apresentar() {
    return \`Olá, eu sou \${this.nome} \${this.sobrenome} e tenho \${this.calcularIdade()} anos.\`;
  },
  
  // Método para nome completo
  nomeCompleto() {
    return \`\${this.nome} \${this.sobrenome}\`;
  }
};

// Função construtora
function Pessoa(nome, sobrenome, anoNascimento) {
  this.nome = nome;
  this.sobrenome = sobrenome;
  this.anoNascimento = anoNascimento;
  
  this.calcularIdade = function() {
    return new Date().getFullYear() - this.anoNascimento;
  };
  
  this.apresentar = function() {
    return \`Olá, eu sou \${this.nome} \${this.sobrenome} e tenho \${this.calcularIdade()} anos.\`;
  };
}

console.log(pessoa.apresentar());
const novaPessoa = new Pessoa("Maria", "Santos", 1985);
console.log(novaPessoa.apresentar());`,
                            "objetos"
                          )
                        }
                        className="absolute top-2 right-2 p-2 bg-gray-700 hover:bg-gray-600 rounded text-white"
                      >
                        {copiedCode === "objetos" ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </button>
                      <div className="bg-gray-900 dark:bg-gray-950 rounded-lg p-4 text-green-400 font-mono text-sm">
                        <span className="text-gray-500">
                          // Objeto Pessoa com métodos
                        </span>
                        <br />
                        const pessoa = {"{"}
                        <br />
                        &nbsp;&nbsp;nome: "João",
                        <br />
                        &nbsp;&nbsp;sobrenome: "Silva",
                        <br />
                        &nbsp;&nbsp;anoNascimento: 1990,
                        <br />
                        &nbsp;&nbsp;
                        <br />
                        &nbsp;&nbsp;
                        <span className="text-gray-500">
                          // Método para calcular idade
                        </span>
                        <br />
                        &nbsp;&nbsp;calcularIdade() {"{"}
                        <br />
                        &nbsp;&nbsp;&nbsp;&nbsp;const anoAtual = new
                        Date().getFullYear();
                        <br />
                        &nbsp;&nbsp;&nbsp;&nbsp;return anoAtual -
                        this.anoNascimento;
                        <br />
                        &nbsp;&nbsp;{"},"}
                        <br />
                        &nbsp;&nbsp;
                        <br />
                        &nbsp;&nbsp;
                        <span className="text-gray-500">
                          // Método para apresentação
                        </span>
                        <br />
                        &nbsp;&nbsp;apresentar() {"{"}
                        <br />
                        &nbsp;&nbsp;&nbsp;&nbsp;return `Olá, eu sou $
                        {"{this.nome}"} ${"{this.sobrenome}"} e tenho $
                        {"{this.calcularIdade()}"} anos.`;
                        <br />
                        &nbsp;&nbsp;{"}"}
                        <br />
                        {"};"}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Glossário */}
          <section id="glossario" className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
              Glossário
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              {[
                {
                  termo: "Variável",
                  definicao:
                    "Container que armazena um valor que pode ser usado e modificado durante a execução do programa.",
                },
                {
                  termo: "Escopo",
                  definicao:
                    "Região do código onde uma variável pode ser acessada. Pode ser global, de função ou de bloco.",
                },
                {
                  termo: "Hoisting",
                  definicao:
                    "Comportamento do JavaScript de mover declarações para o topo do escopo durante a compilação.",
                },
                {
                  termo: "Tipagem Dinâmica",
                  definicao:
                    "Característica onde o tipo da variável é determinado em tempo de execução, não na declaração.",
                },
                {
                  termo: "Coerção de Tipo",
                  definicao:
                    "Conversão automática de um tipo de dado para outro durante operações.",
                },
                {
                  termo: "Truthy/Falsy",
                  definicao:
                    "Valores que são considerados verdadeiros ou falsos em contextos booleanos.",
                },
              ].map((item, index) => (
                <Card
                  key={index}
                  className="bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
                >
                  <CardContent className="p-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                      {item.termo}
                    </h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {item.definicao}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Recursos Adicionais */}
          <section id="recursos" className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
              Recursos Adicionais
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-900/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-900 dark:text-blue-100">
                    <BookOpen className="h-5 w-5" />
                    Documentação
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <a
                    href="https://developer.mozilla.org/pt-BR/docs/Web/JavaScript"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-blue-700 dark:text-blue-300 hover:text-blue-900 dark:hover:text-blue-100 text-sm transition-colors"
                  >
                    <ExternalLink className="h-4 w-4" />
                    MDN Web Docs (Português)
                  </a>
                  <a
                    href="https://javascript.info/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-blue-700 dark:text-blue-300 hover:text-blue-900 dark:hover:text-blue-100 text-sm transition-colors"
                  >
                    <ExternalLink className="h-4 w-4" />
                    JavaScript.info
                  </a>
                  <a
                    href="https://www.w3schools.com/js/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-blue-700 dark:text-blue-300 hover:text-blue-900 dark:hover:text-blue-100 text-sm transition-colors"
                  >
                    <ExternalLink className="h-4 w-4" />
                    W3Schools JavaScript
                  </a>
                </CardContent>
              </Card>

              <Card className="border-green-200 dark:border-green-800 bg-green-50/50 dark:bg-green-900/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-900 dark:text-green-100">
                    <Users className="h-5 w-5" />
                    Comunidades
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <a
                    href="https://stackoverflow.com/questions/tagged/javascript"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-green-700 dark:text-green-300 hover:text-green-900 dark:hover:text-green-100 text-sm transition-colors"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Stack Overflow
                  </a>
                  <a
                    href="https://www.reddit.com/r/javascript/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-green-700 dark:text-green-300 hover:text-green-900 dark:hover:text-green-100 text-sm transition-colors"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Reddit r/javascript
                  </a>
                  <a
                    href="https://discord.gg/javascript"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-green-700 dark:text-green-300 hover:text-green-900 dark:hover:text-green-100 text-sm transition-colors"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Discord JavaScript
                  </a>
                </CardContent>
              </Card>

              <Card className="border-purple-200 dark:border-purple-800 bg-purple-50/50 dark:bg-purple-900/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-purple-900 dark:text-purple-100">
                    <Rocket className="h-5 w-5" />
                    Ferramentas
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <a
                    href="https://codepen.io/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-purple-700 dark:text-purple-300 hover:text-purple-900 dark:hover:text-purple-100 text-sm transition-colors"
                  >
                    <ExternalLink className="h-4 w-4" />
                    CodePen
                  </a>
                  <a
                    href="https://jsfiddle.net/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-purple-700 dark:text-purple-300 hover:text-purple-900 dark:hover:text-purple-100 text-sm transition-colors"
                  >
                    <ExternalLink className="h-4 w-4" />
                    JSFiddle
                  </a>
                  <a
                    href="https://replit.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-purple-700 dark:text-purple-300 hover:text-purple-900 dark:hover:text-purple-100 text-sm transition-colors"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Replit
                  </a>
                </CardContent>
              </Card>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="border-t border-gray-200 dark:border-gray-700 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 py-12">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Sobre
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Um guia completo e interativo para aprender JavaScript, desde
                  os conceitos básicos até técnicas avançadas.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Links
                </h3>
                <ul className="space-y-2">
                  <li>
                    <a
                      href="https://padevs-html.netlify.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors flex items-center"
                    >
                      <ExternalLink className="mr-1 h-3 w-3" />
                      HTML Semântico
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Contato
                </h3>
                <ul className="space-y-2">
                  <li>
                    <a
                      href="https://github.com/pedroallas"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors flex items-center"
                    >
                      <ExternalLink className="mr-1 h-3 w-3" />
                      GitHub
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://pedroallas.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors flex items-center"
                    >
                      <ExternalLink className="mr-1 h-3 w-3" />
                      pedroallas.com
                    </a>
                  </li>
                  <li className="text-gray-600 dark:text-gray-400 text-sm">
                    CTO e Fundador da PADevs School
                  </li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="text-center md:text-left mb-4 md:mb-0">
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    © 2024 JavaScript Completo. Todos os direitos reservados.
                  </p>
                  <p className="text-gray-500 dark:text-gray-500 text-sm mt-1">
                    Desenvolvido por Pedro Allas dos Santos Borges
                  </p>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
