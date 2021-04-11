import { Request, Response, Router } from 'express'

import accountsRouter from './account.routes'
import balancesRouter from './balance.routes'
import depositsRouter from './deposit.routes'
import statementsRouter from './statement.routes'
import withdrawsRouter from './withdraw.routes'

const routes = Router()

routes.get('/', (request: Request, response: Response) => {
  return response.json({ message: 'FinAPI' })
})

routes.use('/account', accountsRouter)
routes.use('/balance', balancesRouter)
routes.use('/deposit', depositsRouter)
routes.use('/statement', statementsRouter)
routes.use('/withdraw', withdrawsRouter)

export default routes
