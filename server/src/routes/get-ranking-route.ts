import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { getRanking } from '@/usecases/get-ranking'

export const getRankingRoute: FastifyPluginAsyncZod = async app => {
  app.get(
    '/ranking',
    {
      schema: {
        summary: 'Retrieve top 3 subscribers in the referral ranking',
        tags: ['Referral'],
        description:
          'Returns the top 3 subscribers with the highest number of successful referrals.\n\n' +
          'Each ranked subscriber includes their ID, name, and referral score.\n\n' +
          '- The ranking is sorted by referral performance in descending order.\n' +
          '- Useful for displaying leaderboard highlights or incentivizing top participants.',
        response: {
          200: z.object({
            ranking: z.array(
              z.object({
                id: z.string(),
                name: z.string(),
                score: z.number(),
              })
            ),
          }),
        },
      },
    },
    async () => {
      const { ranking } = await getRanking()

      return { ranking }
    }
  )
}
