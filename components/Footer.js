import Link from 'next/link'

const LINKS = {
  Conteúdo: [
    { label: 'Ferramentas de IA',  href: '/categoria/ferramentas-de-ia' },
    { label: 'Afiliados',          href: '/categoria/afiliados' },
    { label: 'Renda Extra',        href: '/categoria/renda-extra' },
    { label: 'Tutoriais de IA',    href: '/categoria/tutoriais-de-ia' },
    { label: 'Casos de Sucesso',   href: '/categoria/casos-de-sucesso' },
  ],
  Portal: [
    { label: 'Sobre',                  href: '/sobre' },
    { label: 'Newsletter',             href: '/#newsletter' },
    { label: 'Contato',                href: '/contato' },
    { label: 'Política de Privacidade',href: '/politica-de-privacidade' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-ink dark:bg-zinc-950 text-white/60 mt-0">
      <div className="max-w-[1200px] mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-10 pb-8 border-b border-white/10 mb-6">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="font-serif text-[1.4rem] font-black text-white no-underline block mb-3">
              Monetiza<span className="text-brand-400 italic">IA</span>
            </Link>
            <p className="text-[0.77rem] text-white/40 leading-relaxed mb-4">
              O guia definitivo para ganhar dinheiro com Inteligência Artificial no Brasil.
              Ferramentas testadas, tutoriais práticos e estratégias que funcionam.
            </p>
            <a href="https://youtube.com/@monetizaia" target="_blank" rel="noopener noreferrer"
              className="text-[0.75rem] text-brand-400 no-underline hover:text-brand-300 transition-colors">
              Canal Monetiza IA no YouTube
            </a>
          </div>
          {Object.entries(LINKS).map(([title, links]) => (
            <div key={title}>
              <h5 className="text-[0.62rem] font-bold tracking-[2px] uppercase text-white/30 mb-3">{title}</h5>
              {links.map(l => (
                <Link key={l.href} href={l.href}
                  className="block text-[0.77rem] text-white/55 hover:text-brand-400 no-underline mb-1.5 transition-colors">
                  {l.label}
                </Link>
              ))}
            </div>
          ))}
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center gap-2 text-[0.68rem] text-white/25">
          <span>© 2025 Monetiza IA · Todos os direitos reservados</span>
          <span>Feito com IA no Brasil 🇧🇷</span>
        </div>
      </div>
    </footer>
  )
}
