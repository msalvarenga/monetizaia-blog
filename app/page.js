import { getPosts, getCategories } from '@/lib/wordpress'
import { MancheteCard, MancheteLatCard, GridCard, ArticleRowCard } from '@/components/ArticleCard'
import Sidebar from '@/components/Sidebar'
import NewsletterForm from '@/components/NewsletterForm'
import Link from 'next/link'

export const revalidate = 3600

export default async function HomePage() {
  const [allPosts, categories] = await Promise.all([
    getPosts({ perPage: 12 }),
    getCategories(),
  ])

  const posts      = allPosts || []
  const hero       = posts[0]
  const latPosts   = posts.slice(1, 5)
  const gridPosts  = posts.slice(5, 8)
  const listPosts  = posts.slice(8, 12)

  return (
    <div className="bg-paper-warm dark:bg-zinc-950 min-h-screen">

      {/* ── Bloco editorial principal ── */}
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 pt-8 pb-6">

        <div className="section-label mb-6">
          <span className="section-label-accent">Destaques</span>
          <span className="section-label-line" />
          <span className="section-label-text">{new Date().toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
        </div>

        {hero ? (
          <div className="grid md:grid-cols-[1fr_1px_320px] gap-0 mb-8">
            <div className="md:pr-8">
              <MancheteCard post={hero} />
            </div>
            <div className="hidden md:block bg-paper-border dark:bg-zinc-800 mx-0" />
            <div className="mt-6 md:mt-0 md:pl-8 border-t-2 border-ink dark:border-zinc-100 md:border-t-0">
              <div className="font-sans text-[0.65rem] font-bold tracking-[0.18em] uppercase text-ink-muted dark:text-zinc-500 pb-3 border-b border-ink dark:border-zinc-100 mb-0">
                Últimas Publicações
              </div>
              {latPosts.map(post => <MancheteLatCard key={post.id} post={post} />)}
            </div>
          </div>
        ) : (
          <div className="h-72 flex items-center justify-center border border-paper-border dark:border-zinc-800">
            <p className="font-sans text-sm text-ink-muted dark:text-zinc-600">Carregando artigos...</p>
          </div>
        )}

        {/* Faixa de categorias */}
        {categories.length > 0 && (
          <div className="border-t border-b border-paper-border dark:border-zinc-800 bg-paper dark:bg-zinc-950 -mx-4 md:-mx-8 px-4 md:px-8 py-2 mb-8 flex items-center gap-6 overflow-x-auto scrollbar-hide">
            {categories.filter(c => c.slug !== 'uncategorized').map(cat => (
              <Link key={cat.id} href={`/categoria/${cat.slug}`}
                className="font-sans text-[0.7rem] font-semibold tracking-[0.12em] uppercase whitespace-nowrap text-ink-secondary dark:text-zinc-400 hover:text-brand-500 transition-colors no-underline flex-shrink-0">
                {cat.name}
              </Link>
            ))}
          </div>
        )}

        {/* ── Grade 3 colunas ── */}
        {gridPosts.length > 0 && (
          <>
            <div className="section-label mb-4">
              <span className="section-label-accent">Ferramentas de IA</span>
              <span className="section-label-line" />
              <Link href="/categoria/ferramentas-de-ia" className="font-sans text-[0.68rem] font-semibold tracking-[0.1em] uppercase text-ink-muted dark:text-zinc-500 hover:text-brand-500 transition-colors no-underline whitespace-nowrap">Ver todos</Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-0 border-t-2 border-ink dark:border-zinc-100 border-b border-paper-border dark:border-zinc-800 mb-8">
              {gridPosts.map((post, i) => (
                <div key={post.id} className={`py-5 ${i < gridPosts.length - 1 ? 'sm:border-r border-paper-border dark:border-zinc-800' : ''} ${i > 0 ? 'sm:pl-5' : ''} ${i < gridPosts.length - 1 ? 'sm:pr-5' : ''}`}>
                  <GridCard post={post} />
                </div>
              ))}
            </div>
          </>
        )}

        {/* ── Artigos recentes + Sidebar ── */}
        <div className="section-label">
          <span className="section-label-accent">Artigos Recentes</span>
          <span className="section-label-line" />
        </div>

        <div className="grid md:grid-cols-[1fr_260px] gap-10 items-start">
          <div>
            {listPosts.map(post => <ArticleRowCard key={post.id} post={post} />)}
          </div>
          <div className="md:sticky md:top-4">
            <Sidebar trendingPosts={posts.slice(0, 5)} categories={categories} />
          </div>
        </div>
      </div>

      {/* ── Newsletter ── */}
      <section id="newsletter" className="bg-ink dark:bg-zinc-900 py-16">
        <div className="max-w-xl mx-auto px-6 text-center">
          <div className="font-sans text-[0.65rem] font-bold tracking-[2.5px] uppercase text-brand-400 mb-3">Newsletter</div>
          <h2 className="font-serif text-[2rem] md:text-[2.4rem] font-black text-white mb-3 leading-tight tracking-[-0.02em]">
            IA no seu e-mail. Toda semana.
          </h2>
          <p className="font-sans text-white/50 text-[0.9rem] mb-7 leading-relaxed">
            Tutoriais práticos, ferramentas testadas e estratégias para ganhar dinheiro com Inteligência Artificial.
          </p>
          <NewsletterForm dark />
          <p className="font-sans text-[0.68rem] text-white/25 mt-4 tracking-wide">Sem spam. Cancele a qualquer momento.</p>
        </div>
      </section>
    </div>
  )
}
