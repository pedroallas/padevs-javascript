"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { BookOpen, Globe, Database, Brain, Target, FileText, Users } from "lucide-react"

interface AppSidebarProps {
  activeSection: string
  onSectionClick: (sectionId: string) => void
}

export function AppSidebar({ activeSection, onSectionClick }: AppSidebarProps) {
  const sections = [
    {
      title: "Introdução",
      id: "introducao",
      icon: BookOpen,
    },
    {
      title: "Configuração do Ambiente",
      id: "ambiente",
      icon: Globe,
    },
    {
      title: "Fundamentos",
      id: "fundamentos",
      icon: Database,
    },
    {
      title: "Estruturas Condicionais",
      id: "condicionais",
      icon: Brain,
    },
    {
      title: "Exercício Básico",
      id: "exercicio-basico",
      icon: Target,
    },
    {
      title: "Glossário",
      id: "glossario",
      icon: FileText,
    },
    {
      title: "Recursos Adicionais",
      id: "recursos",
      icon: Users,
    },
  ]

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Conteúdo do Curso</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {sections.map((section) => (
                <SidebarMenuItem key={section.id}>
                  <SidebarMenuButton onClick={() => onSectionClick(section.id)} isActive={activeSection === section.id}>
                    <section.icon className="h-4 w-4" />
                    <span>{section.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
