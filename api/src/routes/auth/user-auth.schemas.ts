import { RouteConfig, extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import { z } from 'zod'

import { ROUTE_PREFIX } from '@/constants/index.ts'
import { zodAccessToken, zodCredentials, zodHTTPCodeResponses } from '@/utils/index.ts'

extendZodWithOpenApi(z)

const postUserSignupSwagger: RouteConfig = {
  method: 'post',
  path: `${ROUTE_PREFIX}/user-signup`,
  tags: ['Authentication'],
  summary: 'Register a new user.',
  request: {
    body: {
      required: true,
      content: {
        'application/json': {
          schema: z.object({
            email: z.string().email(),
            password: z.string().min(6),
            animal: z.enum(['Turtle', 'Squirrel', 'Bird', 'Wolf', 'Eagle'])
          })
        }
      }
    }
  },
  responses: {
    200: {
      description: 'User successfully created',
      content: {
        'application/json': {
          schema: z.object({
            message: z.string(),
            user: z.object({
              id: z.number(),
              email: z.string(),
              animal: z.enum(['Turtle', 'Squirrel', 'Bird', 'Wolf', 'Eagle'])
            })
          })
        }
      }
    },
    ...zodHTTPCodeResponses
  }
}

const postUserLoginSwagger: RouteConfig = {
  method: 'post',
  path: `${ROUTE_PREFIX}/user-login`,
  tags: ['Authentication'],
  summary: 'Login a user and receive an access token.',
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

export { postUserSignupSwagger, postUserLoginSwagger }