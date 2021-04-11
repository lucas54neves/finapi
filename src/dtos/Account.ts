import { Statement } from './Statement'

export type Account = {
  id: string
  name: string
  taxpayerId: string
  statement: Statement[]
}
