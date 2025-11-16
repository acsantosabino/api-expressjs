# Plano do Projeto P1

Este documento descreve um plano prático e em passos simples para implementar a API descrita em `contexto.md` usando Node.js e Express. O objetivo é entregar uma API organizada com: configuração, models, migrations, seeds, CRUD, controllers, services (incluindo paginação) e deploy no GitHub.

## Pressupostos
- Node.js 24 (use `nvm` para garantir a versão correta).
- Gerenciador de pacotes: `npm` (padrão) — também funciona com `pnpm`/`yarn` se preferir.
- Banco de dados: PostgreSQL (recomendado >= 14).
- ORM/Query Builder sugerido: Sequelize ou Knex + Objection.js. Neste plano vou mencionar Sequelize como opção simples.

## Contrato rápido (inputs / outputs / sucesso)
- Inputs: JSON via HTTP (JSON body, path params, query params). Variáveis sensíveis via `.env`.
- Outputs: JSON com formato consistente { success: boolean, data?: any, error?: string }.
- Erros: retornos padronizados com status HTTP apropriados (400, 401, 404, 500).

## Casos de borda principais
- Requisições sem campos obrigatórios (validar e retornar 400).
- IDs inexistentes (retornar 404).
- Conflitos (ex.: email já cadastrado) -> 409.
- Limites de paginação (page/limit inválidos) -> usar valores padrão.
- Falha de conexão com BD -> 500 com mensagem genérica e logs.

## Estrutura sugerida do projeto

```
amanda/
├─ src/
│  ├─ config/           # config do app e do DB (ex: database.js)
│  ├─ migrations/       # arquivos de migration
│  ├─ seeds/            # arquivos de seed
│  ├─ models/           # modelos ORM
│  ├─ controllers/      # handlers das rotas
│  ├─ services/         # lógica de negócio (ex: pagination)
│  ├─ routes/           # definição de rotas
  │  ├─ index.js
│  ├─ middlewares/      # autenticação, error-handler, validators
│  └─ app.js            # instancia e config do express
├─ .env
├─ .nvmrc
├─ package.json
└─ README.md
```

## Tarefas simples (lista executável)

1) Ler `docs/contexto.md` e confirmar entidades e campos. (já feito)
2) Criar repositório Git e adicionar `README.md` inicial.
3) Inicializar projeto Node:
   - `nvm use <versão>` / `nvm install <versão>`
   - `npm init -y`
   - criar `.nvmrc` com a versão escolhida
4) Instalar dependências básicas:
   - `npm i express dotenv cors helmet morgan`
   - `npm i -D nodemon` (dev)
5) Escolher e instalar ORM / query builder:
   - Sequelize: `npm i sequelize sequelize-cli pg pg-hstore` (para PostgreSQL)
   - OU Knex: `npm i knex objection pg`
6) Criar configuração de database (arquivo em `src/config/database.js` ou `config/config.js` para sequelize-cli).
7) Criar migrations para tabelas: migrations, situations, users, product_categories, products, product_situations.
8) Criar models/entidades correspondentes.
9) Criar seeds iniciais (ex: situações padrão: Ativo, Inativo; product_situations etc.).
10) Implementar controllers e rotas básicas (CRUD) para cada entidade.
11) Implementar services reutilizáveis (ex: pagination service que recebe page/limit e retorna meta + dados).
12) Validar entrada: usar `express-validator` ou validação manual.
13) Adicionar middleware de tratamento de erros e logger.
14) Adicionar scripts npm:
    - `start`: `node src/app.js`
    - `dev`: `nodemon --watch src --exec "node -r dotenv/config src/app.js"`
    - `migrate`: comando de migration (ex: `sequelize db:migrate`)
    - `seed`: comando de seed
15) Testes mínimos (opcional inicial): criar 2-4 testes de integração com supertest para as rotas principais.
16) Documentação mínima: README com como rodar localmente, variáveis de ambiente e endpoints principais.


## Passos de configuração do Node.js e Express (detalhado)

1) Instalar Node.js 24 via nvm (exemplo):

```bash
# instalar nvm (se ainda não tiver) - siga https://github.com/nvm-sh/nvm
nvm install 24
nvm use 24
echo "24" > .nvmrc
```

2) Inicializar npm e configurar package.json:

```bash
npm init -y
```

Adicionar no `package.json` (exemplo de scripts):

```json
"scripts": {
  "start": "node src/app.js",
  "dev": "nodemon --watch src --exec \"node -r dotenv/config src/app.js\"",
  "migrate": "npx sequelize-cli db:migrate",
  "seed": "npx sequelize-cli db:seed:all"
}
```

3) Instalar Express e middlewares recomendados:

```bash
npm i express dotenv cors helmet morgan
npm i -D nodemon
```

4) Instalar Sequelize e dependências para PostgreSQL:

```bash
npm i sequelize sequelize-cli pg pg-hstore
```

5) Criar `src/app.js` (exemplo mínimo):

```js
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// importar rotas: require('./routes')

// middleware de erro genérico
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ success: false, error: err.message || 'Internal Server Error' });
});

const PORT = process.env.PORT || 3000;
if (require.main === module) {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;
```

6) Configurar migrations (exemplo com Sequelize):
   - `npx sequelize-cli init` cria pastas `config`, `models`, `migrations`, `seeders`.
   - Atualizar `config/config.js` com variáveis do `.env` para PostgreSQL.

7) Criar models e controllers para cada entidade listada em `contexto.md`.

## Ambiente de testes com Docker (PostgreSQL)

Para facilitar testes locais e integração, recomenda-se usar um container Docker com PostgreSQL. Exemplo de configuração:

### docker-compose.yml

```yaml
version: '3.8'
services:
  postgres:
    image: postgres:16
    container_name: amanda_postgres
    restart: always
    environment:
      POSTGRES_DB: amanda_db
      POSTGRES_USER: amanda_user
      POSTGRES_PASSWORD: amanda_pass
    ports:
      - "5432:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data
volumes:
  pgdata:
```

### Comandos básicos

Subir o banco:
```bash
docker compose up -d
```

Parar o banco:
```bash
docker compose down
```

### Configuração do .env para testes

```
DATABASE_URL=postgres://amanda_user:amanda_pass@localhost:5432/amanda_db
```

### Observações
- O container pode ser usado para rodar testes automatizados e desenvolvimento local.
- Recomenda-se limpar o volume `pgdata` entre execuções de testes para garantir ambiente limpo.
- Para rodar testes de integração, garanta que o banco está "up" antes de iniciar os testes.

## Exemplo rápido de `.env` (não commitar)

```
PORT=3000
NODE_ENV=development
DATABASE_URL=postgres://user:password@localhost:5432/amanda_db

# para sequelize-cli pode ser separado: DB_NAME, DB_USER, DB_PASS, DB_HOST
```

## Estimativas (tempo aproximado)
- Levantamento e confirmação de requisitos: 0.5 - 1h
- Inicialização do projeto e configuração básica: 0.5 - 1h
- Migrations & models: 1.5 - 3h
- Seeds: 0.5 - 1h
- CRUD / controllers / rotas: 2 - 4h
- Services (paginação) e middlewares: 1 - 2h
- Testes básicos e documentação: 1 - 2h

## Checklists de aceitação
- API corre com `npm run dev` sem erros.
- Migrations aplicam e criam as tabelas esperadas.
- Endpoints CRUD para `users`, `products`, `product_categories`, `situations`, `product_situations` funcionam.
- Paginação funcional em endpoints listagem (page, limit).
- Seeds populam valores base (situações, categorias exemplo).

## Próximos passos (após o plano)
1) Criar o repositório no GitHub e forkar/commit inicial.
2) Implementar a estrutura do projeto seguindo a ordem das tarefas simples.
3) Fazer PRs pequenos e revisáveis (uma feature por PR).

---

Se quiser, posso: gerar os comandos exatos para Sequelize (init/migration/model), ou já criar os arquivos iniciais `src/app.js`, `src/routes/index.js` e `package.json` com scripts nesta workspace. Diga qual opção prefere que eu execute a seguir.
