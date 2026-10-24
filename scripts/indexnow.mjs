#!/usr/bin/env node
/**
 * Notify IndexNow (Bing, Yandex, Seznam, Naver, ...) about updated pages.
 *
 * Usage:
 *   npm run indexnow                          # submit every URL in the live sitemap
 *   npm run indexnow -- /zh/compare/adobe     # submit only these paths (zh/en both if no locale)
 *   npm run indexnow -- --dry-run             # print what would be sent
 *
 * The key file public/<KEY>.txt must already be deployed before submitting.
 */

const HOST = 'artcraftphotocraft.space'
const SITE = `https://${HOST}`
const KEY = '91d9934174636bae5bd0f1bfe856884e'
const KEY_LOCATION = `${SITE}/${KEY}.txt`
const ENDPOINT = 'https://api.indexnow.org/indexnow'

const args = process.argv.slice(2)
const dryRun = args.includes('--dry-run')
const paths = args.filter((a) => !a.startsWith('--'))

async function urlsFromSitemap() {
  const res = await fetch(`${SITE}/sitemap.xml`)
  if (!res.ok) throw new Error(`sitemap.xml returned HTTP ${res.status}`)
  const xml = await res.text()
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim())
}

function urlsFromPaths(list) {
  return list.flatMap((p) => {
    const clean = p.startsWith('/') ? p : `/${p}`
    if (/^\/(zh|en)(\/|$)/.test(clean)) return [`${SITE}${clean}`]
    return [`${SITE}/zh${clean === '/' ? '' : clean}`, `${SITE}/en${clean === '/' ? '' : clean}`]
  })
}

async function checkKeyFile() {
  const res = await fetch(KEY_LOCATION)
  const body = (await res.text()).trim()
  if (!res.ok || body !== KEY) {
    throw new Error(`Key file not live yet: ${KEY_LOCATION} (HTTP ${res.status}). Deploy first.`)
  }
}

const urlList = [...new Set(paths.length ? urlsFromPaths(paths) : await urlsFromSitemap())]
  .filter((u) => new URL(u).host === HOST)

if (urlList.length === 0) {
  console.error('No URLs to submit.')
  process.exit(1)
}

console.log(`${urlList.length} URL(s):`)
for (const u of urlList) console.log(`  ${u}`)

if (dryRun) {
  console.log('\nDry run: nothing sent.')
  process.exit(0)
}

await checkKeyFile()

const res = await fetch(ENDPOINT, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList }),
})

const messages = {
  200: 'OK: URLs submitted.',
  202: 'Accepted: key validation pending; this is normal for the first submission.',
  400: 'Bad request: invalid format.',
  403: 'Forbidden: key not valid (key file missing or mismatched).',
  422: 'Unprocessable: URLs do not belong to the host, or key mismatch.',
  429: 'Too many requests: try again later.',
}
console.log(`\nIndexNow responded HTTP ${res.status}: ${messages[res.status] || (await res.text()).slice(0, 200)}`)
process.exit(res.status === 200 || res.status === 202 ? 0 : 1)
