# Hitbox Admin - Frontend (ERP Backoffice)

Este é o projeto de Frontend do **Hitbox Admin**, a interface de backoffice responsável pelo gerenciamento de produção, disponibilização de itens e motores de precificação. Desenvolvido em **Angular 17**, o projeto utiliza uma arquitetura baseada em componentes *Standalone* e fluxo reativo para garantir uma experiência de uso fluida e de alta performance para os operadores.

---

## 📌 Índice

- [Tecnologias Utilizadas](#%EF%B8%8F-tecnologias-utilizadas)
- [Funcionalidades da Interface](#-funcionalidades-da-interface)
- [Pré-requisitos](#-pré-requisitos)
- [Configuração de Desenvolvimento](#-configuração-de-desenvolvimento)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Scripts Disponíveis](#-scripts-disponíveis)
- [Padrões de Desenvolvimento](#-padrões-de-desenvolvimento)

---

## 🛠️ Tecnologias Utilizadas

*   **Framework Core:** Angular 17 (Uso de Standalone Components, Signals e Novo Fluxo de Controle `@if`/`@for`)
*   **Gerenciamento de Estado / Reatividade:** RxJS / Angular Signals
*   **Estilização & UI:** SCSS / [Ex: TailwindCSS ou PrimeNG / Angular Material]
*   **Compilação & Bundling:** Vite (via novo Builder oficial do Angular 17)

---

## 🖥️ Funcionalidades da Interface

O painel administrativo está dividido nos seguintes módulos visuais:

1.  **Dashboard de Operações:** Visão geral da esteira de produção e alertas do motor de precificação.
2.  **Módulo de Produção:** Telas para cadastro de insumos, acompanhamento de lotes e fluxos de aprovação de itens.
3.  **Simulador de Precificação:** Painel interativo para ajustar margens, impostos e visualizar o impacto no preço final em tempo real antes de publicar.
4.  **Gestão de Canais (Disponibilização):** Controle de vitrines e ativação/desativação de serviços em massa.

---

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

*   **Node.js:** versão `18.13.0` ou superior (recomendado LTS)
*   **Gerenciador de Pacotes:** `npm` ou `yarn`
*   **Angular CLI:** instalado globalmente (`npm install -g @angular/cli`)

---

## 🔧 Configuração de Desenvolvimento

Siga os passos abaixo para rodar o frontend localmente:

1. **Instale as dependências do projeto:**
```bash
npm install
```
---

## 📁 Estrutura do Projeto
```
├── src/
│   ├── app/
│   │   ├── core/              # Serviços globais, interceptors, guards
│   │   ├── pages/             # Módulos de negócio da aplicação
│   │   │   ├── production/    # Telas e componentes do fluxo de produção
│   │   │   ├── pricing/       # Telas do motor de precificação e simuladores
│   │   │   └── distribution/  # Telas de disponibilização de itens
│   │   ├── app.config.ts      # Configurações globais (Providers, Roteamento, HTTP)
│   │   └── app.routes.ts      # Definição de rotas com Lazy Loading
│   ├── assets/                # Imagens, ícones e arquivos de tradução i18n
│   └── styles.scss            # Estilos globais da aplicação
```
---

## 📜 Scripts Disponíveis  
No arquivo package.json, você encontrará os seguintes comandos úteis:

    npm run start: Inicia o servidor local com hot-reload.

    npm run build: Compila a aplicação otimizada para produção na pasta dist/.

    npm run test: Executa os testes unitários utilizando o test runner configurado (Karma/Jest).

    npm run lint: Executa a análise estática do código para garantir os padrões de formatação.

## 📐 Padrões de Desenvolvimento

Para manter a consistência do ecossistema do Hitbox Admin:

    Aproveite os Signals: Para estados locais e reatividade simples em tela, dê preferência ao uso de signal, computed e effect.

    Lazy Loading: Todas as rotas dentro de app.routes.ts que apontam para features devem utilizar o carregamento sob demanda (loadComponent).

    Imutabilidade: Ao manipular dados vindos do motor de precificação no frontend, evite mutações diretas nos objetos para prevenir bugs de renderização.

