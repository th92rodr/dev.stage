import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { subscribeToEvent } from '@/usecases/subscribe-to-event'

export const subscribeToEventRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/subscriptions',
    {
      schema: {
        summary: 'Subscribe a user to the event',
        tags: ['Subscription'],
        description:
          'Creates a new subscription by registering a user with their name and email.\n\n' +
          'Optionally, a referrer ID can be provided to track who referred the subscriber.\n\n' +
          '- The email must be valid.\n' +
          '- If the email has already been registered, the existing subscription ID is returned instead of creating a new one.\n' +
          '- If a referrer ID is provided, it must reference an existing subscriber.\n\n' +
          'Returns the ID of the newly created or previously existing subscription.',
        body: z.object({
          name: z.string(),
          email: z.string().email(),
          referrer: z.string().nullish(),
        }),
        response: {
          201: z.object({
            id: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { name, email, referrer } = request.body

      const { id } = await subscribeToEvent({ name, email, referrerId: referrer })

      return reply.status(201).send({ id })
    }
  )
}
