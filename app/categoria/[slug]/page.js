import { getPosts, getCategoryBySlug, getCategories } from '@/lib/wordpress'
import { GridCard } from '@/components/ArticleCard'
import Sidebar from '@/components/Sidebar'
import { notFound } from 'next/navigation'

export const revalidate = 3600

export async function generateStaticParams() {
  const cats = await getCategories()
  return (cats || []).filter(c => c.slug !== 'uncategorized').map(c => ({ slug: c.slug }))
}

export async function generateMetadata({ params }) {
  const category = await getCategoryBySlug(params.slug)
  if (!category) return {}
  return {
    title: category.name,
    description: `Artigos sobre ${category.name} no Monetiza IA`,
  }
}

export default async function CategoryPage({ params, searchParams }) {
  const page = Number(searchParams?.page) || 1

  const [category, allPosts, categories] = await Promise.all([
    getCategoryBySlug(params.slug),
    getPosts({ categoryId: undefined, perPage: 9, page }),
    getCategories(),
  ])

  // Busca posts da categoria
  const categoryData = await getCategoryBySlug(params.slug)
  if (!categoryData) notFound()

  const posts = await getPosts({ categoryId: categoryData.id, perPage: 9, page })

  return (
    <div className="bg-paper dark:bg-zinc-950">
      {/* Category header */}
      <div className="border-b border-paper-border dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
          <div className="text-[10px] font-bold tracking-[0.2em] uppercase text-brand-500 mb-2">Categoria</div>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-ink dark:text-zinc-50">
            {categoryData.name}
          </h1>
          {categoryData.description && (
            <p className="mt-2 text-sm text-ink-secondary dark:text-zinc-400 max-w-xl">
              {categoryData.description}
            </p>
          )}
        </div>
      </div>

      {/* Content + Sidebar */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
        <div className="grid md:grid-cols-3 gap-10 md:gap-14">
          {/* Posts grid */}
          <div className="md:col-span-2">
            {(!posts || posts.length === 0) ? (
              <p className="text-ink-muted dark:text-zinc-500 text-sm">Nenhum artigo encontrado.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {posts.map(post => (
                  <GridCard key={post.id} post={post} large />
                ))}
              </div>
            )}

            {/* Pagination */}
            <div className="flex items-center gap-4 mt-10 pt-8 border-t border-paper-border dark:border-zinc-800">
              {page > 1 && (
                <a href={`/categoria/${params.slug}?page=${page - 1}`}
                  className="text-xs font-semibold text-ink-secondary dark:text-zinc-300 hover:text-brand-500 transition-colors">
                  ← Anterior
                </a>
              )}
              <span className="text-xs text-ink-muted dark:text-zinc-500">Página {page}</span>
              {posts && posts.length === 9 && (
                <a href={`/categoria/${params.slug}?page=${page + 1}`}
                  className="text-xs font-semibold text-ink-secondary dark:text-zinc-300 hover:text-brand-500 transition-colors ml-auto">
                  Próxima →
                </a>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div>
            <Sidebar categories={categories || []} />
          </div>
        </div>
      </div>
    </div>
  )
}
