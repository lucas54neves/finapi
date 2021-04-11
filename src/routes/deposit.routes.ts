import { Request, Response, Router } from 'express'
import { Account, Statement } from '../dtos'

import verifyIfExistsAccountWithTaxpayerId from '../middlewares/verifyIfExistsAccountWithTaxpayerId'

const depositsRouter = Router()

depositsRouter.post(
  '/deposit',
  verifyIfExistsAccountWithTaxpayerId,
  (request: Request, response: Response) => {
    const customer: Account = request.customer

    const { description, amount } = request.body

    const statementOperation: Statement = {
      description,
      amount,
      createdAt: new Date().toDateString(),
      type: 'credit'
    }

    customer.statement.push(statementOperation)

    return response.status(201).send()
  }
)

export default depositsRouter
