import { RouteConfig, extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import { z } from 'zod'

import { ROUTE_PREFIX } from '@/constants/routes.ts'
import { zodHTTPCodeResponses } from '@/utils/index.ts'

extendZodWithOpenApi(z)

const getHealthResponse = z.object({
  status: z.string().openapi({ example: 'SUCCESS' }),
  message: z.string().openapi({ example: 'Database Healthy' }),
  error: z
    .null()
    .or(z.boolean())
    .or(z.object({}))
    .or(z.string())
    .openapi({ examples: [null, {}] })
})

const getHealthSwagger: RouteConfig = {
  method: 'get',
  path: `${ROUTE_PREFIX}/health`,
  tags: ['Status'],
  summary: 'Check the health of the database.',
  responses: zodHTTPCodeResponses(getHealthResponse)
}

export { getHealthResponse, getHealthSwagger }
