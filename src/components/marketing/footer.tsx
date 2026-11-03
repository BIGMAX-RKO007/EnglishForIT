import { Link } from '@tanstack/react-router'
import { useTranslation } from '@/features/i18n/provider'
import { Logo } from '@/components/brand/logo'
import { ThemeToggle } from '@/features/theme/theme-toggle'
import { LangSwitch } from '@/features/i18n/lang-switch'

const GITHUB_URL = 'https://github.com/BIGMAX-RKO007/EnglishForIT'

export function Footer({ theme }: { theme: 'light' | 'dark' }) {
  const { t } = useTranslation()
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-bg-alt px-5 md:px-7 py-10">
      <div className="grid gap-7 md:grid-cols-[1.5fr_1fr_1fr]">
        {/* Brand */}
        <div>
          <Logo />
          <p className="mt-3.5 max-w-[24em] text-[13.5px] leading-relaxed text-fg-3">
            {t('marketing.footerTagline')}
          </p>
          <div className="mt-4 flex items-center gap-2">
            <ThemeToggle theme={theme} />
            <LangSwitch />
          </div>
        </div>

        {/* Practice Modules */}
        <FooterCol title="核心模块 (Practice)">
          <Link className="foot-link" to="/{-$locale}/app/self-intro">自我介绍破冰台</Link>
          <Link className="foot-link" to="/{-$locale}/app/project-star">项目经历 STAR</Link>
          <Link className="foot-link" to="/{-$locale}/app/daily-work">日常站会与协同</Link>
          <Link className="foot-link" to="/{-$locale}/app/cheatsheet">工位速查锦囊</Link>
          <Link className="foot-link" to="/{-$locale}/app">实战控制台</Link>
        </FooterCol>

        {/* Resources & Open Source */}
        <FooterCol title="项目与资源 (Resources)">
          <a className="foot-link" href={GITHUB_URL} target="_blank" rel="noreferrer">
            GitHub 仓库
          </a>
          <a className="foot-link" href={`${GITHUB_URL}/blob/main/MANUAL.md`} target="_blank" rel="noreferrer">
            使用手册 (MANUAL.md)
          </a>
          <a className="foot-link" href={`${GITHUB_URL}/blob/main/LICENSE`} target="_blank" rel="noreferrer">
            开源协议 (License)
          </a>
        </FooterCol>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6 text-xs text-fg-3">
        <span>© {year} EnglishForIT. Designed for software engineers.</span>
        <span>Built with TanStack Start & Cloudflare Workers</span>
      </div>
    </footer>
  )
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2 text-[13px]">
      <div className="font-semibold text-foreground mb-1">{title}</div>
      {children}
    </div>
  )
}
