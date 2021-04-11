import { Request, Response, Router } from 'express'
import { Account } from '../dtos'

import verifyIfExistsAccountWithTaxpayerId from '../middlewares/verifyIfExistsAccountWithTaxpayerId'

const statementsRouter = Router()

statementsRouter.get(
  '/statement',
  verifyIfExistsAccountWithTaxpayerId,
  (request: Request, response: Response) => {
    const customer: Account = request.customer

    return response.json(customer.statement)
  }
)

statementsRouter.get(
  '/statement/date',
  verifyIfExistsAccountWithTaxpayerId,
  (request: Request, response: Response) => {
    const customer: Account = request.customer

    const { date } = request.query

    const dateFormat = new Date(date + ' 00:00')

    const statement = customer.statement.filter(
      (statement) => statement.createdAt === new Date(dateFormat).toDateString()
    )

    return response.json(statement)
  }
)

export default statementsRouter
