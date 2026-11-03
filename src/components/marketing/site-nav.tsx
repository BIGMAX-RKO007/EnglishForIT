import * as React from 'react'
import { Link } from '@tanstack/react-router'
import { Menu, X, Github } from 'lucide-react'
import { Logo } from '@/components/brand/logo'
import { buttonVariants } from '@/components/ui/button'
import { ThemeToggle } from '@/features/theme/theme-toggle'
import { LangSwitch } from '@/features/i18n/lang-switch'
import { useTranslation } from '@/features/i18n/provider'

const GITHUB_URL = 'https://github.com/BIGMAX-RKO007/EnglishForIT'

/** Sticky marketing header. Links + CTA collapse into a hamburger menu on mobile. */
export function SiteNav({ theme }: { theme: 'light' | 'dark'; loggedIn?: boolean }) {
  const { t } = useTranslation()
  const [open, setOpen] = React.useState(false)

  const navLinks = (
    <>
      <Link
        to="/{-$locale}/app/self-intro"
        className="rounded-md px-2 py-3 text-sm font-medium text-fg-2 transition-colors hover:bg-bg-alt hover:text-foreground md:py-2"
      >
        自我介绍
      </Link>
      <Link
        to="/{-$locale}/app/project-star"
        className="rounded-md px-2 py-3 text-sm font-medium text-fg-2 transition-colors hover:bg-bg-alt hover:text-foreground md:py-2"
      >
        项目经历 STAR
      </Link>
      <Link
        to="/{-$locale}/app/daily-work"
        className="rounded-md px-2 py-3 text-sm font-medium text-fg-2 transition-colors hover:bg-bg-alt hover:text-foreground md:py-2"
      >
        日常站会与协同
      </Link>
      <Link
        to="/{-$locale}/app/cheatsheet"
        className="rounded-md px-2 py-3 text-sm font-medium text-fg-2 transition-colors hover:bg-bg-alt hover:text-foreground md:py-2"
      >
        工位速查锦囊
      </Link>
    </>
  )

  const cta = (
    <Link to="/{-$locale}/app" className={buttonVariants({ size: 'sm' })}>
      进入实战工作台 ➔
    </Link>
  )

  return (
    <header
      className="sticky top-0 z-30 border-b border-border backdrop-blur"
      style={{ background: 'color-mix(in srgb, var(--background) 82%, transparent)' }}
    >
      <nav className="flex h-16 items-center gap-3 px-4 md:px-7">
        <Link to="/{-$locale}" aria-label="EnglishForIT" className="shrink-0">
          <Logo />
        </Link>
        <div className="flex-1" />

        {/* desktop */}
        <div className="hidden items-center gap-1 md:flex">{navLinks}</div>
        <div className="flex items-center gap-1">
          <ThemeToggle theme={theme} />
          <LangSwitch />
        </div>
        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noreferrer"
          className={buttonVariants({ variant: 'ghost', size: 'sm', className: 'hidden md:inline-flex' })}
          aria-label={t('marketing.githubStar')}
        >
          <Github size={16} />
          <span className="hidden lg:inline">{t('marketing.githubStar')}</span>
        </a>
        <div className="hidden md:block">{cta}</div>

        {/* mobile hamburger */}
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="inline-flex size-9 items-center justify-center rounded-md border border-border text-fg-2 hover:text-foreground md:hidden"
          aria-label="Toggle navigation"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      {/* mobile drawer */}
      {open && (
        <div className="border-t border-border bg-background px-4 py-4 md:hidden flex flex-col gap-2">
          {navLinks}
          <div className="mt-2 pt-2 border-t border-border flex items-center justify-between">
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              className={buttonVariants({ variant: 'outline', size: 'sm', className: 'flex-1 mr-2' })}
            >
              <Github size={16} className="mr-1.5" /> GitHub
            </a>
            <div className="flex-1">{cta}</div>
          </div>
        </div>
      )}
    </header>
  )
}
