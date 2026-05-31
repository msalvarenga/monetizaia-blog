'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const NAV_LINKS = [
  { label: 'Ferramentas de IA',  href: '/categoria/ferramentas-de-ia' },
  { label: 'Afiliados',          href: '/categoria/afiliados' },
  { label: 'Renda Extra',        href: '/categoria/renda-extra' },
  { label: 'Tutoriais',          href: '/categoria/tutoriais-de-ia' },
  { label: 'Casos de Sucesso',   href: '/categoria/casos-de-sucesso' },
]

export default function Navbar() {
  const [scrolled,    setScrolled]    = useState(false)
  const [menuOpen,    setMenuOpen]    = useState(false)
  const [searchOpen,  setSearchOpen]  = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [dateStr,     setDateStr]     = useState('')
  const [dark,        setDark]        = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('theme')
    if (stored === 'dark' || (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setDark(true)
      document.documentElement.classList.add('dark')
    }
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    setDateStr(new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }))
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const toggleDark = () => {
    const next = !dark
    setDark(next)
    document.documentElement.classList.toggle('dark', next)
    localStorage.setItem('theme', next ? 'dark' : 'light')
  }

  return (
    <>
      {/* Topo utilitário */}
      <div className="hidden md:block border-b border-paper-border bg-paper-warm dark:bg-zinc-950 dark:border-zinc-800">
        <div className="max-w-[1200px] mx-auto px-6 py-[6px] flex items-center justify-between">
          <span className="font-sans text-[0.7rem] text-ink-muted dark:text-zinc-500 capitalize tracking-wide">{dateStr}</span>
          <span className="font-sans text-[0.7rem] font-semibold tracking-[0.14em] uppercase text-ink-secondary dark:text-zinc-400">
            Aprenda a monetizar com Inteligência Artificial
          </span>
          <button onClick={toggleDark} className="font-sans text-[0.7rem] text-ink-muted dark:text-zinc-500 hover:text-ink dark:hover:text-zinc-100 transition-colors">
            {dark ? 'Modo Claro' : '● Modo Escuro'}
          </button>
        </div>
      </div>

      {/* Masthead */}
      <div className="bg-paper-warm dark:bg-zinc-950 border-b-[3px] border-ink dark:border-zinc-100 px-6 pt-5 pb-0">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex items-center justify-center pb-4 border-b border-paper-border dark:border-zinc-800 relative">
            <div className="text-center">
              <Link href="/" className="font-serif text-[clamp(1.8rem,4vw,3rem)] font-black tracking-tight text-ink dark:text-zinc-50 leading-none no-underline">
                Monetiza<span className="text-brand-500 italic">IA</span>
              </Link>
              <div className="font-sans text-[0.68rem] font-medium tracking-[2px] uppercase text-ink-muted dark:text-zinc-500 mt-1">
                Inteligência Artificial para Renda Extra
              </div>
            </div>
            <div className="hidden md:flex items-center gap-3 absolute right-0">
              <button onClick={() => setSearchOpen(!searchOpen)} aria-label="Buscar" className="text-ink-muted dark:text-zinc-400 hover:text-ink dark:hover:text-zinc-100 transition-colors">
                <svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="7"/><path strokeLinecap="round" d="m21 21-4.35-4.35"/>
                </svg>
              </button>
              <button onClick={toggleDark} className="text-ink-muted dark:text-zinc-400 hover:text-ink dark:hover:text-zinc-100 transition-colors" aria-label="Tema">
                {dark
                  ? <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"/><path strokeLinecap="round" d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
                  : <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z"/></svg>
                }
              </button>
              <Link href="/#newsletter" className="font-sans text-[0.72rem] font-bold tracking-[0.1em] uppercase px-4 py-1.5 border border-ink dark:border-zinc-100 text-ink dark:text-zinc-100 hover:bg-ink hover:text-paper dark:hover:bg-zinc-100 dark:hover:text-zinc-900 transition-all no-underline">
                Newsletter
              </Link>
            </div>
          </div>

          {searchOpen && (
            <div className="py-2.5 border-b border-paper-border dark:border-zinc-800 animate-fade-up">
              <form action="/busca" method="GET" className="flex items-center gap-3 max-w-lg mx-auto">
                <input type="text" name="q" value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Buscar artigos..." autoFocus
                  className="flex-1 text-sm bg-transparent border-b border-ink dark:border-zinc-300 outline-none pb-1 text-ink dark:text-zinc-100 placeholder:text-ink-muted font-sans" />
                <button type="submit" className="font-sans text-[0.7rem] font-bold tracking-[0.12em] uppercase text-ink dark:text-zinc-100">Buscar</button>
                <button type="button" onClick={() => setSearchOpen(false)} className="text-ink-muted text-xs">✕</button>
              </form>
            </div>
          )}

          <nav className="hidden md:flex items-center gap-0 py-0">
            {NAV_LINKS.map(l => (
              <Link key={l.href} href={l.href}
                className="font-sans text-[0.72rem] font-semibold tracking-[0.1em] uppercase text-ink-secondary dark:text-zinc-300 hover:text-ink dark:hover:text-zinc-50 transition-colors px-0 py-2.5 mr-6">
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Nav preta sticky */}
      <div className={`bg-ink dark:bg-zinc-950 sticky top-0 z-50 md:hidden transition-shadow duration-300 ${scrolled ? 'shadow-md' : ''}`}>
        <div className="flex items-center justify-between px-4 py-3">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-white/80" aria-label="Menu">
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              {menuOpen ? <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12"/> : <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16"/>}
            </svg>
          </button>
          <Link href="/" className="font-serif text-lg font-black text-white no-underline">Monetiza<span className="text-brand-400 italic">IA</span></Link>
          <button onClick={() => setSearchOpen(!searchOpen)} className="text-white/80">
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="7"/><path strokeLinecap="round" d="m21 21-4.35-4.35"/>
            </svg>
          </button>
        </div>
        {menuOpen && (
          <div className="bg-ink border-t border-white/10 px-5 py-4 space-y-3">
            {NAV_LINKS.map(l => (
              <Link key={l.href} href={l.href} onClick={() => setMenuOpen(false)}
                className="block font-sans text-sm font-medium text-white/80 hover:text-white no-underline">
                {l.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
