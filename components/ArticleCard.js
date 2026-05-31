import Link from 'next/link'
import Image from 'next/image'
import { getFeaturedImageUrl, getAuthorName, getCategoryName, getCategorySlug, formatDate, readingTime, stripHtml } from '@/lib/wordpress'

// Manchete principal
export function MancheteCard({ post }) {
  const image    = getFeaturedImageUrl(post, 'large')
  const category = getCategoryName(post)
  const catSlug  = getCategorySlug(post)
  const title    = post?.title?.rendered || ''
  const excerpt  = stripHtml(post?.excerpt?.rendered || '').slice(0, 220)
  const author   = getAuthorName(post)
  const date     = formatDate(post?.date)
  const time     = readingTime(post?.content?.rendered)

  return (
    <article className="group">
      {category && (
        <Link href={`/categoria/${catSlug}`} className="cat-tag block mb-3">{category}</Link>
      )}
      <Link href={`/${post.slug}`} className="block hover-dim mb-3 no-underline">
        <h1 className="font-serif text-[clamp(1.6rem,2.5vw,2.6rem)] font-black leading-[1.1] text-ink dark:text-zinc-50 tracking-[-0.5px]">
          <span dangerouslySetInnerHTML={{ __html: title }} />
        </h1>
      </Link>
      {image ? (
        <Link href={`/${post.slug}`} className="block overflow-hidden mb-3">
          <div className="relative w-full aspect-[16/9] bg-paper-bg dark:bg-zinc-800">
            <Image src={image} alt={stripHtml(title)} fill className="object-cover transition-transform duration-500 group-hover:scale-[1.02]" priority sizes="(max-width:768px) 100vw, 55vw" />
          </div>
        </Link>
      ) : (
        <div className="w-full aspect-[16/9] bg-gradient-to-br from-brand-50 to-brand-100 dark:from-zinc-800 dark:to-zinc-700 mb-3 flex items-center justify-center">
          <span className="font-sans text-[0.72rem] font-medium tracking-widest uppercase text-brand-400 opacity-60">Monetiza IA</span>
        </div>
      )}
      <p className="font-body text-[1rem] font-light text-ink-secondary dark:text-zinc-400 leading-relaxed mb-3">{excerpt}</p>
      <div className="flex items-center gap-3 text-[0.72rem] text-ink-muted dark:text-zinc-500 font-sans border-t border-paper-border dark:border-zinc-800 pt-3 mt-3">
        <span className="font-semibold text-ink-editorial dark:text-zinc-300">{author}</span>
        <span className="text-paper-border dark:text-zinc-700">·</span>
        <span>{date}</span>
        <span className="text-paper-border dark:text-zinc-700">·</span>
        <span className="bg-paper-bg dark:bg-zinc-800 px-2 py-[2px] text-[0.65rem]">{time} de leitura</span>
      </div>
    </article>
  )
}

// Card lateral
export function MancheteLatCard({ post }) {
  const category = getCategoryName(post)
  const catSlug  = getCategorySlug(post)
  const title    = post?.title?.rendered || ''
  const excerpt  = stripHtml(post?.excerpt?.rendered || '').slice(0, 100)
  const time     = readingTime(post?.content?.rendered)

  return (
    <article className="group hover-dim py-4 border-b border-paper-border dark:border-zinc-800 last:border-0">
      {category && <Link href={`/categoria/${catSlug}`} className="cat-tag block mb-1">{category}</Link>}
      <Link href={`/${post.slug}`} className="block no-underline">
        <h3 className="font-serif text-[0.95rem] font-bold leading-snug text-ink dark:text-zinc-100 mb-1">
          <span dangerouslySetInnerHTML={{ __html: title }} />
        </h3>
        {excerpt && <p className="text-[0.78rem] text-ink-muted dark:text-zinc-500 leading-snug line-clamp-2">{excerpt}</p>}
        <div className="text-[0.65rem] text-ink-light dark:text-zinc-600 mt-1.5 font-sans">{time} · IA</div>
      </Link>
    </article>
  )
}

// Card grade 3 colunas
export function GridCard({ post }) {
  const category = getCategoryName(post)
  const catSlug  = getCategorySlug(post)
  const title    = post?.title?.rendered || ''
  const excerpt  = stripHtml(post?.excerpt?.rendered || '').slice(0, 120)
  const date     = formatDate(post?.date)
  const time     = readingTime(post?.content?.rendered)
  const image    = getFeaturedImageUrl(post, 'medium_large')

  return (
    <article className="group hover-dim">
      {image && (
        <Link href={`/${post.slug}`} className="block overflow-hidden mb-3">
          <div className="relative w-full aspect-[3/2] bg-paper-bg dark:bg-zinc-800">
            <Image src={image} alt={stripHtml(title)} fill className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" sizes="(max-width:768px) 100vw, 30vw" />
          </div>
        </Link>
      )}
      {category && <Link href={`/categoria/${catSlug}`} className="cat-tag block mb-2">{category}</Link>}
      <Link href={`/${post.slug}`} className="block no-underline">
        <h3 className="font-serif text-[0.98rem] font-bold leading-snug text-ink dark:text-zinc-100 mb-2">
          <span dangerouslySetInnerHTML={{ __html: title }} />
        </h3>
        <p className="text-[0.78rem] text-ink-muted dark:text-zinc-500 leading-relaxed line-clamp-3">{excerpt}</p>
        <div className="text-[0.65rem] text-ink-light dark:text-zinc-600 mt-2 font-sans">{time} · {date}</div>
      </Link>
    </article>
  )
}

// Card horizontal (lista recentes)
export function ArticleRowCard({ post }) {
  const image    = getFeaturedImageUrl(post, 'medium')
  const category = getCategoryName(post)
  const catSlug  = getCategorySlug(post)
  const title    = post?.title?.rendered || ''
  const excerpt  = stripHtml(post?.excerpt?.rendered || '').slice(0, 120)
  const date     = formatDate(post?.date)
  const time     = readingTime(post?.content?.rendered)

  return (
    <article className="group hover-dim grid grid-cols-[1fr_100px] sm:grid-cols-[1fr_120px] gap-4 py-5 border-b border-paper-border dark:border-zinc-800 last:border-0">
      <div>
        {category && <Link href={`/categoria/${catSlug}`} className="cat-tag block mb-1">{category}</Link>}
        <Link href={`/${post.slug}`} className="block no-underline">
          <h3 className="font-serif text-[1.02rem] font-bold leading-snug text-ink dark:text-zinc-100 mb-1">
            <span dangerouslySetInnerHTML={{ __html: title }} />
          </h3>
          <p className="text-[0.78rem] text-ink-muted dark:text-zinc-500 leading-relaxed line-clamp-2">{excerpt}</p>
          <div className="text-[0.65rem] text-ink-light dark:text-zinc-600 mt-1.5 font-sans">{date} · {time}</div>
        </Link>
      </div>
      <div className="aspect-square bg-gradient-to-br from-brand-50 to-brand-100 dark:from-zinc-800 dark:to-zinc-700 overflow-hidden flex-shrink-0">
        {image && (
          <div className="relative w-full h-full">
            <Image src={image} alt={stripHtml(title)} fill className="object-cover" sizes="120px" />
          </div>
        )}
      </div>
    </article>
  )
}

// Alias para compatibilidade com código antigo
export const HeroCard        = MancheteCard
export const SideCard        = MancheteLatCard
export const HorizontalCard  = ArticleRowCard
export { GridCard }
