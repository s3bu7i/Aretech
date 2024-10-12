import { ResponseConfig, extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import { ZodType, ZodTypeDef, z } from 'zod'

extendZodWithOpenApi(z)

const zodIdSchema = z.number({ coerce: true }).int().positive().openapi({ example: 1 })

const zodDateSchema = z.date().openapi({ example: '2024-09-01T01:03:43.004Z' })

const zodDeletedCountResponse = z.object({ count: z.number().int().openapi({ example: 1 }) })

const zodCredentials = z.object({
  email: z.string().email().openapi({ example: 'example@email.com' }),
  password: z.string().openapi({ example: '*********' })
})

const zodAccessToken = z.object({
  accessToken: z.string().openapi({ example: 'JWT Token' })
})

const zodHTTPCodeResponses = (schema: ZodType<unknown, ZodTypeDef, unknown>) => {
  return {
    200: { description: 'OK', content: { 'application/json': { schema } } },
    204: { description: 'No Content' },
    400: { description: 'Bad Request' },
    401: { description: 'Unauthorized' },
    403: { description: 'Forbidden' },
    404: { description: 'Not Found' },
    500: { description: 'Internal Server Error' },
    503: { description: 'Service Unavailable' }
  } satisfies { [statusCode: string]: ResponseConfig }
}

export { zodIdSchema, zodDateSchema, zodCredentials, zodAccessToken, zodDeletedCountResponse, zodHTTPCodeResponses }
