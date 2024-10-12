import { RouteConfig, extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import { z } from 'zod'

import { ROUTE_PREFIX } from '@/constants/index.ts'
import { zodAccessToken, zodCredentials, zodHTTPCodeResponses } from '@/utils/index.ts'

extendZodWithOpenApi(z)

const postPartnerAuthSwagger: RouteConfig = {
  method: 'post',
  path: `${ROUTE_PREFIX}/auth`,
  tags: ['Authentication'],
  summary: 'Login as a partner.',
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

export { postPartnerAuthSwagger }
