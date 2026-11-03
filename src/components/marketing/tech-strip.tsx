import { useTranslation } from '@/features/i18n/provider'

const MODULES = [
  '30s/1m 自我介绍破冰',
  'STAR 项目架构表达',
  'Daily Standup 每日站会',
  'PR & Code Review 评审',
  '生产故障紧急排障',
  '技术名词标准发音',
] as const

export function TechStrip() {
  const { t } = useTranslation()
  return (
    <section className="border-t border-border px-5 md:px-7 py-4 bg-muted/20">
      <p className="m-0 text-center font-mono text-[12.5px] text-fg-3">
        <span className="text-primary font-semibold">{t('marketing.builtOn')}</span> {MODULES.join(' · ')}
      </p>
    </section>
  )
}
