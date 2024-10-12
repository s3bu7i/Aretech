import { RouteConfig, extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import { z } from 'zod'

import { ROUTE_PREFIX } from '@/constants/index.ts'
import { TransactionZod } from '@/db/models/index.ts'
import { partnerIdSchema, partnerIdTransactionIdSchema } from '@/routes/utils/index.ts'
import { zodHTTPCodeResponses } from '@/utils/index.ts'

extendZodWithOpenApi(z)

const getPartnerTransactionsSwagger: RouteConfig = {
  method: 'get',
  path: `${ROUTE_PREFIX}/loyalty/partners/{partnerId}/transactions`,
  tags: ['Partner Transactions'],
  summary: 'Get transactions for a partner.',
  request: {
    params: partnerIdSchema
  },
  responses: zodHTTPCodeResponses(z.object({ transactions: z.array(TransactionZod) }))
}

const getPartnerTransactionSwagger: RouteConfig = {
  method: 'get',
  path: `${ROUTE_PREFIX}/loyalty/partners/{partnerId}/transactions/{transactionId}`,
  tags: ['Partner Transactions'],
  summary: 'Get a specific transaction for a partner.',
  request: {
    params: partnerIdTransactionIdSchema
  },
  responses: zodHTTPCodeResponses(z.object({ transaction: TransactionZod }))
}

export { partnerIdSchema, partnerIdTransactionIdSchema, getPartnerTransactionsSwagger, getPartnerTransactionSwagger }
