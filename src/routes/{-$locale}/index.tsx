import { createFileRoute, getRouteApi } from '@tanstack/react-router'
import { localeHead } from '@/features/seo/seo'
import { getOrigin } from '@/features/seo/seo.fns'
import type { Locale } from '@/features/i18n/locale'
import { SiteNav } from '@/components/marketing/site-nav'
import { Hero } from '@/components/marketing/hero'
import { TechStrip } from '@/components/marketing/tech-strip'
import { Features } from '@/components/marketing/features'
import { FeatureGrid } from '@/components/marketing/feature-grid'
import { AgentSection } from '@/components/marketing/agent-section'
import { CTA } from '@/components/marketing/cta'
import { Footer } from '@/components/marketing/footer'

const rootRoute = getRouteApi('__root__')

export const Route = createFileRoute('/{-$locale}/')({
  loader: async () => ({ origin: await getOrigin() }),
  head: ({ loaderData, params }) => {
    const origin = loaderData?.origin ?? ''
    const locale = ((params as { locale?: string }).locale ?? 'en') as Locale
    const { meta, links } = localeHead({
      origin,
      locale,
      path: '/',
      title: 'EnglishForIT — IT 职场实用英语工作台',
      description:
        locale === 'zh'
          ? 'EnglishForIT——专为软件工程师量身打造的实用英语对练工具。攻克自我介绍、STAR 项目经历、每日站会与代码评审，听得懂、说清楚！'
          : 'EnglishForIT — Practical English for Software Engineers. Master self-introductions, STAR project pitches, and daily workplace communication.',
    })
    return { meta, links }
  },
  component: Home,
})

function Home() {
  const { theme, user } = rootRoute.useLoaderData()
  const loggedIn = !!user

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav theme={theme} loggedIn={loggedIn} />
      <Hero loggedIn={loggedIn} />
      <TechStrip />
      <Features />
      <FeatureGrid />
      <AgentSection />
      <CTA loggedIn={loggedIn} />
      <Footer theme={theme} />
    </div>
  )
}
