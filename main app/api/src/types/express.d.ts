import { Request as ExpressRequest } from 'express'

declare module 'express' {
  export interface Request extends ExpressRequest {
    adminId?: string
    partnerId?: number
    memberId?: number
  }
}
