import { RouteConfig, extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import { z } from 'zod'

import { ROUTE_PREFIX } from '@/constants/index.ts'
import { zodAccessToken, zodCredentials, zodHTTPCodeResponses } from '@/utils/index.ts'

extendZodWithOpenApi(z)

const postAdminAuthSwagger: RouteConfig = {
  method: 'post',
  path: `${ROUTE_PREFIX}/admin-auth`,
  tags: ['Authentication'],
  summary: 'Login as an administrator.',
  request: {
    body: {
      required: true,
      content: {
        'application/json': {
          schema: zodCredentials
        }
      }
    }
  },
  responses: zodHTTPCodeResponses(zodAccessToken)
}

export { postAdminAuthSwagger }
