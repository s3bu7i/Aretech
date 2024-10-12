import { RouteConfig, extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import { z } from 'zod'

import { ROUTE_PREFIX } from '@/constants/index.ts'
import { TransactionZod } from '@/db/models/index.ts'
import { memberIdSchema, memberIdTransactionIdSchema } from '@/routes/utils/index.ts'
import { zodDeletedCountResponse, zodHTTPCodeResponses } from '@/utils/index.ts'

extendZodWithOpenApi(z)

const postTransaction = TransactionZod.omit({
  id: true,
  memberId: true,
  partnerId: true,
  createdAt: true,
  updatedAt: true,
  transactedAt: true,
  status: true,
  reference: true
})

const patchTransaction = TransactionZod.omit({
  id: true,
  memberId: true,
  partnerId: true,
  createdAt: true,
  updatedAt: true,
  transactedAt: true,
  reference: true
}).partial()

const getMemberTransactionsSwagger: RouteConfig = {
  method: 'get',
  path: `${ROUTE_PREFIX}/loyalty/{memberId}/transactions`,
  tags: ['Member Transactions'],
  summary: 'Get all transactions for a member.',
  request: {
    params: memberIdSchema
  },
  responses: zodHTTPCodeResponses(z.object({ transactions: z.array(TransactionZod) }))
}

const getMemberTransactionSwagger: RouteConfig = {
  method: 'get',
  path: `${ROUTE_PREFIX}/loyalty/{memberId}/transactions/{transactionId}`,
  tags: ['Member Transactions'],
  summary: 'Get a specific transaction for a member.',
  request: {
    params: memberIdTransactionIdSchema
  },
  responses: zodHTTPCodeResponses(z.object({ transaction: TransactionZod }))
}

const postMemberTransactionSwagger: RouteConfig = {
  method: 'post',
  path: `${ROUTE_PREFIX}/loyalty/{memberId}/transactions`,
  tags: ['Member Transactions'],
  summary: 'Create a new transaction for a member.',
  request: {
    params: memberIdSchema,
    body: { content: { 'application/json': { schema: postTransaction } } }
  },
  responses: zodHTTPCodeResponses(z.object({ transaction: TransactionZod }))
}

const patchMemberTransactionSwagger: RouteConfig = {
  method: 'patch',
  path: `${ROUTE_PREFIX}/loyalty/{memberId}/transactions/{transactionId}`,
  tags: ['Member Transactions'],
  summary: 'Update a specific transaction for a member.',
  request: {
    params: memberIdTransactionIdSchema,
    body: { content: { 'application/json': { schema: patchTransaction } } }
  },
  responses: zodHTTPCodeResponses(z.object({ transaction: TransactionZod }))
}

const deleteMemberTransactionSwagger: RouteConfig = {
  method: 'delete',
  path: `${ROUTE_PREFIX}/loyalty/{memberId}/transactions/{transactionId}`,
  tags: ['Member Transactions'],
  summary: 'Reverses a transaction for a member.',
  request: {
    params: memberIdTransactionIdSchema
  },
  responses: zodHTTPCodeResponses(zodDeletedCountResponse)
}

export {
  deleteMemberTransactionSwagger,
  getMemberTransactionSwagger,
  getMemberTransactionsSwagger,
  patchMemberTransactionSwagger,
  patchTransaction,
  postMemberTransactionSwagger,
  postTransaction
}
