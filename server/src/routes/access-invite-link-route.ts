import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { env } from '@/env'
import { accessInviteLink } from '@/usecases/access-invite-link'

export const accessInviteLinkRoute: FastifyPluginAsyncZod = async app => {
  app.get(
    '/invites/:subscriberId',
    {
      schema: {
        summary: 'Redirect to the frontend using a referral link',
        tags: ['Referral'],
        description:
          'Handles access to a referral link and redirects the user to the frontend application.\n\n' +
          '- Increments the referral access counter in Redis for the provided `subscriberId`.\n' +
          '- Appends the `subscriberId` as a `referrer` query parameter in the redirect URL.\n' +
          '- Returns a `302 Found` status to redirect the user.\n\n' +
          'Useful for tracking how many times a referral link has been clicked.',
        params: z.object({
          subscriberId: z.string(),
        }),
        response: {
          302: z.null(),
        },
      },
    },
    async (request, reply) => {
      const { subscriberId } = request.params

      await accessInviteLink({ subscriberId })

      const redirectUrl = new URL(env.FRONTEND_URL)
      redirectUrl.searchParams.set('referrer', subscriberId)

      return reply.redirect(redirectUrl.toString(), 302)
    }
  )
}
