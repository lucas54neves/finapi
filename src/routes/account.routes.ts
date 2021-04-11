import { Request, Response, Router } from 'express'
import { v4 as uuidv4 } from 'uuid'
import { Account } from '../dtos'

import verifyIfExistsAccountWithTaxpayerId from '../middlewares/verifyIfExistsAccountWithTaxpayerId'

const accountsRouter = Router()

accountsRouter.post('/account', (request: Request, response: Response) => {
  const { taxpayerId, name } = request.body

  const customerAlreadyExists: Account = customers.some(
    (customer: Account) => customer.taxpayerId === taxpayerId
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

accountsRouter.put(
  '/account',
  verifyIfExistsAccountWithTaxpayerId,
  (request: Request, response: Response) => {
    const customer: Account = request.customer

    const { name } = request.body

    customer.name = name

    return response.status(201).send()
  }
)

accountsRouter.get(
  '/account',
  verifyIfExistsAccountWithTaxpayerId,
  (request: Request, response: Response) => {
    const customer: Account = request.customer

    return response.json(customer)
  }
)

accountsRouter.delete(
  '/account',
  verifyIfExistsAccountWithTaxpayerId,
  (request: Request, response: Response) => {
    const customer: Account = request.customer

    customers.splice(customer, 1)

    return response.status(200).json(customers)
  }
)

export default accountsRouter
