# Boas vindas ao repositório do Dev Futebol Clube!

## Sobre
Projeto desenvolvido em TypeScript e React, utilizando o paradigma de programação orientada a objeto e pacote sequelize para mapeamento dos dados, onde desenvolvi uma API (utilizando o método `TDD`) e utilizei a arquitetura MSC. Também integrei através do docker-compose as aplicações para que elas funcionem consumindo o banco de dados MySQL.

## Stacks e habilidades utilizadas
- API
- TypeScript
- React
- Express
- POO (Programação Orientada a Objeto)
- Sequelize
- MySQL
- TDD (Test Driven Development)
- Thunder Client
- Docker
- Arquitetura MSC

## Como testar localmente:
1. Clone o repositório `git@github.com:lcoelhox/Dev-Futebol-Clube.git`
2. Certifique-se que o node está na versão 16 ou superior, com comando: `node -v`
3. Se não estiver na versão 16 basta usar o comando: `nvm use 16`
4. Em seguida o comando: `npm install`
5. Por ultimo: `npm start`

## Como testar com Docker:
1. Clone o repositório `git@github.com:lcoelhox/Dev-Futebol-Clube.git`
2. Certifique-se que o node está na versão 16 ou superior, com comando: `node -v`
3. Se não estiver na versão 16 basta usar o comando: `nvm use 16`
4. Rode os serviços node e db com o comando: `docker-compose up -d`.

Lembre-se de parar o mysql se estiver usando localmente na porta padrão (3306), ou adapte, caso queria fazer uso da aplicação em containers;
Esses serviços irão inicializar um container chamado app;
A partir daqui você pode rodar o container app via CLI ou abri-lo no VS Code.

5. Instale as dependências com `npm install`
6. Por ultimo: `npm start`

## Fontes de consultas:
* [TypeScript](https://www.typescriptlang.org/docs/)
* [React](https://pt-br.reactjs.org/docs/getting-started.html)
* [Mysql](https://dev.mysql.com/doc/)

## Direitos Autorais:
Este projeto foi desenvolvido para fins de aprendizado por Lucas Coelho. É permitido baixar ou clonar o repositório para fins de estudo, porém não é permitida a publicação de cópias totais ou parciais do mesmo. Esta isenção de responsabilidade não abrange bibliotecas e dependências, que estão sujeitas às suas respectivas licenças.
  
