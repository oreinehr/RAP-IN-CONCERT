// Aplica os arquivos de supabase/migrations em ordem.
// Uso: node --env-file=.env.local scripts/db-migrate.mjs
import { readdir, readFile } from "node:fs/promises"
import path from "node:path"
import pg from "pg"

const connectionString = process.env.POSTGRES_URL_NON_POOLING
if (!connectionString) {
  console.error("POSTGRES_URL_NON_POOLING não definido. Rode `vercel env pull` antes.")
  process.exit(1)
}

const url = new URL(connectionString)
url.searchParams.delete("sslmode")

const client = new pg.Client({
  connectionString: url.toString(),
  ssl: { rejectUnauthorized: false },
})

const dir = path.join(process.cwd(), "supabase/migrations")
const files = (await readdir(dir)).filter((file) => file.endsWith(".sql")).sort()

await client.connect()
try {
  for (const file of files) {
    const sql = await readFile(path.join(dir, file), "utf8")
    await client.query("begin")
    await client.query(sql)
    await client.query("commit")
    console.log(`✓ ${file}`)
  }
} catch (error) {
  await client.query("rollback")
  console.error(error)
  process.exitCode = 1
} finally {
  await client.end()
}
