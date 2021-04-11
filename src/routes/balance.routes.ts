import { Request, Response, Router } from 'express'
import { Account } from '../dtos'

import verifyIfExistsAccountWithTaxpayerId from '../middlewares/verifyIfExistsAccountWithTaxpayerId'
import getBalance from '../utils/getBalance'

const balancesRouter = Router()

balancesRouter.get(
  '/balance',
  verifyIfExistsAccountWithTaxpayerId,
  (request: Request, response: Response) => {
    const customer: Account = request.customer

    const balance = getBalance(customer.statement)

    return response.json({
      balance
    })
  }
)

export default balancesRouter
