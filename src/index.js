const express = require('express')
const { v4: uuidv4 } = require('uuid')

const app = express()

const customers = []

app.use(express.json())

app.get("/", (request, response) => {
  return response.json({ message: "FinAPI" })
})

app.post("/account", (request, response) => {
  const { cpf, name } = request.body

  const customerAlreadyExists = customers.some(
    customer => customer.cpf === cpf
  )

  if (customerAlreadyExists) {
    return response.status(400).json({ error: "Customer already exists!" })
  }

  const id = uuidv4()

  customers.push({
    cpf,
    name,
    id,
    statement: []
  })

  return response.status(201).send()
})

app.get("/statement/:cpf", (request, response) => {
  const { cpf } = request.params

  const customer = customers.find(customer => customer.cpf === cpf)

  if (!customer) {
    return response.status(400).json({ error: { message:"Customer not found" }})
  }
  
  return response.json(customer.statement)
})

app.listen(process.env.PORT || 3333, () => {
  console.log('Server started on port 3333')
})