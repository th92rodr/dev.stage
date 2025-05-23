import { fastifyCors } from '@fastify/cors'
import { fastifySwagger } from '@fastify/swagger'
import { fastifySwaggerUi } from '@fastify/swagger-ui'
import { fastify } from 'fastify'
import {
  type ZodTypeProvider,
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'

import { env } from '@/env'
import { accessInviteLinkRoute } from '@/routes/access-invite-link-route'
import { getRankingRoute } from '@/routes/get-ranking-route'
import { getSubscriberInviteClicksRoute } from '@/routes/get-subscriber-invite-clicks-route'
import { getSubscriberInvitesCountRoute } from '@/routes/get-subscriber-invites-count-route'
import { getSubscriberRankingPositionRoute } from '@/routes/get-subscriber-ranking-position-route'
import { subscribeToEventRoute } from '@/routes/subscribe-to-event-route'

const server = fastify().withTypeProvider<ZodTypeProvider>()

server.setSerializerCompiler(serializerCompiler)
server.setValidatorCompiler(validatorCompiler)

server.register(fastifyCors, {
  origin: env.CORS_ORIGIN,
})

server.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'dev.stage',
      version: '1.0.0',
    },
  },
  transform: jsonSchemaTransform,
})

server.register(fastifySwaggerUi, {
  routePrefix: '/docs',
})

server.register(accessInviteLinkRoute)
server.register(getRankingRoute)
server.register(getSubscriberInviteClicksRoute)
server.register(getSubscriberInvitesCountRoute)
server.register(getSubscriberRankingPositionRoute)
server.register(subscribeToEventRoute)

server.listen({ host: env.HOST, port: env.PORT }).then(() => {
  console.log(`HTTP server listening at: http://${env.HOST}:${env.PORT}`)
})
