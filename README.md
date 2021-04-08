# FinAPI - Financeira

## Versão 0.0.1

### Requisitos funcionais

- [x] Deve ser possível criar uma conta
- [x] Deve ser possível buscar o extrato bancário do cliente
- [x] Deve ser possível realizar um depósito
- [x] Deve ser possível realizar um saque
- [x] Deve ser possível buscar o extrato bancário do cliente por data
- [x] Deve ser possível atualizar dados da conta do cliente
- [x] Deve ser possível obter dados da conta do cliente
- [x] Deve ser possível deletar uma conta
- [x] Deve ser possível retornar o saldo da conta

### Regras de negócio

- [x] Não deve ser possível cadastrar uma conta com CPF já existente
- [x] Não deve ser possível buscar extrato em uma conta inexistente
- [x] Não deve ser possível fazer depósito em uma conta inexistente
- [x] Não deve ser possível fazer saque em uma conta inexistente
- [x] Não deve ser possível fazer saque quando o saldo for insuficiente
- [x] Não deve ser possível excluir uma conta inexistente
- [x] Não deve ser possível retornar o saldo de uma conta inexistente

## Versão 0.0.2

### Requisitos não funcionais

- [x] Deve se realizar o deploy automático de todas as alterações commitadas na branch main
- [x] Deve se realizar o deploy no Heroku
- [ ] Deve se utilizar o Typescript como linguagem de programação
- [ ] Deve existir um diretório para as rotas
- [ ] Deve existir um diretório para os services
- [ ] Deve existir subdiretórios dentro do diretório dos services para os arquivos relacionados a um mesmo domínio
- [ ] Deve existir um diretório para os middlewares
- [ ] Deve existir um diretório para os dtos (Data Transfer Objects)
- [ ] Deve existir um diretório para as funções utilizadas com frequência no projeto (utils)
- [ ] Deve se utilizar o Typeorm como banco de dados

### Requisitos funcionais

- [ ] Deve ser possível o usuário cadastrar uma senha quando criar a conta
- [ ] Deve ser possível o usuário atualizar a senha
- [ ] Deve ser possível o usuário realizar o login
- [ ] Deve ser necessário estar logado para realizar todas as operações, com exceção da criação da conta
