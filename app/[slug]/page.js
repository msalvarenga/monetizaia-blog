import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  getPostBySlug, getPosts, getAllPostSlugs,
  getFeaturedImageUrl, getAuthorName, getCategoryName, getCategorySlug,
  formatDate, readingTime, stripHtml
} from '@/lib/wordpress'
import ReadingProgress from '@/components/ReadingProgress'
import { GridCard } from '@/components/ArticleCard'

export const revalidate = 3600

export async function generateStaticParams() {
  return getAllPostSlugs()
}

export async function generateMetadata({ params }) {
  const post = await getPostBySlug(params.slug)
  if (!post) return {}

  const title = stripHtml(post.title?.rendered || '')
  const description = stripHtml(post.excerpt?.rendered || '').slice(0, 160)
  const image = getFeaturedImageUrl(post)

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime: post.date,
      images: image ? [{ url: image }] : [],
    },
    twitter: { card: 'summary_large_image', title, description },
  }
}

export default async function ArticlePage({ params }) {
  const [post, relatedPosts] = await Promise.all([
    getPostBySlug(params.slug),
    getPosts({ perPage: 4 }),
  ])

  if (!post) notFound()

  const image = getFeaturedImageUrl(post, 'full')
  const author = getAuthorName(post)
  const category = getCategoryName(post)
  const catSlug = getCategorySlug(post)
  const date = formatDate(post.date)
  const time = readingTime(post.content?.rendered)
  const title = post.title?.rendered || ''
  const content = post.content?.rendered || ''
  const related = (relatedPosts || []).filter(p => p.id !== post.id).slice(0, 3)

  return (
    <>
      <ReadingProgress />

      <article className="bg-paper dark:bg-zinc-950">
        {/* Article header */}
        <header className="max-w-3xl mx-auto px-4 md:px-8 pt-10 pb-8">
          {/* Category + meta */}
          <div className="flex items-center gap-3 mb-5">
            {category && (
              <Link href={`/categoria/${catSlug}`} className="category-badge">
                {category}
              </Link>
            )}
            <span className="text-[11px] text-ink-muted dark:text-zinc-500">{date}</span>
            <span className="text-[11px] text-ink-muted dark:text-zinc-500">·</span>
            <span className="text-[11px] text-ink-muted dark:text-zinc-500">{time}</span>
          </div>

          {/* Title */}
          <h1
            className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-ink dark:text-zinc-50 leading-[1.2] mb-6"
            dangerouslySetInnerHTML={{ __html: title }}
          />

          {/* Author line */}
          <div className="flex items-center gap-3 pb-6 border-b border-paper-border dark:border-zinc-800">
            <div className="w-9 h-9 rounded-full bg-brand-100 dark:bg-brand-700 flex items-center justify-center text-brand-500 dark:text-white text-sm font-bold">
              {author[0]}
            </div>
            <div>
              <div className="text-sm font-medium text-ink dark:text-zinc-100">{author}</div>
              <div className="text-[11px] text-ink-muted dark:text-zinc-500">{date}</div>
            </div>

            {/* Share */}
            <div className="ml-auto flex items-center gap-2">
              <span className="text-[10px] font-bold tracking-[0.1em] uppercase text-ink-muted dark:text-zinc-500 mr-1">Compartilhar</span>
              {[
                { label: 'Twitter/X', color: '#000', href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(stripHtml(title))}`, icon: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.74-8.858L1.5 2.25h6.978l4.255 5.626zm-1.161 17.52h1.833L7.084 4.126H5.117z' },
                { label: 'WhatsApp', color: '#25D366', href: `https://wa.me/?text=${encodeURIComponent(stripHtml(title))}`, icon: 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z' },
              ].map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                  className="w-7 h-7 flex items-center justify-center border border-paper-border dark:border-zinc-700 hover:border-brand-500 hover:text-brand-500 transition-colors text-ink-muted dark:text-zinc-400">
                  <svg width="13" height="13" fill="currentColor" viewBox="0 0 24 24">
                    <path d={s.icon} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </header>

        {/* Featured image */}
        {image && (
          <div className="max-w-4xl mx-auto px-4 md:px-8 mb-8">
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-paper-muted">
              <Image src={image} alt={stripHtml(title)} fill className="object-cover" priority sizes="(max-width:768px) 100vw, 896px" />
            </div>
          </div>
        )}

        {/* Article content */}
        <div className="max-w-3xl mx-auto px-4 md:px-8">
          <div
            className="article-body"
            dangerouslySetInnerHTML={{ __html: content }}
          />

          {/* Tags / categories */}
          {category && (
            <div className="mt-10 pt-6 border-t border-paper-border dark:border-zinc-800 flex items-center gap-2 flex-wrap">
              <span className="text-[10px] font-bold tracking-[0.1em] uppercase text-ink-muted dark:text-zinc-500">Categoria:</span>
              <Link href={`/categoria/${catSlug}`} className="text-xs font-medium bg-paper-muted dark:bg-zinc-800 px-3 py-1 text-ink-secondary dark:text-zinc-300 hover:text-brand-500 transition-colors">
                {category}
              </Link>
            </div>
          )}

          {/* Author box */}
          <div className="mt-10 p-6 bg-paper-warm dark:bg-zinc-900 border border-paper-border dark:border-zinc-800 flex gap-5">
            <div className="w-14 h-14 rounded-full bg-brand-100 dark:bg-brand-700 flex-shrink-0 flex items-center justify-center text-brand-500 dark:text-white text-xl font-bold">
              {author[0]}
            </div>
            <div>
              <div className="text-[10px] font-bold tracking-[0.1em] uppercase text-ink-muted dark:text-zinc-500 mb-1">Escrito por</div>
              <div className="font-serif text-lg font-bold text-ink dark:text-zinc-100 mb-1">{author}</div>
              <p className="text-sm text-ink-secondary dark:text-zinc-400 leading-relaxed">
                Especialista em monetização com IA. Compartilha tutoriais práticos sobre como ganhar dinheiro com Inteligência Artificial no Brasil.
              </p>
            </div>
          </div>
        </div>

        {/* Related articles */}
        {related.length > 0 && (
          <section className="max-w-7xl mx-auto px-4 md:px-8 py-14 mt-10 border-t border-paper-border dark:border-zinc-800">
            <div className="mb-8 pb-3 border-b border-paper-border dark:border-zinc-800">
              <h2 className="text-[10px] font-bold tracking-[0.15em] uppercase text-ink-muted dark:text-zinc-500">
                Artigos Relacionados
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {related.map(p => (
                <GridCard key={p.id} post={p} />
              ))}
            </div>
          </section>
        )}
      </article>
    </>
  )
}
