# Medical Appointment – Frontend Guide

Este documento reúne todas as decisões tomadas em relação à arquitetura, aos padrões de projeto, ao estilo de código e às estratégias de teste aplicadas no desenvolvimento do fluxo de agendamento médico, projetando um cenário de futura escalabilidade.

---

# Visão Geral

O projeto segue uma **arquitetura modular** baseada em **Clean Architecture**:

```
app/
│  ├─ __tests__/              # Testes E2E / integração voltados para rotas e páginas
│  ├─ appointment/            # Página principal do fluxo de agendamento
│  ├─ success/                # Página de sucesso após confirmar consulta
│  ├─ globals.css             # Estilos globais do projeto
│  ├─ layout.tsx              # Root Layout do App Router
│  ├─ not-found.tsx           # Página global de 404
│  └─ page.tsx                # Página inicial (/)
│
public/                       # Assets estáticos (imagens, ícones, etc.)
│
src/
│  ├─ assets/                 # Imagens específicas da aplicação
│  │
│  ├─ components/             # Componentes compartilhados entre features
│  │   ├─ navigation/         # Navbar, menubar, breadcrumbs etc.
│  │   ├─ steps/              # Componentes visuais relacionados à navegação por etapas
│  │   └─ ui/                 # Componentes do Design System (shadcn/ui adaptados)
│  │
│  ├─ constants/              # Valores fixos usados no app
│  │   ├─ payment-method-labels.ts
│  │   ├─ payment-methods.ts
│  │   └─ scheduling-schema.ts
│  │
│  ├─ hooks/                  # Hooks globais e compartilhados
│  │   ├─ __tests__/          # Testes unitários de hooks globais
│  │   ├─ appointment/        # Hooks específicos da feature de agendamento
│  │   │   ├─ useSchedulingStep.ts
│  │   │   ├─ useDoctorStep.ts
│  │   │   ├─ usePaymentStep.ts
│  │   │   └─ useSummaryStep.ts
│  │   ├─ use-mobile.ts
│  │   └─ use-toast.ts
│  │
│  ├─ lib/                    # Infraestrutura e integrações
│  │   ├─ mockApi.ts          # Mock da API (simulando backend)
│  │   └─ utils.ts            # Helpers gerais
│  │
│  ├─ store/                  # Zustand como estado global do fluxo
│  │   └─ appointment.store.ts
│  │
│  ├─ types/                  # Tipos globais
│  │   └─ appointment.types.ts
│  │
│  └─ utils/                  # Funções puras e reutilizáveis
│      ├─ format-date.ts
       └─ format-price.ts

```

### ✔ Principais decisões

- Separação clara entre **UI**, **Negócio**, **Estado**, e **Infra**
- Cada passo do fluxo usa seu próprio **hook especializado** (`useSchedulingStep`, `useDoctorStep`, `usePaymentStep`, `useSummaryStep`)
- A camada de UI é **100% declarativa**, sem lógica dentro do componente
- Zustand é usado como **State Management** de maneira **unidirecional e simples**
- API mockada isolada em `lib/mockApi`
- Validações isoladas com **Zod**
- Design System com **shadcn/ui** + TailwindCSS com tokens das cores

---

# Tech Stack

A aplicação utiliza uma stack baseada nas versões mais recentes das bibliotecas principais:

## **Core**

- **Next.js 15**
- **React 19**
- **TypeScript 5**
- **Zustand 5**
- **Zod 4**

## **Design System & UI**

- **shadcn/ui**
- **Radix UI**
- **TailwindCSS 4**
- **Phosphor Icons / Lucide React**
- **class-variance-authority**, **tailwind-merge**

## **Forms**

- **React Hook Form**
- **@hookform/resolvers**

## **Testing**

- **Vitest** (Inicialmente tentei utilizar Jest pela familiaridade, porém a versão 15 do Next.js introduziu diversas incompatibilidades com a stack)
- **React Testing Library**
- **jsdom**
- **Coverage via V8**

## **Build & Tooling**

- **ESLint 9**
- **PostCSS**
- **Autoprefixer**

## **Infra**

- **Mock API local** sem Axios (Toda a comunicação atual é simulada localmente, sem chamadas reais de rede. Como não há necessidade de headers, interceptors, autenticação ou tratamento complexo de responses, não há benefícios reais em usar Axios neste momento)

---

# Design Patterns

## **1. Smart Hook + Dumb Component**

Toda regra de negócio está nos hooks e os componentes são apenas UI declarativa.

## **2. Pure UI Components**

Componentes pequenos, desacoplados e reutilizáveis.

## **3. Controlled State via Zustand**

Fluxo global simples e previsível.

## **4. useMemo para valores derivados**

Evita renders desnecessários e aumenta performance.

## **5. Constants Folder**

Valores fixos ficam fora da UI para facilitar a manutenção.

---

# Lógica de Negócios (Hooks)

Os hooks encapsulam:

- Carregamentos (fetch)
- Estado interno
- Lógica de seleção
- Controle das etapas
- Interação com a Store
- Side-effects (ex.: confirmação da consulta)

---

# Estratégia de Teste

A abordagem segue **Behavior-Driven Testing**:

## Hooks

- Validação dos cenários de sucesso e falha
- Teste de integração com a store do Zustand
- Side-effects

## Componentes

- Interações visíveis
- Acessibilidade
- Compatibilidade relativa com dispositivos móveis
- Rendering condicional

## Utils

- Funções puras auxiliares

## API Mock

- Estrutura consistente e fácil

---
