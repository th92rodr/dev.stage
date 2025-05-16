import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { getSubscriberRankingPosition } from '@/usecases/get-subscriber-ranking-position'

export const getSubscriberRankingPositionRoute: FastifyPluginAsyncZod = async app => {
  app.get(
    '/subscribers/:subscriberId/ranking/position',
    {
      schema: {
        summary: 'Retrieve the ranking position of a subscriber',
        tags: ['Referral'],
        description:
          'Returns the current position of the given subscriber in the referral leaderboard.\n\n' +
          'The ranking is based on the number of successful referrals attributed to the subscriber.\n\n' +
          '- Provide the `subscriberId` as a route parameter.\n' +
          '- If the subscriber is not ranked (e.g. no referrals), the position may be `null`.\n\n' +
          'Useful for displaying leaderboard positions or personal progress within the referral campaign.',
        params: z.object({
          subscriberId: z.string(),
        }),
        response: {
          200: z.object({
            position: z.number().nullable(),
          }),
        },
      },
    },
    async request => {
      const { subscriberId } = request.params

      const { position } = await getSubscriberRankingPosition({ subscriberId })

      return { position }
    }
  )
}
