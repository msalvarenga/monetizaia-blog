const WP_URL = process.env.NEXT_PUBLIC_WP_URL || 'https://monetizaia.com.br'

async function fetchAPI(path, params = {}) {
  const query = new URLSearchParams(params).toString()
  const url = `${WP_URL}/wp-json/wp/v2${path}${query ? `?${query}` : ''}`

  try {
    const res = await fetch(url, { next: { revalidate: 3600 } })
    if (!res.ok) throw new Error(`API error: ${res.status}`)
    return res.json()
  } catch (err) {
    console.error('WP API Error:', err)
    return null
  }
}

// Busca posts com todos os campos relevantes
export async function getPosts({ page = 1, perPage = 10, categoryId, search } = {}) {
  const params = {
    page,
    per_page: perPage,
    _embed: true,
    status: 'publish',
  }
  if (categoryId) params.categories = categoryId
  if (search) params.search = search

  return fetchAPI('/posts', params)
}

// Busca um post pelo slug
export async function getPostBySlug(slug) {
  const posts = await fetchAPI('/posts', { slug, _embed: true, status: 'publish' })
  return posts?.[0] || null
}

// Busca posts em destaque (os mais recentes como featured)
export async function getFeaturedPost() {
  const posts = await fetchAPI('/posts', {
    per_page: 1,
    _embed: true,
    status: 'publish',
    orderby: 'date',
    order: 'desc',
  })
  return posts?.[0] || null
}

// Busca todas as categorias
export async function getCategories() {
  return fetchAPI('/categories', { per_page: 20, hide_empty: true })
}

// Busca uma categoria pelo slug
export async function getCategoryBySlug(slug) {
  const cats = await fetchAPI('/categories', { slug })
  return cats?.[0] || null
}

// Busca todos os slugs de posts (para generateStaticParams)
export async function getAllPostSlugs() {
  const posts = await fetchAPI('/posts', { per_page: 100, status: 'publish' })
  return posts?.map((p) => ({ slug: p.slug })) || []
}

// Extrai URL da imagem destacada
export function getFeaturedImageUrl(post, size = 'large') {
  const media = post?._embedded?.['wp:featuredmedia']?.[0]
  if (!media) return null
  return media?.media_details?.sizes?.[size]?.source_url || media?.source_url || null
}

// Extrai nome do autor
export function getAuthorName(post) {
  return post?._embedded?.author?.[0]?.name || 'Monetiza IA'
}

// Extrai nome da primeira categoria
export function getCategoryName(post) {
  return post?._embedded?.['wp:term']?.[0]?.[0]?.name || null
}

export function getCategorySlug(post) {
  return post?._embedded?.['wp:term']?.[0]?.[0]?.slug || null
}

// Formata data em pt-BR
export function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

// Calcula tempo de leitura
export function readingTime(content) {
  const text = content?.replace(/<[^>]+>/g, '') || ''
  const words = text.split(/\s+/).filter(Boolean).length
  const minutes = Math.ceil(words / 200)
  return `${minutes} min de leitura`
}

// Strip HTML para excerpt limpo
export function stripHtml(html) {
  return html?.replace(/<[^>]+>/g, '').replace(/&[^;]+;/g, ' ').trim() || ''
}
