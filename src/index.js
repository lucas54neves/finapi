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

  const id = uuidv4()

  customers.push({
    cpf,
    name,
    id,
    statement: []
  })

  return response.status(201).send()
})

app.listen(3333, () => {
  console.log('Server started on port 3333')
})