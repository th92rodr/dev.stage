import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { getSubscriberInvitesCount } from '@/usecases/get-subscriber-invites-count'

export const getSubscriberInvitesCountRoute: FastifyPluginAsyncZod = async app => {
  app.get(
    '/subscribers/:subscriberId/ranking/count',
    {
      schema: {
        summary: 'Retrieve total invites by a subscriber',
        tags: ['Referral'],
        description:
          'Returns the total number of successful referrals made by the given subscriber.\n\n' +
          'This represents how many people joined the event using this subscriber’s referral link or code.\n\n' +
          '- Provide the `subscriberId` as a route parameter.\n' +
          '- The returned count reflects confirmed/valid subscriptions attributed to the subscriber.\n\n' +
          'Useful for tracking performance in referral campaigns and displaying personal progress.',
        params: z.object({
          subscriberId: z.string(),
        }),
        response: {
          200: z.object({
            count: z.number(),
          }),
        },
      },
    },
    async request => {
      const { subscriberId } = request.params

      const { count } = await getSubscriberInvitesCount({ subscriberId })

      return { count }
    }
  )
}
