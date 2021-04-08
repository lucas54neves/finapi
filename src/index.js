const express = require('express')
const { v4: uuidv4 } = require('uuid')
const cors = require('cors')

const app = express()

const customers = []

app.use(cors())

app.use(express.json())

function verifyIfExistsAccountWithTaxpayerId(request, response, next) {
  const taxpayerId = request.header('Taxpayer-Id')

  const customer = customers.find(customer => customer.taxpayerId === taxpayerId)

  if (!customer) {
    return response.status(400).json({ error: { message: 'Customer not found' }})
  }

  request.customer = customer

  return next()
}

function getBalance(statement) {
  const balance = statement.reduce((accumulator, operation) => {
    if (operation.type === 'credit') {
      return accumulator + operation.amount
    } else {
      return accumulator - operation.amount
    }
  }, 0)

  return balance
}

app.get('/', (request, response) => {
  return response.json({ message: 'FinAPI' })
})

app.post('/account', (request, response) => {
  const { taxpayerId, name } = request.body

  const customerAlreadyExists = customers.some(
    customer => customer.taxpayerId === taxpayerId
  )

  if (customerAlreadyExists) {
    return response.status(400).json({ error: 'Customer already exists!' })
  }

  const id = uuidv4()

  customers.push({
    taxpayerId,
    name,
    id,
    statement: []
  })

  return response.status(201).send()
})

app.get('/statement', verifyIfExistsAccountWithTaxpayerId, (request, response) => {
  const { customer } = request
  
  return response.json(customer.statement)
})

app.post('/deposit', verifyIfExistsAccountWithTaxpayerId, (request, response) => {
  const { description, amount } = request.body

  const { customer } = request

  const statementOperation = {
    description,
    amount,
    createAt: new Date(),
    type: 'credit'
  }

  customer.statement.push(statementOperation)

  return response.status(201).send()
})

app.post('/withdraw', verifyIfExistsAccountWithTaxpayerId, (request, response) => {
  const { amount } = request.body
  
  const { customer } = request

  const balance = getBalance(customer.statement)

  if (balance < amount) {
    return response.status(400).json({ error: {
      message: 'Insufficient funds'
    }})
  }

  const statementOperation = {
    description: 'Withdraw',
    amount,
    createdAt: new Date(),
    type: 'debit'
  }

  customer.statement.push(statementOperation)

  return response.status(201).send()
})

app.listen(process.env.PORT || 3333, () => {
  console.log('Server started on port 3333')
})