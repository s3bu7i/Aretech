import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import { z } from 'zod'

import { zodIdSchema } from '@/utils/index.ts'

extendZodWithOpenApi(z)

const memberIdSchema = z.object({
  memberId: zodIdSchema
})

const memberIdTransactionIdSchema = z.object({
  memberId: zodIdSchema,
  transactionId: zodIdSchema
})

const partnerIdSchema = z.object({
  partnerId: zodIdSchema
})

const partnerIdTransactionIdSchema = z.object({
  partnerId: zodIdSchema,
  transactionId: zodIdSchema
})

export { memberIdSchema, memberIdTransactionIdSchema, partnerIdSchema, partnerIdTransactionIdSchema }
