import { Headphones, Copy, Sparkles, BookOpen, HelpCircle, CheckCircle2, Volume2, Cloud } from 'lucide-react'
import { useTranslation } from '@/features/i18n/provider'
import { Card } from '@/components/ui/card'

const ITEMS = [
  { Icon: Headphones, title: 'features.f1Title', body: 'features.f1Body' },
  { Icon: Copy, title: 'features.f2Title', body: 'features.f2Body' },
  { Icon: Sparkles, title: 'features.f3Title', body: 'features.f3Body' },
  { Icon: Volume2, title: 'features.f4Title', body: 'features.f4Body' },
  { Icon: HelpCircle, title: 'features.f5Title', body: 'features.f5Body' },
  { Icon: CheckCircle2, title: 'features.f6Title', body: 'features.f6Body' },
  { Icon: BookOpen, title: 'features.f7Title', body: 'features.f7Body' },
  { Icon: Cloud, title: 'features.f8Title', body: 'features.f8Body' },
] as const

export function FeatureGrid() {
  const { t } = useTranslation()
  return (
    <section className="border-t border-border px-5 md:px-7 py-12">
      <span className="kicker">{t('features.kicker')}</span>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {ITEMS.map(({ Icon, title, body }) => (
          <Card key={title} className="p-5 hover:border-border-strong transition-all">
            <div className="flex items-center gap-2.5">
              <span className="icon-tile">
                <Icon size={20} aria-hidden="true" />
              </span>
              <h3 className="m-0 text-[16px] font-semibold">{t(title)}</h3>
            </div>
            <p className="mb-0 mt-2.5 text-[13px] leading-relaxed text-fg-2">{t(body)}</p>
          </Card>
        ))}
      </div>
    </section>
  )
}
