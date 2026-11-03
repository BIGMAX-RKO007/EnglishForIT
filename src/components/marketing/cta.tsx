import { Link } from '@tanstack/react-router'
import { ArrowRight, Sparkles } from 'lucide-react'
import { useTranslation } from '@/features/i18n/provider'
import { buttonVariants } from '@/components/ui/button'

const GITHUB_URL = 'https://github.com/BIGMAX-RKO007/EnglishForIT'

export function CTA({ loggedIn: _loggedIn }: { loggedIn?: boolean } = {}) {
  const { t } = useTranslation()

  return (
    <section className="grid-bg border-t border-border px-5 md:px-7 py-16 text-center">
      <div className="mx-auto max-w-2xl">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary mb-3">
          <Sparkles size={14} /> 现学现用 · 零门槛开启
        </div>
        <h2 className="font-display text-[28px] font-bold tracking-[-0.6px] sm:text-[34px]">
          {t('marketing.ctaTitle')}
        </h2>
        <p className="mx-auto mb-6 mt-2.5 max-w-[34em] text-[15px] leading-relaxed text-fg-2">
          {t('marketing.ctaBody')}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link to="/{-$locale}/app" className={buttonVariants({ size: 'lg', className: 'gap-2 shadow-md' })}>
            <span>{t('marketing.ctaButton')}</span>
            <ArrowRight size={18} />
          </Link>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            className={buttonVariants({ variant: 'outline', size: 'lg' })}
          >
            GitHub 源码
          </a>
        </div>
      </div>
    </section>
  )
}
