import { Request, Response, Router } from 'express'
import { Account, Statement } from '../dtos'

import verifyIfExistsAccountWithTaxpayerId from '../middlewares/verifyIfExistsAccountWithTaxpayerId'
import getBalance from '../utils/getBalance'

const withdrawsRouter = Router()

withdrawsRouter.post(
  '/withdraw',
  verifyIfExistsAccountWithTaxpayerId,
  (request: Request, response: Response) => {
    const customer: Account = request.customer

    const { amount } = request.body

    const balance = getBalance(customer.statement)

    if (balance < amount) {
      return response.status(400).json({
        error: {
          message: 'Insufficient funds'
        }
      })
    }

    const statementOperation: Statement = {
      description: 'Withdraw',
      amount,
      createdAt: new Date().toDateString(),
      type: 'debit'
    }

    customer.statement.push(statementOperation)

    return response.status(201).send()
  }
)

export default withdrawsRouter
