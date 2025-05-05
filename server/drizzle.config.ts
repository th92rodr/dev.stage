import type { Config } from 'drizzle-kit'

import { env } from '@/env'

export default {
  schema: './src/database/schema/*',
  out: './src/database/migrations',
  dialect: 'postgresql',
  dbCredentials: { url: env.DATABASE_URL },
} satisfies Config
