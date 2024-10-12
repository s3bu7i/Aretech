import { RouteConfig, extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import { z } from 'zod'

import { ROUTE_PREFIX } from '@/constants/index.ts'
import { PartnerZod } from '@/db/models/index.ts'
import { partnerIdSchema } from '@/routes/utils/index.ts'
import { zodDeletedCountResponse, zodHTTPCodeResponses } from '@/utils/index.ts'

extendZodWithOpenApi(z)

const postPartner = PartnerZod.omit({ id: true, createdAt: true, updatedAt: true, permission: true })

const patchPartner = PartnerZod.omit({ id: true, createdAt: true, updatedAt: true }).partial()

const getPartnersSwagger: RouteConfig = {
  method: 'get',
  path: `${ROUTE_PREFIX}/loyalty/partners`,
  tags: ['Partner Operations (Admin)'],
  summary: 'Get all partners.',
  request: {
    params: partnerIdSchema
  },
  responses: zodHTTPCodeResponses(z.object({ partners: z.array(PartnerZod) }))
}

const getPartnerSwagger: RouteConfig = {
  method: 'get',
  path: `${ROUTE_PREFIX}/loyalty/partners/{partnerId}`,
  tags: ['Partner Operations (Admin)'],
  summary: 'Get a specific partner.',
  request: {
    params: partnerIdSchema
  },
  responses: zodHTTPCodeResponses(z.object({ partner: PartnerZod }))
}

const postPartnerSwagger: RouteConfig = {
  method: 'post',
  path: `${ROUTE_PREFIX}/loyalty/partners`,
  tags: ['Partner Operations (Admin)'],
  summary: 'Create a new partner.',
  request: {
    body: { content: { 'application/json': { schema: postPartner } } }
  },
  responses: zodHTTPCodeResponses(z.object({ partner: PartnerZod }))
}

const patchPartnerSwagger: RouteConfig = {
  method: 'patch',
  path: `${ROUTE_PREFIX}/loyalty/partners/{partnerId}`,
  tags: ['Partner Operations (Admin)'],
  summary: 'Update a specific partner.',
  request: {
    params: partnerIdSchema,
    body: { content: { 'application/json': { schema: patchPartner } } }
  },
  responses: zodHTTPCodeResponses(z.object({ partner: PartnerZod }))
}

const deletePartnerSwagger: RouteConfig = {
  method: 'delete',
  path: `${ROUTE_PREFIX}/loyalty/partners/{partnerId}`,
  tags: ['Partner Operations (Admin)'],
  summary: 'Delete a specific partner.',
  request: {
    params: partnerIdSchema
  },
  responses: zodHTTPCodeResponses(zodDeletedCountResponse)
}

export {
  deletePartnerSwagger,
  getPartnerSwagger,
  getPartnersSwagger,
  partnerIdSchema,
  patchPartner,
  patchPartnerSwagger,
  postPartner,
  postPartnerSwagger
}
