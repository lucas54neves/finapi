import { Request, Response, NextFunction } from 'express'

function verifyIfExistsAccountWithTaxpayerId(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const taxpayerId = request.header('Taxpayer-Id')

  const customer = customers.find(
    (customer) => customer.taxpayerId === taxpayerId
  )

  if (!customer) {
    return response
      .status(400)
      .json({ error: { message: 'Customer not found' } })
  }

  request.customer = customer

  return next()
}

export default verifyIfExistsAccountWithTaxpayerId
