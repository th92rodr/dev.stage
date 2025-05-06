import { eq } from 'drizzle-orm'

import { db } from '@/database/client'
import { subscriptions } from '@/database/schema/subscriptions'
import { redis } from '@/redis/client'

interface SubscribeToEventParams {
  name: string
  email: string
  referrerId?: string | null
}

export async function subscribeToEvent({ name, email, referrerId }: SubscribeToEventParams) {
  const subscribers = await db.select().from(subscriptions).where(eq(subscriptions.email, email))

  if (subscribers.length > 0) {
    return { id: subscribers[0].id }
  }

  const [subscriber, _] = await db.insert(subscriptions).values({ name, email }).returning()

  if (referrerId) {
    await redis.zincrby('referral:ranking', 1, referrerId)
  }

  return { id: subscriber.id }
}
