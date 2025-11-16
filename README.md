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

## Configuração
Crie um arquivo `.env` com:
```
PORT=3000
NODE_ENV=development
DATABASE_URL=postgres://amanda_user:amanda_pass@localhost:5432/amanda_db
```

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
