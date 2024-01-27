
# Sumário

1. [Introdução](#introducao)<br>
      1.1 [Fase 1](#fase1)
      1.2 [Fase Atual](#faseatual)
2. [Requisitos](#requisitos)
3. [Configuracao](#configuracao)<br>
      3.1. [Docker](#docker)<br>
      3.2. [Kubernetes](#kubernetes)
4. [Executando](#executando)
5. [Contribuicao](#contribuicao)
6. [Documentacao](#documentacao)
7. [Observações](#observações)


## Introdução

#### Fase 1


   Este é o repositório de Trabalho de Tech Challenge da Pós Graduação em Software Architeture (SOAT4), que descreve o desenvolvimento de uma API Backend para registro de pedidos em um restaurante fictício chamado Restaurante-34. Este projeto inclui uma aplicação backend Node.js e um banco de dados PostgreSQL, gerenciados com Docker Compose e segue os padrões da Arquitetura Hexagonal.

   **Observação**: Caso queira testar o projeto nessa arquitetura vá para a branch -> feat/arquitetura-hexagonal, vale lembrar que nessa fase o projeto não estava com implementação no Kubernetes Disponível, é necessário Ler o Readme.md da branch para entender como rodar o projeto
   

#### Fasel Atual

   O Projeto teve sua arquitetura migrada para a Clean Architeture e também possui arquivos para deployment no Kubernetes, além de terem sido feitos alguns ajustes pontuais em alguns endpoints, evoluindo o entendimento da Regra de Negócios e disponibilizando um novo Endpoint de Webhook

## Requisitos

Antes de iniciar, certifique-se de ter os seguintes pré-requisitos instalados em seu ambiente de desenvolvimento:

- Node.Js 18
- Docker

## Configuracao

1. Clone este repositório:

   ```bash
   git clone https://github.com/pandaluk/restaurante-34
   cd restaurante-34-tcc
   ```

2. Configure as variáveis de ambiente necessárias. Copie o arquivo `.env.example` para `.env` e ajuste as variáveis de acordo com suas configurações.


### Docker

Utilize os comandos listados abaixo para rodar no docker

```bash
docker build -f PrismaMigration.Dockerfile -t restaurante34-prisma-migration .

docker tag restaurante34-prisma-migration restaurante34-prisma-migration:latest

docker build -t restaurante-34-api .

docker tag restaurante-34-api restaurante-34-api:latest
```


### Kubernetes

Certifique-se de estar com o Kubernetes Habilitado em sua máquina localmente, caso esteja usando Docker Desktop, caso esteja utilizando alguma Cloud vá até a pasta src/infra e vá para segunda parte dessa sessão (comandos kubectl)

```bash
docker build -f PrismaMigration.Dockerfile -t restaurante34-prisma-migration .

docker tag restaurante34-prisma-migration restaurante34-prisma-migration:latest

docker build -t restaurante-34-api .

docker tag restaurante-34-api restaurante-34-api:latest
```

```bash
kubectl apply -f src/infra/config_map/

kubectl apply -f src/infra/bd/

kubectl apply -f src/infra/job/

kubectl apply -f src/infra/api/

kubectl apply -f src/infra/metrics/

kubectl apply -f src/infra/hpa/
```

**Repita o processo para todos os Deployment Files, seguindo o seguinte Fluxo:**

 CONFIG_MAP -> BD -> JOB -> API -> METRICS -> HPA


## Executando

Com os contêineres em execução, você pode acessar a aplicação em seu navegador em [http://localhost:3001](http://localhost:3001). A API estará disponível em [http://localhost:3001/api](http://localhost:3001/api).

**Observação**: No Kubernetes a porta disponível estará disponível para em  [http://localhost:31001/api](http://localhost:31001/api) e o Swagger em  [http://localhost:31001/swagger](http://localhost:31001/swagger)


## Contribuicao

Sinta-se à vontade para contribuir para este projeto. Você pode abrir issues, enviar solicitações de pull ou reportar problemas.

---
## Documentacao

 A documentação da API está disponível em [Swagger](http://localhost:3001/swagger/)

 A documentação está disponível em [Miro](https://miro.com/app/board/uXjVMiRkUFo=/?share_link_id=536639470110).

---
## Observações:

* <strong>Collection da Pasta</strong> está disponível na raíz do repositório no arquivo PostTech-Restaurante34.postman_collection.json

