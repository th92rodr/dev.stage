import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { getSubscriberInviteClicks } from '@/usecases/get-subscriber-invite-clicks'

export const getSubscriberInviteClicksRoute: FastifyPluginAsyncZod = async app => {
  app.get(
    '/subscribers/:subscriberId/ranking/clicks',
    {
      schema: {
        summary: 'Get number of times a referral link was clicked',
        tags: ['Referral'],
        description:
          'Returns how many times the referral link for the given `subscriberId` has been accessed.\n\n' +
          '- If no clicks have been registered, returns `0`.\n\n' +
          'This is useful for tracking engagement with shared invite links.',
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

      const { count } = await getSubscriberInviteClicks({ subscriberId })

      return { count }
    }
  )
}
