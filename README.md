# Amanda API

API RESTful desenvolvida em Node.js e Express para o projeto Amanda.

## Requisitos
- Node.js 24+
- PostgreSQL (pode ser via Docker)

## Instalação
```bash
nvm install 24
nvm use 24
npm install
```

## Banco de dados via Docker
```bash
docker compose up -d
```

# Amanda API

API Node.js/Express para o projeto Amanda com suporte a CRUD de Usuários, Produtos, Categorias e Situações.

## Tecnologias

- **Node.js** >= 24.0.0
- **Express** 5.1.0
- **Sequelize** 6.37.7 (ORM para PostgreSQL)
- **PostgreSQL** 16 (em Docker)
- **Jest** 30.2.0 (testes automatizados)
- **Supertest** 7.1.4 (testes de API)

## Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** versão 24 ou superior
- **Docker** e **Docker Compose**
- **Git**
- **npm** (geralmente incluído com Node.js)

## 🚀 Configuração Inicial

### 1. Clonar o Repositório

```bash
git clone <url-do-repositorio>
cd amanda
```

### 2. Instalar Dependências

```bash
npm install
```

### 3. Configurar Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
NODE_ENV=development
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=amanda_db
DB_USER=amanda_user
DB_PASSWORD=amanda_pass
```

### 4. Iniciar o Container PostgreSQL

```bash
docker-compose up -d
```

Este comando irá:
- Criar e iniciar um container PostgreSQL
- Expor a porta 5432 em localhost
- Criar o banco de dados `amanda_db` automaticamente

Verificar se o container está rodando:

```bash
docker-compose ps
```

### 5. Executar as Migrações

As migrações criam as tabelas no banco de dados:

```bash
npx sequelize-cli db:migrate
```

## 📊 Estrutura do Banco de Dados

### Tabelas Criadas

1. **situations** - Situações genéricas (Ativo, Inativo, Pendente)
2. **users** - Usuários do sistema
3. **product_situations** - Situações específicas de produtos
4. **product_categories** - Categorias de produtos
5. **products** - Produtos

## 📖 Executar a API

### Modo Desenvolvimento

```bash
npm run dev
```

A API estará disponível em `http://localhost:3000`

### Modo Produção

```bash
npm start
```

## 🧪 Executar os Testes

### Executar Todos os Testes

```bash
npm test
```

Resultado esperado:
- ✅ 30 testes automatizados
- ✅ 5 suites de teste
- ✅ Cobertura completa de CRUD

### Executar Testes de um Arquivo Específico

```bash
npm test tests/users.test.js
npm test tests/products.test.js
npm test tests/situations.test.js
npm test tests/productCategories.test.js
npm test tests/productSituations.test.js
```

### Executar Testes em Modo Watch

```bash
npm test -- --watch
```

## 🔌 Rotas da API

### Usuários
- `GET /users` - Listar todos os usuários
- `POST /users` - Criar novo usuário
- `GET /users/:id` - Obter usuário por ID
- `PUT /users/:id` - Atualizar usuário
- `DELETE /users/:id` - Deletar usuário

### Situações
- `GET /situations` - Listar todas as situações
- `POST /situations` - Criar nova situação
- `GET /situations/:id` - Obter situação por ID
- `PUT /situations/:id` - Atualizar situação
- `DELETE /situations/:id` - Deletar situação

### Categorias de Produtos
- `GET /product-categories` - Listar todas as categorias
- `POST /product-categories` - Criar nova categoria
- `GET /product-categories/:id` - Obter categoria por ID
- `PUT /product-categories/:id` - Atualizar categoria
- `DELETE /product-categories/:id` - Deletar categoria

### Situações de Produtos
- `GET /product-situations` - Listar todas as situações de produtos
- `POST /product-situations` - Criar nova situação de produto
- `GET /product-situations/:id` - Obter situação de produto por ID
- `PUT /product-situations/:id` - Atualizar situação de produto
- `DELETE /product-situations/:id` - Deletar situação de produto

### Produtos
- `GET /products` - Listar todos os produtos
- `POST /products` - Criar novo produto
- `GET /products/:id` - Obter produto por ID
- `PUT /products/:id` - Atualizar produto
- `DELETE /products/:id` - Deletar produto

## 📝 Exemplos de Requisições

### Criar um Usuário

```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João Silva",
    "email": "joao@example.com",
    "password": "senha123",
    "situationId": 1
  }'
```

### Criar uma Categoria de Produto

```bash
curl -X POST http://localhost:3000/product-categories \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Eletrônicos"
  }'
```

### Criar um Produto

```bash
curl -X POST http://localhost:3000/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Notebook",
    "slug": "notebook-dell",
    "description": "Notebook Dell Inspiron",
    "price": 3500.00,
    "productCategoryId": 1,
    "productSituationId": 1
  }'
```

## 🐳 Gerenciamento do Docker

### Parar o Container

```bash
docker-compose down
```

### Ver Logs do PostgreSQL

```bash
docker-compose logs postgres
```

### Acessar o PostgreSQL via CLI

```bash
docker exec -it amanda_postgres psql -U amanda_user -d amanda_db
```

## 🔄 Desfazer Migrações

Se precisar desfazer todas as migrações:

```bash
npx sequelize-cli db:migrate:undo:all
```

## 🐛 Troubleshooting

### Erro: "relation does not exist"

**Solução:** Execute as migrações
```bash
npx sequelize-cli db:migrate
```

### Erro: "EADDRINUSE: address already in use :::5432"

**Solução:**
```bash
docker ps
docker stop <container-id>
docker-compose up -d
```

### Erro: "Cannot find module"

**Solução:**
```bash
npm install
```

### Testes falhando com erro de conexão

**Solução:**
```bash
docker-compose up -d
npm test
```

## 📋 Scripts npm Disponíveis

```bash
npm start              # Iniciar a API em modo produção
npm run dev            # Iniciar a API em modo desenvolvimento
npm test               # Executar todos os testes
```

## 📁 Estrutura do Projeto

```
amanda/
├── migrations/         # Arquivos de migração
├── models/            # Índice de modelos
├── src/
│   ├── app.js
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── seeds/
│   └── middlewares/
├── tests/             # Testes automatizados
├── docker-compose.yml
└── README.md
```

## 📄 Licença

MIT

## Execução
```bash
npm run dev
```
Acesse: http://localhost:3000

## Scripts principais
- `npm run dev`: inicia o servidor em modo desenvolvimento
- `npm start`: inicia o servidor em modo produção

## Estrutura do projeto
```
src/
  app.js
  routes/
  controllers/
  models/
  migrations/
  seeds/
  config/
  services/
  middlewares/
tests/
.env
.nvmrc
package.json
```

## Testes
Em breve: testes automatizados com Jest/Supertest.

## Licença
MIT
