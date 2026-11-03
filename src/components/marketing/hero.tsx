import { Link } from '@tanstack/react-router'
import { ArrowRight, Github } from 'lucide-react'
import { useTranslation } from '@/features/i18n/provider'
import { buttonVariants } from '@/components/ui/button'

const GITHUB_URL = 'https://github.com/BIGMAX-RKO007/EnglishForIT'

function TerminalCard() {
  return (
    <div className="term shadow-xl">
      <div className="term-bar">
        <span className="term-dot" style={{ background: '#FF5F57' }} />
        <span className="term-dot" style={{ background: '#FEBC2E' }} />
        <span className="term-dot" style={{ background: '#28C840' }} />
        <span className="ml-2 font-mono text-xs text-fg-3">bash — english-for-it</span>
      </div>
      <div className="term-body font-mono text-[13px] leading-relaxed">
        <div>
          <span className="pr">$</span> npx english-for-it --scenario standup
        </div>
        <div className="ok mt-1">✓ Yesterday: wrapped up auth middleware & unit tests</div>
        <div className="ok">✓ Today: optimizing DB query latency (30k QPS)</div>
        <div className="ok">✓ Blockers: no blockers on my side, waiting for PR review</div>
        
        <div className="mt-3">
          <span className="pr">$</span> npx english-for-it --scenario star-pitch
        </div>
        <div className="ok mt-1">✓ S-T-A-R: Situation ➔ Task ➔ Action ➔ Result</div>
        <div className="ok">✓ Action Verbs: spearheaded, benchmarked, decoupled</div>
        <div className="ok">✓ Pronunciation check: SQL (/ˈsiːkwəl/) · Cache (/kæʃ/)</div>

        <div className="mt-3 text-primary">
          <span className="ok">★</span> 100% Ready for your global tech interview & meetings!
        </div>
        <div className="mt-1.5">
          <span className="pr">$</span> <span className="term-cursor" />
        </div>
      </div>
    </div>
  )
}

export function Hero({ loggedIn: _loggedIn }: { loggedIn?: boolean } = {}) {
  const { t } = useTranslation()

  return (
    <section className="grid-bg grid items-center gap-9 px-5 md:px-7 py-14 md:grid-cols-2">
      <div className="flex flex-col gap-[18px]">
        <div className="inline-flex items-center gap-2">
          <span className="kicker">// 专为程序员打造的实用职场英语</span>
          <span className="rounded-full bg-primary/10 px-2.5 py-0.5 font-mono text-[11px] font-semibold text-primary">
            教材实战版
          </span>
        </div>

        <h1 className="font-display text-[32px] font-bold leading-[1.12] tracking-[-1.2px] sm:text-[42px]">
          {t('marketing.heroTitlePre')}
          <span className="text-primary">{t('marketing.heroTitleHl')}</span>
          {t('marketing.heroTitlePost')}
        </h1>

        <p className="m-0 max-w-[34em] text-base leading-relaxed text-fg-2">
          {t('marketing.heroSubtitle')}
        </p>

        <div className="mt-2 flex flex-wrap gap-3">
          <Link to="/{-$locale}/app" className={buttonVariants({ size: 'lg', className: 'gap-2 shadow-md' })}>
            <span>进入实战工作台</span>
            <ArrowRight size={18} />
          </Link>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            className={buttonVariants({ variant: 'outline', size: 'lg', className: 'gap-2 font-mono text-sm' })}
          >
            <Github size={17} /> GitHub 仓库
          </a>
        </div>

        <div className="mt-2 flex items-center gap-4 text-xs text-fg-3">
          <span className="flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-emerald-500" /> 工位耳机静音听音
          </span>
          <span className="flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-emerald-500" /> 一键复制到 Slack
          </span>
          <span className="flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-emerald-500" /> 免注册直接练习
          </span>
        </div>
      </div>
      <TerminalCard />
    </section>
  )
}
