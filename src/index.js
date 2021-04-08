const express = require('express')
const { v4: uuidv4 } = require('uuid')
const cors = require("cors")

const app = express()

const customers = []

app.use(cors())

app.use(express.json())

function verifyIfExistsAccountWithTaxpayerId(request, response, next) {
  const { taxpayerId } = request.headers

  const customer = customers.find(customer => customer.taxpayerId === taxpayerId)

  if (!customer) {
    return response.status(400).json({ error: { message:"Customer not found" }})
  }

  request.customer = customer

  return next()
}

app.get("/", (request, response) => {
  return response.json({ message: "FinAPI" })
})

app.post("/account", (request, response) => {
  const { taxpayerId, name } = request.body

  const customerAlreadyExists = customers.some(
    customer => customer.taxpayerId === taxpayerId
  )

  if (customerAlreadyExists) {
    return response.status(400).json({ error: "Customer already exists!" })
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

app.get("/statement", verifyIfExistsAccountWithTaxpayerId, (request, response) => {
  const { customer } = request
  
  return response.json(customer.statement)
})

app.listen(process.env.PORT || 3333, () => {
  console.log('Server started on port 3333')
})