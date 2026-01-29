# 🚀 Como Rodar o InteraTo PetShop

Este guia fornece as instruções necessárias para rodar a aplicação localmente utilizando Docker. Esta é a forma recomendada, pois garante que todas as dependências (Banco de Dados, Node.js) estejam configuradas corretamente sem poluir seu ambiente local.

## 📋 Pré-requisitos

Certifique-se de ter instalado em sua máquina:

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (Windows/Mac) ou Docker Engine e Docker Compose (Linux)

## 🛠️ Passo a Passo

### 1. Execute a aplicação com Docker

A maneira mais simples de rodar o projeto é utilizando o Docker Compose. Ele irá:
1. Criar um container para o banco de dados PostgreSQL.
2. Criar um container para a aplicação.
3. Configurar o esquema do banco de dados automaticamente.

Execute o comando na raiz do projeto:

docker-compose up -d --build

> **⏳ Nota:** O processo de build inicial pode levar alguns minutos enquanto baixa as imagens e instala as dependências.

### 2. Acesse a Aplicação

Assim que o comando terminar e os containers estiverem rodando, a aplicação estará disponível em:

👉 **http://localhost:3000**

## ⚙️ Arquitetura e Tecnologias

- **Frontend:** Next.js (App Router), React, TailwindCSS, Shadcn UI.
- **Backend:** Next.js Server Actions.
- **Banco de Dados:** PostgreSQL, Prisma ORM.
- **Autenticação:** Better-Auth, Zod.
- **Imagens:** Armazenadas diretamente no banco de dados (Bytea) para simplificar a infraestrutura do desafio.