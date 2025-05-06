import { inArray } from 'drizzle-orm'

import { db } from '@/database/client'
import { subscriptions } from '@/database/schema/subscriptions'
import { redis } from '@/redis/client'

export async function getRanking() {
  const ranking = await redis.zrevrange('referral:ranking', 0, 2, 'WITHSCORES')

  const parsedRanking: Record<string, number> = {}

  for (let index = 0; index < ranking.length; index += 2) {
    parsedRanking[ranking[index]] = Number.parseInt(ranking[index + 1])
  }

  const subscribers = await db
    .select()
    .from(subscriptions)
    .where(inArray(subscriptions.id, Object.keys(parsedRanking)))

  const fullRanking = subscribers
    .map(subscriber => {
      return {
        id: subscriber.id,
        name: subscriber.name,
        score: parsedRanking[subscriber.id],
      }
    })
    .sort((sub1, sub2) => {
      return sub2.score - sub1.score
    })

  return { ranking: fullRanking }
}
