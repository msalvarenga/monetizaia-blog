'use client'

import Link from 'next/link'
import { useState } from 'react'
import { getCategoryName, getCategorySlug, readingTime } from '@/lib/wordpress'

const TAGS = ['ChatGPT','Afiliados','Renda Extra','Automação','Copywriting','YouTube','Instagram','Dropshipping','Infoprodutos','Freelancer','Canva','Make','n8n']

export default function Sidebar({ trendingPosts = [], categories = [] }) {
  const [email, setEmail] = useState('')

  return (
    <aside className="space-y-0">
      {/* Newsletter */}
      <div className="bg-ink dark:bg-zinc-900 p-5 mb-6">
        <h3 className="font-serif text-[1rem] font-bold text-white mb-1">IA no seu e-mail toda semana</h3>
        <p className="text-[0.73rem] text-white/50 mb-3">Ferramentas, tutoriais e estratégias de renda. Sem spam.</p>
        <form className="space-y-2" onSubmit={e => e.preventDefault()}>
          <input type="email" placeholder="seu@email.com" value={email} onChange={e => setEmail(e.target.value)}
            className="w-full px-3 py-2 text-[0.8rem] bg-white/5 border border-white/15 text-white font-sans placeholder:text-white/30 outline-none focus:border-brand-400 transition-colors" />
          <button type="submit" className="w-full bg-brand-500 hover:bg-brand-700 text-white font-sans text-[0.72rem] font-bold tracking-[0.8px] uppercase py-2.5 transition-colors">
            Quero receber →
          </button>
        </form>
      </div>

      {/* Mais lidos */}
      {trendingPosts.length > 0 && (
        <div className="sidebar-bloco">
          <div className="sidebar-titulo">Mais lidos</div>
          {trendingPosts.slice(0, 5).map((post, i) => {
            const title   = post?.title?.rendered || ''
            const cat     = getCategoryName(post)
            const catSlug = getCategorySlug(post)
            return (
              <Link key={post.id} href={`/${post.slug}`} className="block py-2.5 border-b border-paper-border dark:border-zinc-800 last:border-0 hover-dim no-underline">
                <span className="font-serif text-[1.2rem] font-bold text-paper-border dark:text-zinc-800 leading-none block mb-0.5 select-none">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h4 className="font-serif text-[0.86rem] font-bold text-ink dark:text-zinc-100 leading-snug">
                  <span dangerouslySetInnerHTML={{ __html: title }} />
                </h4>
                {cat && <span className="cat-tag text-[0.58rem] block mt-0.5">{cat}</span>}
              </Link>
            )
          })}
        </div>
      )}

      {/* Categorias */}
      {categories.length > 0 && (
        <div className="sidebar-bloco">
          <div className="sidebar-titulo">Categorias</div>
          <ul className="divide-y divide-paper-border dark:divide-zinc-800">
            {categories.filter(c => c.slug !== 'uncategorized').map(cat => (
              <li key={cat.id}>
                <Link href={`/categoria/${cat.slug}`} className="flex items-center justify-between py-2 no-underline hover-dim">
                  <span className="font-sans text-[0.82rem] font-medium text-ink-secondary dark:text-zinc-300 hover:text-brand-500 transition-colors">{cat.name}</span>
                  <span className="font-sans text-[0.68rem] text-ink-light dark:text-zinc-600 tabular-nums">{cat.count}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Tags */}
      <div className="sidebar-bloco">
        <div className="sidebar-titulo">Tópicos</div>
        <div className="flex flex-wrap gap-1.5 mt-1">
          {TAGS.map(tag => (
            <Link key={tag} href={`/busca?q=${encodeURIComponent(tag)}`}
              className="font-sans text-[0.65rem] font-medium px-2.5 py-1 border border-paper-border dark:border-zinc-700 text-ink-muted dark:text-zinc-400 hover:border-brand-500 hover:text-brand-500 transition-all no-underline">
              {tag}
            </Link>
          ))}
        </div>
      </div>
    </aside>
  )
}
