import { useState, useMemo } from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { AudioSpeaker } from './AudioSpeaker'
import { CopyButton } from './CopyButton'
import {
  DMP_PROJECT_VOCAB,
} from '../data/project-dmp.data'
import {
  Briefcase,
  Layers,
  ShieldAlert,
  MessageSquare,
  Search,
  Sparkles,
  Database,
  Building2,
  FileSpreadsheet,
} from 'lucide-react'

export function DmpProjectWorkbench() {
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [search, setSearch] = useState('')

  const categories = [
    { id: 'all', label: '全部词汇与话术', count: DMP_PROJECT_VOCAB.length, icon: Layers },
    {
      id: 'lease_business',
      label: '租赁与金融实体',
      count: DMP_PROJECT_VOCAB.filter((v) => v.category === 'lease_business').length,
      icon: Briefcase,
    },
    {
      id: 'data_architecture',
      label: '基盘与数据架构',
      count: DMP_PROJECT_VOCAB.filter((v) => v.category === 'data_architecture').length,
      icon: Database,
    },
    {
      id: 'legacy_constraints',
      label: '系统制约与暗坑',
      count: DMP_PROJECT_VOCAB.filter((v) => v.category === 'legacy_constraints').length,
      icon: ShieldAlert,
    },
    {
      id: 'consulting_phrases',
      label: '现场顾问汇报话术',
      count: DMP_PROJECT_VOCAB.filter((v) => v.category === 'consulting_phrases').length,
      icon: MessageSquare,
    },
  ]

  const filteredItems = useMemo(() => {
    return DMP_PROJECT_VOCAB.filter((item) => {
      const matchCategory =
        activeCategory === 'all' || item.category === activeCategory
      const matchSearch =
        !search.trim() ||
        item.ja.toLowerCase().includes(search.toLowerCase()) ||
        item.zh.toLowerCase().includes(search.toLowerCase()) ||
        item.en.toLowerCase().includes(search.toLowerCase()) ||
        item.definition.toLowerCase().includes(search.toLowerCase()) ||
        item.businessContext.toLowerCase().includes(search.toLowerCase())

      return matchCategory && matchSearch
    })
  }, [activeCategory, search])

  return (
    <div className="space-y-6">
      {/* 顶部项目背景横幅 */}
      <div className="relative overflow-hidden rounded-2xl border border-border/80 bg-gradient-to-br from-card via-card/90 to-primary/5 p-6 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Badge variant="pro" className="font-mono text-xs">
                PROJECT EXCLUSIVE · 当期专属
              </Badge>
              <span className="text-xs text-fg-3">NRI × 芙蓉综合租赁 (FGL) DMP 系统化计划</span>
            </div>
            <h1 className="mt-1 text-xl font-bold tracking-tight text-foreground sm:text-2xl">
              当前业务用语与现场沟通罗盘
            </h1>
            <p className="mt-1 max-w-2xl text-xs sm:text-sm text-fg-2">
              源自《【DMP】システム化計画_AsIs整理_報告書》67页全量业务与技术资产，系统化提炼金融租赁核心生命周期、老旧基干接口痛点与咨询开会开麦防身话术。
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <div className="rounded-xl border border-border bg-muted/40 px-3.5 py-2 text-center">
              <div className="text-[11px] text-fg-3">沉淀专业实体</div>
              <div className="font-mono text-lg font-bold text-foreground">
                {DMP_PROJECT_VOCAB.length}
              </div>
            </div>
            <div className="rounded-xl border border-border bg-muted/40 px-3.5 py-2 text-center">
              <div className="text-[11px] text-fg-3">Edge-TTS 音频</div>
              <div className="font-mono text-lg font-bold text-emerald-600 dark:text-emerald-400">
                100% 静态化
              </div>
            </div>
          </div>
        </div>

        {/* 核心痛点三要素速览 */}
        <div className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-3 text-xs">
          <div className="flex items-center gap-2 rounded-lg bg-background/60 p-2.5 border border-border/60">
            <Building2 size={16} className="text-sky-500 shrink-0" />
            <span className="text-fg-2"><strong>FITNESS 基干壁垒</strong>：1000+ DB、丰洲 DC 隔离、无直接对外接口</span>
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-background/60 p-2.5 border border-border/60">
            <Sparkles size={16} className="text-amber-500 shrink-0" />
            <span className="text-fg-2"><strong>客户名寄危机 (Slide 50)</strong>：合同维度 6 位号 ⟷ 集团 9 位号 ⟷ Salesforce 18位</span>
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-background/60 p-2.5 border border-border/60">
            <FileSpreadsheet size={16} className="text-rose-500 shrink-0" />
            <span className="text-fg-2"><strong>影子 IT 与手动 Excel</strong>：海外航空、JOLCO 复杂金融严重依赖离线流转</span>
          </div>
        </div>
      </div>

      {/* 控制栏：分类筛选与搜索 */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* 分类胶囊 */}
        <div className="flex flex-wrap items-center gap-1.5">
          {categories.map((c) => {
            const Icon = c.icon
            const isActive = activeCategory === c.id
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => setActiveCategory(c.id)}
                className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'border border-border/80 bg-card text-fg-2 hover:bg-muted/80 hover:text-foreground'
                }`}
              >
                <Icon size={13} />
                <span>{c.label}</span>
                <span
                  className={`rounded-full px-1.5 py-0.2 text-[10px] font-mono ${
                    isActive ? 'bg-primary-foreground/20 text-white' : 'bg-muted text-fg-3'
                  }`}
                >
                  {c.count}
                </span>
              </button>
            )
          })}
        </div>

        {/* 搜索框 */}
        <div className="relative max-w-xs flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-fg-3" />
          <Input
            type="text"
            placeholder="搜索名寄せ、穴あけ、期中残高、FITNESS..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8 text-xs"
          />
        </div>
      </div>

      {/* 卡片矩阵 */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {filteredItems.map((item) => (
          <Card
            key={item.id}
            className="group relative flex flex-col justify-between overflow-hidden border-border/80 bg-card p-4 transition-all hover:border-primary/40 hover:shadow-md"
          >
            <div>
              {/* 头部：分类徽标 + 发音 + 复制 */}
              <div className="flex items-center justify-between gap-2">
                <span className="rounded bg-muted px-2 py-0.5 text-[11px] font-medium text-fg-2 border border-border/60">
                  {item.categoryLabel}
                </span>
                <div className="flex items-center gap-1.5">
                  <AudioSpeaker
                    text={item.ja}
                    audioUrl={`/audio/dmp/${item.id}_term_ja.mp3`}
                    lang="ja"
                    label="日文术语"
                  />
                  <CopyButton text={item.ja} label="复制" />
                </div>
              </div>

              {/* 术语主标题与注音 */}
              <div className="mt-2.5">
                <div className="flex items-baseline gap-2">
                  <h3 className="text-lg font-bold text-foreground tracking-tight">
                    {item.ja}
                  </h3>
                  <span className="font-mono text-xs text-rose-600 dark:text-rose-400">
                    【{item.furigana}】
                  </span>
                  <span className="font-mono text-xs text-fg-3">
                    {item.romaji}
                  </span>
                </div>
                <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs">
                  <span className="font-semibold text-emerald-700 dark:text-emerald-300">
                    🇨🇳 {item.zh}
                  </span>
                  <span className="text-fg-3">·</span>
                  <span className="font-medium text-sky-700 dark:text-sky-300">
                    🇺🇸 {item.en}
                  </span>
                </div>
              </div>

              {/* 专业定义与业务场景 */}
              <div className="mt-3 space-y-2 text-xs">
                <p className="leading-relaxed text-fg-2">
                  {item.definition}
                </p>

                <div className="rounded-lg border border-amber-500/20 bg-amber-500/10 p-2.5 text-amber-900 dark:text-amber-200">
                  <div className="flex items-center gap-1 font-semibold text-amber-800 dark:text-amber-300 text-[11px]">
                    <Sparkles size={12} />
                    <span>PPT 报告现场背景 / 业务痛点：</span>
                  </div>
                  <p className="mt-0.5 leading-relaxed text-[11px]">
                    {item.businessContext}
                  </p>
                </div>
              </div>
            </div>

            {/* 实战沟通句式 (若存在) */}
            {item.dialogueJa && (
              <div className="mt-4 rounded-xl border border-border/80 bg-muted/40 p-3 text-xs">
                <div className="mb-1.5 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-fg-3 uppercase tracking-wider">
                    🗣️ 现场开会开麦话术对账
                  </span>
                  <div className="flex items-center gap-1">
                    <AudioSpeaker
                      text={item.dialogueJa}
                      audioUrl={`/audio/dmp/${item.id}_dialogue_ja.mp3`}
                      lang="ja"
                      label="日音"
                    />
                    <AudioSpeaker
                      text={item.dialogueEn || ''}
                      audioUrl={`/audio/dmp/${item.id}_dialogue_en.mp3`}
                      lang="en"
                      label="美音"
                    />
                    <AudioSpeaker
                      text={item.dialogueZh || ''}
                      audioUrl={`/audio/dmp/${item.id}_dialogue_zh.mp3`}
                      lang="zh"
                      label="中文"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="font-medium text-foreground">
                    <span className="font-bold text-rose-600 dark:text-rose-400 mr-1.5">JP</span>
                    {item.dialogueJa}
                  </div>
                  {item.dialogueZh && (
                    <div className="text-fg-2">
                      <span className="font-bold text-emerald-600 dark:text-emerald-400 mr-1.5">CN</span>
                      {item.dialogueZh}
                    </div>
                  )}
                  {item.dialogueEn && (
                    <div className="text-fg-3 font-mono text-[11px]">
                      <span className="font-bold text-sky-600 dark:text-sky-400 mr-1.5">EN</span>
                      {item.dialogueEn}
                    </div>
                  )}
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  )
}
