# PROJETO P1:

Desenvolvimento de API usando NodeJS/Express usando o Diagrama abaixo e submeter a API em seu próprio github : (Valor 8,0)

* Configuração da API
* Models
* Variáveis de Ambiente
* Migrations
* CRUD
* Entitys
* Controllers
* Seeds
* Services(Pagination)

## Descrição das Entidades (Tabelas)

### migrations
    * id INT: Chave primária.
    * timestamp BIGINT: Registro de data/hora (geralmente usado para ordenar as migrações).
    * name VARCHAR(255): Nome do arquivo ou descrição da migração.

* situations
    * id INT: Chave primária.

    * nameSituation VARCHAR(255): "Nome ou descrição da situação (ex: 'Ativo', 'Inativo', 'Pendente')."

    * createdAt TIMESTAMP: Data e hora de criação do registro.

    * updatedAt TIMESTAMP: Data e hora da última atualização do registro.

* users
    * id INT: Chave primária.

    * name VARCHAR(255): Nome completo do usuário.

    * email VARCHAR(255): E-mail do usuário.

    * password VARCHAR(255): Senha do usuário (hash).

    * recoverPassword VARCHAR(255): Token ou informação para recuperação de senha.

    * situationId INT: "Chave estrangeira para a tabela situations, indicando o status do usuário."

    * createdAt TIMESTAMP: Data e hora de criação do registro.

    * updatedAt TIMESTAMP: Data e hora da última atualização do registro.

* product_categories
    * id INT: Chave primária.

    * name VARCHAR(255): Nome da categoria do produto.

    * createdAt TIMESTAMP: Data e hora de criação do registro.

    * updatedAt TIMESTAMP: Data e hora da última atualização do registro.

* products
    * id INT: Chave primária.

    * name VARCHAR(255): Nome do produto.

    * slug VARCHAR(255): """Slug"" (URL amigável) do produto."

    * description LONGTEXT: Descrição detalhada do produto.

    * price DECIMAL(2): Preço do produto.

    * productSituationId INT: Chave estrangeira para o status do produto.

    * productCategoryId INT: Chave estrangeira para a categoria do produto.

    * createdAt TIMESTAMP: Data e hora de criação do registro.

    * updatedAt TIMESTAMP: Data e hora da última atualização do registro.

* product_situations
    * id INT: Chave primária.

    * name VARCHAR(255): "Nome ou descrição da situação do produto (ex: 'Em estoque', 'Esgotado')."

    * createdAt TIMESTAMP: Data e hora de criação do registro.

    * updatedAt TIMESTAMP: Data e hora da última atualização do registro.