import { RouteConfig, extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import { z } from 'zod'

import { ROUTE_PREFIX } from '@/constants/index.ts'
import { memberIdSchema } from '@/routes/utils/index.ts'
import { zodHTTPCodeResponses } from '@/utils/index.ts'

extendZodWithOpenApi(z)

const balance = z.object({
  balance: z.number().int().openapi({ example: 1000 })
})

const getPointsSwagger: RouteConfig = {
  method: 'get',
  path: `${ROUTE_PREFIX}/loyalty/{memberId}/points`,
  tags: ['Points'],
  summary: 'Get the points balance for a specific member.',
  request: {
    params: memberIdSchema
  },
  responses: zodHTTPCodeResponses(balance)
}

export { getPointsSwagger }
