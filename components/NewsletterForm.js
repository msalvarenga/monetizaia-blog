'use client'
import { useState } from 'react'
export default function NewsletterForm({ dark = false }) {
  const [email, setEmail] = useState('')
  const [sent,  setSent]  = useState(false)
  if (sent) return (
    <p className={`text-sm font-sans ${dark ? 'text-brand-300' : 'text-brand-600'}`}>
      ✓ Perfeito! Você receberá nossos conteúdos toda semana.
    </p>
  )
  return (
    <form className="flex flex-col sm:flex-row gap-2.5 max-w-md mx-auto" onSubmit={e => { e.preventDefault(); setSent(true) }}>
      <input type="email" placeholder="Seu melhor e-mail" value={email} onChange={e => setEmail(e.target.value)} required
        className={`flex-1 font-sans text-sm px-4 py-3 outline-none transition-colors ${
          dark
            ? 'bg-white/8 border border-white/15 text-white placeholder:text-white/35 focus:border-brand-400'
            : 'bg-paper border border-paper-border text-ink placeholder:text-ink-muted focus:border-brand-500'
        }`} />
      <button type="submit"
        className="font-sans text-[0.72rem] font-bold tracking-[0.12em] uppercase px-7 py-3 bg-brand-500 hover:bg-brand-700 text-white transition-colors whitespace-nowrap">
        Quero receber
      </button>
    </form>
  )
}
