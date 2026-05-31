// WordPress API — usa rewrite do Vercel para proxiar para o servidor Hostinger
// Em produção: monetizaia.com.br/wp-json → 77.37.127.180/wp-json (via rewrite)
// Em desenvolvimento: usar NEXT_PUBLIC_WP_API_URL
const WP_API = process.env.NEXT_PUBLIC_WP_API_URL || 'https://monetizaia.com.br/wp-json/wp/v2'

export async function getPosts({ perPage = 10, page = 1, category, search } = {}) {
  try {
    let url = `${WP_API}/posts?per_page=${perPage}&page=${page}&_embed=1`
    if (category) url += `&categories=${category}`
    if (search)   url += `&search=${encodeURIComponent(search)}`
    const res = await fetch(url, { next: { revalidate: 3600 } })
    if (!res.ok) return []
    return res.json()
  } catch { return [] }
}

export async function getPost(slug) {
  try {
    const res = await fetch(`${WP_API}/posts?slug=${slug}&_embed=1`, { next: { revalidate: 3600 } })
    if (!res.ok) return null
    const data = await res.json()
    return data[0] || null
  } catch { return null }
}

export async function getCategories() {
  try {
    const res = await fetch(`${WP_API}/categories?per_page=20&hide_empty=true`, { next: { revalidate: 3600 } })
    if (!res.ok) return []
    return res.json()
  } catch { return [] }
}

export async function getCategoryBySlug(slug) {
  try {
    const res = await fetch(`${WP_API}/categories?slug=${slug}`, { next: { revalidate: 3600 } })
    if (!res.ok) return null
    const data = await res.json()
    return data[0] || null
  } catch { return null }
}

export function getFeaturedImageUrl(post, size = 'large') {
  try {
    const sizes = post?._embedded?.['wp:featuredmedia']?.[0]?.media_details?.sizes
    return sizes?.[size]?.source_url || sizes?.full?.source_url ||
           post?._embedded?.['wp:featuredmedia']?.[0]?.source_url || null
  } catch { return null }
}

export function getAuthorName(post) {
  return post?._embedded?.author?.[0]?.name || 'Monetiza IA'
}

export function getCategoryName(post) {
  return post?._embedded?.['wp:term']?.[0]?.[0]?.name || ''
}

export function getCategorySlug(post) {
  return post?._embedded?.['wp:term']?.[0]?.[0]?.slug || ''
}

export function formatDate(dateStr) {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('pt-BR', { day: 'numeric', month: 'short', year: 'numeric' })
}

export function readingTime(content) {
  if (!content) return '5 min'
  const words = content.replace(/<[^>]+>/g, '').split(/\s+/).length
  const mins  = Math.max(1, Math.round(words / 200))
  return `${mins} min`
}

export function stripHtml(html) {
  return html?.replace(/<[^>]+>/g, '') || ''
}
