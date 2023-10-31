
# Tech Challenge SOAT4 - Grupo 34

Este é o repositório de Trabalho de Tech Challenge da Pós Graduação em Software Architeture (SOAT4), que descreve o desenvolvimento de uma API Backend para registro de pedidos em um restaurante fictício chamado Restaurante-34. Este projeto inclui uma aplicação backend Node.js e um banco de dados PostgreSQL, gerenciados com Docker Compose e segue os padrões da Arquitetura Hexagonal.

## Pré-requisitos

Antes de iniciar, certifique-se de ter os seguintes pré-requisitos instalados em seu ambiente de desenvolvimento:

- Node.Js 18
- Docker

## Configuração

1. Clone este repositório:

   ```bash
   git clone https://github.com/pandaluk/restaurante-34
   cd restaurante-34-tcc
   ```

2. Configure as variáveis de ambiente necessárias. Copie o arquivo `.env.example` para `.env` e ajuste as variáveis de acordo com suas configurações.

3. Inicie os contêineres do Docker Compose:

   ```bash
   docker-compose up
   ```

## Executando a Aplicação

Com os contêineres em execução, você pode acessar a aplicação em seu navegador em [http://localhost:3001](http://localhost:3000). A API estará disponível em [http://localhost:3001/api](http://localhost:3000/api).

## Parando a Aplicação

Para parar a aplicação e desligar os contêineres:

```bash
docker-compose down
```

## Contribuição

Sinta-se à vontade para contribuir para este projeto. Você pode abrir issues, enviar solicitações de pull ou reportar problemas.

---
## Link Documentação

 A documentação está disponível em [Miro](https://miro.com/app/board/uXjVMiRkUFo=/?share_link_id=536639470110).

---
## Observações:

* <strong>Collection da Pasta</strong> está disponível na raíz do repositório no arquivo PostTech-Restaurante34.postman_collection.json

