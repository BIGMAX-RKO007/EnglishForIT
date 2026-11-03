import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { getOptionalUser } from '@/features/auth/middleware'
import { AppShell } from '@/components/app/app-shell'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { AudioSpeaker } from '@/features/it-english/components/AudioSpeaker'
import { CopyButton } from '@/features/it-english/components/CopyButton'
import { CHEATSHEET_ITEMS, PRONUNCIATION_ITEMS } from '@/features/it-english/data/cheatsheet.data'
import { Search, AlertCircle } from 'lucide-react'

export const Route = createFileRoute('/{-$locale}/app/cheatsheet')({
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
  component: CheatSheetPage,
})

function CheatSheetPage() {
  const { user } = Route.useLoaderData()
  const [activeTab, setActiveTab] = useState<'phrases' | 'pronounce'>('phrases')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredItems = CHEATSHEET_ITEMS.filter((item) => {
    const matchCat = selectedCategory === 'all' || item.category === selectedCategory
    const matchQuery =
      searchQuery.trim() === '' ||
      item.phraseEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.phraseZh.includes(searchQuery) ||
      item.exampleSentenceEn.toLowerCase().includes(searchQuery.toLowerCase())
    return matchCat && matchQuery
  })

  return (
    <AppShell user={user} active="cheatsheet" crumb="工位速查 (Pocket Cheat Sheet)">
      <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="page-h">工位秒查锦囊与发音纠错</h1>
            <Badge variant="pro" dot>教材核心语块</Badge>
          </div>
          <p className="mt-1 text-sm text-fg-2">
            收录《English For IT Professionals 1.0 & 2.0》中最地道的工程语块与极易读错的技术名词，支持一键听音与复制。
          </p>
        </div>

        <div className="flex items-center rounded-lg border border-border bg-muted/40 p-1 text-xs">
          <button
            type="button"
            onClick={() => setActiveTab('phrases')}
            className={`rounded-md px-3 py-1.5 font-medium transition-all ${
              activeTab === 'phrases' ? 'bg-card text-foreground shadow-sm' : 'text-fg-3 hover:text-foreground'
            }`}
          >
            高频语块与例句
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('pronounce')}
            className={`rounded-md px-3 py-1.5 font-medium transition-all ${
              activeTab === 'pronounce' ? 'bg-card text-foreground shadow-sm' : 'text-fg-3 hover:text-foreground'
            }`}
          >
            技术名词发音避坑
          </button>
        </div>
      </div>

      {activeTab === 'phrases' && (
        <div className="space-y-4">
          {/* Filters & Search */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-1.5 text-xs">
              <button
                type="button"
                onClick={() => setSelectedCategory('all')}
                className={`rounded-md px-2.5 py-1 font-medium transition-all ${
                  selectedCategory === 'all'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-fg-3 hover:text-foreground'
                }`}
              >
                全部语块
              </button>
              <button
                type="button"
                onClick={() => setSelectedCategory('sdlc')}
                className={`rounded-md px-2.5 py-1 font-medium transition-all ${
                  selectedCategory === 'sdlc'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-fg-3 hover:text-foreground'
                }`}
              >
                架构与工程
              </button>
              <button
                type="button"
                onClick={() => setSelectedCategory('meetings')}
                className={`rounded-md px-2.5 py-1 font-medium transition-all ${
                  selectedCategory === 'meetings'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-fg-3 hover:text-foreground'
                }`}
              >
                站会与敏捷
              </button>
              <button
                type="button"
                onClick={() => setSelectedCategory('code-review')}
                className={`rounded-md px-2.5 py-1 font-medium transition-all ${
                  selectedCategory === 'code-review'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-fg-3 hover:text-foreground'
                }`}
              >
                PR与代码审查
              </button>
              <button
                type="button"
                onClick={() => setSelectedCategory('incident')}
                className={`rounded-md px-2.5 py-1 font-medium transition-all ${
                  selectedCategory === 'incident'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-fg-3 hover:text-foreground'
                }`}
              >
                故障与排障
              </button>
              <button
                type="button"
                onClick={() => setSelectedCategory('polite-fillers')}
                className={`rounded-md px-2.5 py-1 font-medium transition-all ${
                  selectedCategory === 'polite-fillers'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-fg-3 hover:text-foreground'
                }`}
              >
                职场垫话与过渡
              </button>
            </div>

            <div className="relative w-full sm:w-64">
              <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-fg-3" />
              <Input
                placeholder="搜索语块或例句..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 text-xs"
              />
            </div>
          </div>

          {/* Cards grid */}
          <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredItems.map((item) => (
              <Card key={item.id} className="flex flex-col justify-between p-4 transition-all hover:border-border-strong">
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="font-mono text-sm font-bold text-primary">{item.phraseEn}</span>
                      <p className="mt-0.5 text-xs text-fg-2">{item.phraseZh}</p>
                    </div>
                    <Badge variant="free" className="text-[10px]">
                      {item.categoryZh}
                    </Badge>
                  </div>

                  {item.phoneticOrContext && (
                    <div className="mt-2 text-[11px] text-fg-3">
                      🎯 <span className="font-medium">适用场景：</span>{item.phoneticOrContext}
                    </div>
                  )}

                  <div className="mt-3 rounded-lg bg-muted/40 p-2.5 text-xs">
                    <p className="font-medium text-foreground">{item.exampleSentenceEn}</p>
                    <p className="mt-1 text-[11px] text-fg-3">{item.exampleSentenceZh}</p>
                  </div>
                </div>

                <div className="mt-3.5 flex items-center justify-end gap-2 border-t border-border/60 pt-2.5">
                  <AudioSpeaker text={item.exampleSentenceEn} label="发音" size={13} />
                  <CopyButton text={item.exampleSentenceEn} label="复制" size={13} />
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'pronounce' && (
        <div className="space-y-4">
          <div className="rounded-xl border border-border bg-card p-4 text-xs text-fg-3">
            <div className="flex items-center gap-2">
              <AlertCircle size={16} className="text-amber-500" />
              <span className="font-semibold text-foreground">为什么程序员一定要纠正这几个词？</span>
            </div>
            <p className="mt-1.5 leading-relaxed">
              很多国内工程师技术非常厉害，但一开口就把 SQL 读成拼音、把 Azure 读成阿居尔、把 Cache 读成卡车。
              在跨国技术面试中，准确的技术发音能瞬间建立你的专业信任感！
            </p>
          </div>

          <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
            {PRONUNCIATION_ITEMS.map((item) => (
              <Card key={item.id} className="p-4 transition-all hover:border-border-strong">
                <div className="flex items-center justify-between border-b border-border pb-2.5">
                  <h3 className="font-mono text-lg font-bold text-primary">{item.term}</h3>
                  <AudioSpeaker text={item.audioText} label="示范" size={14} />
                </div>

                <div className="mt-3 space-y-2 text-xs">
                  <div>
                    <span className="text-[11px] font-semibold text-fg-3">正确音标 / 读音：</span>
                    <p className="font-mono font-medium text-emerald-600 dark:text-emerald-400">
                      {item.correctPhonetic}
                    </p>
                  </div>

                  <div>
                    <span className="text-[11px] font-semibold text-fg-3">常见翻车误读：</span>
                    <p className="text-rose-500 dark:text-rose-400">{item.commonMistake}</p>
                  </div>

                  <div className="rounded-md bg-muted/40 p-2 text-[11px]">
                    <span className="font-medium text-foreground">情境造句：</span>
                    <p className="mt-0.5 text-fg-2">{item.contextSentenceEn}</p>
                    <p className="text-fg-3">{item.contextSentenceZh}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </AppShell>
  )
}
