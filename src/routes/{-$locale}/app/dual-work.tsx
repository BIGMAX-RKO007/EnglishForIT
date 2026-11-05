import { createFileRoute } from '@tanstack/react-router'
import { useState, useMemo } from 'react'
import { getOptionalUser } from '@/features/auth/middleware'
import { AppShell } from '@/components/app/app-shell'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { DualLingualCard } from '@/features/it-english/components/DualLingualCard'
import { DUAL_PHRASES } from '@/features/it-english/data/dual-lingual.data'
import { Globe2, Search, Filter, CheckCircle2 } from 'lucide-react'

export const Route = createFileRoute('/{-$locale}/app/dual-work')({
  head: () => ({ meta: [{ name: 'robots', content: 'noindex' }] }),
  loader: async () => {
    const user = await getOptionalUser()
    const effectiveUser = user ?? {
      id: 'guest',
      email: 'engineer@workplace.local',
      name: 'Software Engineer',
    }
    return { user: effectiveUser }
  },
  component: DualWorkPage,
})

const CATEGORIES = [
  { id: 'all', label: '全部场景' },
  { id: 'standup', label: '敏捷站会' },
  { id: 'review', label: '代码审查' },
  { id: 'specs', label: '需求与QA' },
  { id: 'incident', label: '线上事故' },
  { id: 'intro', label: '现场入场与破冰' },
] as const

function DualWorkPage() {
  const { user } = Route.useLoaderData()
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [langMode, setLangMode] = useState<'all' | 'en' | 'ja'>('all')
  const [search, setSearch] = useState('')

  const filteredPhrases = useMemo(() => {
    return DUAL_PHRASES.filter((p) => {
      const matchCat = activeCategory === 'all' || p.category === activeCategory
      const query = search.trim().toLowerCase()
      if (!query) return matchCat

      const matchText =
        p.title.toLowerCase().includes(query) ||
        p.intent.toLowerCase().includes(query) ||
        p.en.text.toLowerCase().includes(query) ||
        p.ja.text.toLowerCase().includes(query) ||
        p.ja.romaji.toLowerCase().includes(query) ||
        p.tip.toLowerCase().includes(query)

      return matchCat && matchText
    })
  }, [activeCategory, search])

  return (
    <AppShell user={user} active="dual-work" crumb="英日双轨对照 (EN & JA)">
      {/* 顶部横幅 */}
      <div className="mb-8 rounded-2xl border border-rose-500/20 bg-gradient-to-br from-rose-500/10 via-sky-500/5 to-transparent p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Badge variant="pro" dot>IT 职场双语融合工作台</Badge>
              <span className="text-xs font-mono text-fg-3">EN (IPA) & JA (Romaji)</span>
            </div>
            <h1 className="mt-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              英日双轨 IT 沟通话术库
            </h1>
            <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-fg-2">
              同一职场意图，同步掌握<strong>国际外企英文（含国际音标 IPA）</strong>与<strong>日本现场日企日语（含罗马音与平假名）</strong>。
              支持英美与东京双真人发音，消灭发音与开口恐惧！
            </p>
          </div>
          <div className="flex items-center gap-3 rounded-xl border border-border/80 bg-card/80 p-3.5 text-xs shadow-sm">
            <Globe2 size={24} className="text-rose-500" />
            <div>
              <div className="font-semibold text-foreground">同场景 · 双语并行</div>
              <div className="text-[11px] text-fg-3">音标 + 罗马音 + 跨文化避坑</div>
            </div>
          </div>
        </div>
      </div>

      {/* 控制工具条：搜索 + 分类选择 + 语言切换 */}
      <div className="mb-6 space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {/* 搜索框 */}
          <div className="relative flex-1 max-w-md">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-fg-3" />
            <Input
              type="text"
              placeholder="搜索场景、关键字（如 500、blocked、仕様書、PR、オンスケ）..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 text-xs sm:text-sm"
            />
          </div>

          {/* 显示语言模式切换 */}
          <div className="flex items-center gap-1 rounded-xl border border-border/80 bg-muted/40 p-1 text-xs self-start sm:self-auto">
            <button
              type="button"
              onClick={() => setLangMode('all')}
              className={`rounded-lg px-3 py-1.5 font-medium transition-all ${
                langMode === 'all'
                  ? 'bg-card text-foreground shadow-sm font-semibold'
                  : 'text-fg-3 hover:text-foreground'
              }`}
            >
              🇬🇧 & 🇯🇵 英日双轨
            </button>
            <button
              type="button"
              onClick={() => setLangMode('en')}
              className={`rounded-lg px-3 py-1.5 font-medium transition-all ${
                langMode === 'en'
                  ? 'bg-card text-sky-600 dark:text-sky-400 shadow-sm font-semibold'
                  : 'text-fg-3 hover:text-foreground'
              }`}
            >
              仅看英语 (音标)
            </button>
            <button
              type="button"
              onClick={() => setLangMode('ja')}
              className={`rounded-lg px-3 py-1.5 font-medium transition-all ${
                langMode === 'ja'
                  ? 'bg-card text-rose-600 dark:text-rose-400 shadow-sm font-semibold'
                  : 'text-fg-3 hover:text-foreground'
              }`}
            >
              仅看日语 (罗马音)
            </button>
          </div>
        </div>

        {/* 分类过滤器按钮组 */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <span className="mr-1 inline-flex items-center gap-1 text-xs text-fg-3">
            <Filter size={13} />
            场景:
          </span>
          {CATEGORIES.map((cat) => {
            const active = activeCategory === cat.id
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                  active
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'bg-card border border-border text-fg-2 hover:bg-muted hover:text-foreground'
                }`}
              >
                {cat.label}
              </button>
            )
          })}
          <span className="ml-auto text-xs font-mono text-fg-3">
            共 {filteredPhrases.length} 条实战金句
          </span>
        </div>
      </div>

      {/* 话术卡片流 */}
      {filteredPhrases.length === 0 ? (
        <Card className="p-12 text-center border-dashed">
          <Search size={32} className="mx-auto mb-3 text-fg-3 opacity-40" />
          <h3 className="text-base font-semibold text-foreground">没有找到匹配的话术</h3>
          <p className="mt-1 text-xs text-fg-3">
            换个关键词试试，或者点击上方“全部场景”清空筛选。
          </p>
        </Card>
      ) : (
        <div className="grid gap-4">
          {filteredPhrases.map((phrase) => (
            <DualLingualCard key={phrase.id} phrase={phrase} mode={langMode} />
          ))}
        </div>
      )}

      {/* 底部引导与工作流说明 */}
      <div className="mt-10 rounded-2xl border border-border/80 bg-card/60 p-5 text-xs text-fg-3">
        <div className="flex items-center gap-2 font-semibold text-foreground mb-1.5">
          <CheckCircle2 size={15} className="text-emerald-500" />
          持续扩建规范说明
        </div>
        <p className="leading-relaxed">
          本库遵循<strong>「高频意图抽取 ➔ 英日双向映射 ➔ 音标+罗马音补全 ➔ 跨文化避坑标注」</strong>的工业级流水线清洗。
          后续加入的任何新教材与日企/外企录音，都将以此标准持续合并增补，打造最实用的在日 IT 沟通宝典！
        </p>
      </div>
    </AppShell>
  )
}
