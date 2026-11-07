import { useState, useMemo } from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { AudioSpeaker } from './AudioSpeaker'
import { CopyButton } from './CopyButton'
import {
  CNL_VERB_FORMULAS,
  CNL_SHELL_ITEMS,
  type CnlFormula,
  type ShellItem,
  type CnlSlotOption,
} from '../data/cnl-defense.data'
import {
  Zap,
  Shield,
  Search,
  Sparkles,
  HelpCircle,
  Layers,
} from 'lucide-react'

export function CnlSlotWorkbench() {
  const [activeTab, setActiveTab] = useState<'verbs' | 'shell'>('verbs')
  const [selectedVerb, setSelectedVerb] = useState<string>('ALL')
  const [shellCategory, setShellCategory] = useState<string>('ALL')
  const [search, setSearch] = useState<string>('')

  // 记录每个动词公式当前选中的槽位 index（或自定义输入）
  const [selectedSlots, setSelectedSlots] = useState<Record<string, number>>({})
  const [customSlots, setCustomSlots] = useState<Record<string, string>>({})

  // 记录安全壳中选中的槽位 index
  const [selectedShellSlots, setSelectedShellSlots] = useState<Record<string, number>>({})

  // 动词引擎过滤
  const filteredVerbs = useMemo(() => {
    return CNL_VERB_FORMULAS.filter((formula) => {
      const matchVerb = selectedVerb === 'ALL' || formula.verbCategory === selectedVerb
      const q = search.trim().toLowerCase()
      if (!q) return matchVerb
      const matchSearch =
        formula.title.toLowerCase().includes(q) ||
        formula.templateEn.toLowerCase().includes(q) ||
        formula.mentalModel.toLowerCase().includes(q) ||
        formula.templateJa.toLowerCase().includes(q) ||
        formula.slots.some((s) => s.en.toLowerCase().includes(q) || s.label.includes(q))
      return matchVerb && matchSearch
    })
  }, [selectedVerb, search])

  // 安全壳过滤
  const filteredShell = useMemo(() => {
    return CNL_SHELL_ITEMS.filter((item) => {
      const matchCat = shellCategory === 'ALL' || item.category === shellCategory
      const q = search.trim().toLowerCase()
      if (!q) return matchCat
      const matchSearch =
        item.intent.toLowerCase().includes(q) ||
        item.templateEn.toLowerCase().includes(q) ||
        item.templateJa.toLowerCase().includes(q) ||
        (item.slots && item.slots.some((s) => s.en.toLowerCase().includes(q) || s.label.includes(q)))
      return matchCat && matchSearch
    })
  }, [shellCategory, search])

  // 渲染单个动词公式卡片
  const renderFormulaCard = (formula: CnlFormula) => {
    const activeIndex = selectedSlots[formula.id] ?? formula.defaultSlotIndex
    const customText = customSlots[formula.id] ?? ''
    const currentSlot: CnlSlotOption = customText
      ? {
          label: '自定义',
          en: customText,
          phonics: customText.toUpperCase(),
          ja: customText,
          romaji: customText,
        }
      : formula.slots[activeIndex] || formula.slots[0]

    // 动态生成英语句子、Phonics、日语
    const filledEn = formula.templateEn.replace('{X}', currentSlot.en).replace('{Y}', 'tomorrow')
    const filledPhonics = formula.phonicsTemplate.replace('{X}', currentSlot.phonics).replace('{Y}', 'tuh-MAH-roh')
    const filledJa = formula.templateJa.replace('{X}', currentSlot.ja).replace('{Y}', '明日')
    const filledRomaji = formula.romajiTemplate.replace('{X}', currentSlot.romaji).replace('{Y}', 'ashita')

    return (
      <Card
        key={formula.id}
        className="overflow-hidden border border-border/80 bg-card/60 p-5 shadow-sm transition-all hover:border-primary/40 hover:shadow-md"
      >
        {/* 卡片头部 */}
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2 border-b border-border/60 pb-3">
          <div className="flex items-center gap-2">
            <Badge variant="pro" className="font-mono font-bold">
              {formula.verbCategory}
            </Badge>
            <span className="text-sm font-semibold text-foreground">{formula.title}</span>
          </div>
          <span className="text-xs text-fg-3 flex items-center gap-1">
            <Layers size={13} className="text-primary/70" />
            <span>物理意象：{formula.mentalModel}</span>
          </span>
        </div>

        {/* 交互式槽位选择器 */}
        <div className="mb-4 rounded-xl border border-border/60 bg-muted/30 p-3">
          <div className="mb-2 flex items-center justify-between text-xs">
            <span className="font-medium text-fg-2 flex items-center gap-1">
              🧩 <strong>选择填入槽位 [{formula.slotName}]：</strong>
            </span>
            <span className="text-[11px] text-fg-3">点击即时拼装生成</span>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {formula.slots.map((slot, idx) => {
              const isSelected = !customText && activeIndex === idx
              return (
                <button
                  key={slot.en}
                  type="button"
                  onClick={() => {
                    setSelectedSlots((prev) => ({ ...prev, [formula.id]: idx }))
                    setCustomSlots((prev) => ({ ...prev, [formula.id]: '' }))
                  }}
                  className={`rounded-lg px-2.5 py-1 text-xs transition-all ${
                    isSelected
                      ? 'bg-primary text-primary-foreground font-semibold shadow-sm'
                      : 'border border-border/80 bg-card text-fg-2 hover:bg-muted/80'
                  }`}
                >
                  {slot.label}
                </button>
              )
            })}
          </div>

          {/* 自定义槽位输入 */}
          <div className="mt-2.5 flex items-center gap-2">
            <Input
              type="text"
              placeholder={`自定义输入英文槽位（如 the Redis logs）...`}
              value={customText}
              onChange={(e) => {
                setCustomSlots((prev) => ({ ...prev, [formula.id]: e.target.value }))
              }}
              className="h-8 text-xs bg-card"
            />
            {customText && (
              <button
                type="button"
                onClick={() => setCustomSlots((prev) => ({ ...prev, [formula.id]: '' }))}
                className="text-[11px] text-rose-500 hover:underline shrink-0"
              >
                重置
              </button>
            )}
          </div>
        </div>

        {/* 动态拼装结果展示 */}
        <div className="space-y-3">
          {/* 🇬🇧 英语拼装 + Phonics */}
          <div className="rounded-xl border border-sky-500/20 bg-gradient-to-r from-sky-500/5 via-transparent to-transparent p-3.5">
            <div className="mb-1.5 flex items-center justify-between">
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-sky-600 dark:text-sky-400">
                🇬🇧 English（拼装成句）
              </span>
              <div className="flex items-center gap-1.5">
                <AudioSpeaker text={filledEn} lang="en" label="美音" />
                <CopyButton text={filledEn} label="复制英文" />
              </div>
            </div>

            <p className="text-sm font-semibold text-foreground sm:text-base tracking-tight">
              {filledEn}
            </p>

            <div className="mt-2 flex flex-wrap items-center gap-1.5 text-xs">
              <span className="rounded bg-sky-500/15 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400 border border-sky-500/20">
                Phonics 拼读
              </span>
              <span className="font-mono text-xs font-medium text-sky-800 dark:text-sky-200">
                {filledPhonics}
              </span>
            </div>
          </div>

          {/* 🇯🇵 日语对账 + 罗马音 */}
          <div className="rounded-xl border border-rose-500/20 bg-gradient-to-r from-rose-500/5 via-transparent to-transparent p-3.5">
            <div className="mb-1.5 flex items-center justify-between">
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-rose-600 dark:text-rose-400">
                🇯🇵 日本語（现场敬语对应）
              </span>
              <div className="flex items-center gap-1.5">
                <AudioSpeaker text={filledJa} lang="ja" label="日音" />
                <CopyButton text={filledJa} label="复制日文" />
              </div>
            </div>

            <p className="text-sm font-semibold text-foreground sm:text-base tracking-tight">
              {filledJa}
            </p>

            <div className="mt-1.5 flex items-center gap-1.5 text-xs font-mono text-rose-700/80 dark:text-rose-300/80">
              <span className="text-[10px] uppercase tracking-wider text-fg-3 font-sans">罗马音:</span>
              <span>{filledRomaji}</span>
            </div>
          </div>
        </div>

        {/* 提示心法 */}
        {formula.tip && (
          <div className="mt-3.5 flex items-start gap-2 rounded-lg bg-amber-500/10 p-2.5 text-xs leading-relaxed text-amber-900 dark:text-amber-200 border border-amber-500/20">
            <Sparkles size={14} className="mt-0.5 shrink-0 text-amber-600 dark:text-amber-400" />
            <div>
              <strong className="font-semibold text-amber-700 dark:text-amber-300">防身心法：</strong>
              {formula.tip}
            </div>
          </div>
        )}
      </Card>
    )
  }

  // 渲染单个安全壳卡片
  const renderShellCard = (shell: ShellItem) => {
    const hasSlots = Boolean(shell.slots && shell.slots.length > 0)
    const activeIndex = selectedShellSlots[shell.id] ?? 0
    const currentSlot = hasSlots && shell.slots ? shell.slots[activeIndex] : null

    const filledEn = currentSlot && shell.slotPlaceholder
      ? shell.templateEn.replace(shell.slotPlaceholder, currentSlot.en)
      : shell.templateEn

    const filledPhonics = currentSlot && shell.slotPlaceholder
      ? shell.phonics.replace(shell.slotPlaceholder, currentSlot.phonics)
      : shell.phonics

    const filledJa = currentSlot && shell.slotPlaceholder
      ? shell.templateJa.replace(shell.slotPlaceholder, currentSlot.ja)
      : shell.templateJa

    const filledRomaji = currentSlot && shell.slotPlaceholder
      ? shell.romaji.replace(shell.slotPlaceholder, currentSlot.romaji)
      : shell.romaji

    return (
      <Card
        key={shell.id}
        className="overflow-hidden border border-border/80 bg-card/60 p-5 shadow-sm transition-all hover:border-primary/40 hover:shadow-md"
      >
        <div className="mb-3 flex items-center justify-between border-b border-border/60 pb-3">
          <div className="flex items-center gap-2">
            <Badge variant="pro" dot>
              {shell.categoryLabel}
            </Badge>
            <span className="text-sm font-semibold text-foreground">{shell.intent}</span>
          </div>
        </div>

        {/* 如果有槽位选择 */}
        {hasSlots && shell.slots && (
          <div className="mb-3 rounded-lg border border-border/60 bg-muted/30 p-2.5">
            <div className="mb-1.5 text-xs font-medium text-fg-2">
              🧩 <strong>替换 [{shell.slotName || '对象'}]：</strong>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {shell.slots.map((slot, idx) => (
                <button
                  key={slot.en}
                  type="button"
                  onClick={() => setSelectedShellSlots((prev) => ({ ...prev, [shell.id]: idx }))}
                  className={`rounded-lg px-2 py-0.5 text-xs transition-all ${
                    activeIndex === idx
                      ? 'bg-primary text-primary-foreground font-semibold shadow-sm'
                      : 'border border-border/80 bg-card text-fg-2 hover:bg-muted/80'
                  }`}
                >
                  {slot.label}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-3">
          {/* 英文 + Phonics */}
          <div className="rounded-xl border border-sky-500/20 bg-gradient-to-r from-sky-500/5 via-transparent to-transparent p-3">
            <div className="mb-1 flex items-center justify-between">
              <span className="text-xs font-semibold text-sky-600 dark:text-sky-400">
                🇬🇧 English
              </span>
              <div className="flex items-center gap-1.5">
                <AudioSpeaker text={filledEn} lang="en" label="美音" />
                <CopyButton text={filledEn} label="复制英文" />
              </div>
            </div>
            <p className="text-sm font-semibold text-foreground">{filledEn}</p>
            <div className="mt-1.5 flex flex-wrap items-center gap-1.5 text-xs">
              <span className="rounded bg-sky-500/15 px-1 py-0.2 text-[10px] font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
                Phonics
              </span>
              <span className="font-mono text-xs font-medium text-sky-800 dark:text-sky-200">
                {filledPhonics}
              </span>
            </div>
          </div>

          {/* 日文 + 罗马音 */}
          <div className="rounded-xl border border-rose-500/20 bg-gradient-to-r from-rose-500/5 via-transparent to-transparent p-3">
            <div className="mb-1 flex items-center justify-between">
              <span className="text-xs font-semibold text-rose-600 dark:text-rose-400">
                🇯🇵 日本語
              </span>
              <div className="flex items-center gap-1.5">
                <AudioSpeaker text={filledJa} lang="ja" label="日音" />
                <CopyButton text={filledJa} label="复制日文" />
              </div>
            </div>
            <p className="text-sm font-semibold text-foreground">{filledJa}</p>
            <div className="mt-1 text-xs font-mono text-rose-700/80 dark:text-rose-300/80">
              <span className="text-[10px] text-fg-3 mr-1 font-sans">罗马音:</span>
              <span>{filledRomaji}</span>
            </div>
          </div>
        </div>

        {shell.tip && (
          <div className="mt-3 flex items-start gap-2 rounded-lg bg-amber-500/10 p-2.5 text-xs text-amber-900 dark:text-amber-200 border border-amber-500/20">
            <Sparkles size={13} className="mt-0.5 shrink-0 text-amber-600 dark:text-amber-400" />
            <div>{shell.tip}</div>
          </div>
        )}
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* 🚀 系统调用总链路横幅 (Controlled Natural Language Pipeline) */}
      <div className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 via-sky-500/5 to-transparent p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Badge variant="pro" dot>Controlled Natural Language</Badge>
              <span className="text-xs font-mono text-fg-3">极简受控语言 · 槽位替换引擎</span>
            </div>
            <h1 className="mt-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              通用语言防身系统：8 大核心动词与 15% 安全壳
            </h1>
            <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-fg-2">
              剥离繁杂语法，用最少的心智负担完成 <strong>85%~90%</strong> 的工位与跨语言意图表达。
              全面采用 <strong>Phonics 美式自然拼读</strong> 与 <strong>日语罗马音</strong>，拒绝生僻音标！
            </p>
          </div>
        </div>

        {/* 三步总调用流水线 */}
        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-3.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-700 dark:text-amber-300">
              <Shield size={14} />
              <span>步骤 1: 礼貌起手（15% 安全壳）</span>
            </div>
            <p className="mt-1 text-xs text-fg-2 font-mono">
              Excuse me / すみません
            </p>
            <p className="mt-0.5 text-[11px] text-fg-3">打扰前先给缓冲，消除 90% 冒犯感</p>
          </div>

          <div className="rounded-xl border border-sky-500/30 bg-sky-500/10 p-3.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-sky-700 dark:text-sky-300">
              <Zap size={14} />
              <span>步骤 2: 意图驱动（85% 核心动词）</span>
            </div>
            <p className="mt-1 text-xs text-fg-2 font-mono">
              [8大动词万能公式] + [槽位插槽]
            </p>
            <p className="mt-0.5 text-[11px] text-fg-3">GET/HAVE/MAKE/TAKE 替换对象即脱口而出</p>
          </div>

          <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-3.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-rose-700 dark:text-rose-300">
              <HelpCircle size={14} />
              <span>步骤 3: 听力受阻（防御反击）</span>
            </div>
            <p className="mt-1 text-xs text-fg-2 font-mono">
              Could you speak slower / write it down?
            </p>
            <p className="mt-0.5 text-[11px] text-fg-3">强行将对方拉回极简频道，从容应对</p>
          </div>
        </div>
      </div>

      {/* 控制工具条：主选项卡 + 搜索 */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-border/60 pb-4">
        {/* Tab 切换 */}
        <div className="flex items-center gap-1.5 rounded-xl border border-border/80 bg-muted/40 p-1 text-xs">
          <button
            type="button"
            onClick={() => setActiveTab('verbs')}
            className={`flex items-center gap-1.5 rounded-lg px-4 py-2 font-semibold transition-all ${
              activeTab === 'verbs'
                ? 'bg-card text-foreground shadow-sm'
                : 'text-fg-3 hover:text-foreground'
            }`}
          >
            <Zap size={15} className="text-sky-500" />
            <span>85% 核心动词引擎 ({CNL_VERB_FORMULAS.length})</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('shell')}
            className={`flex items-center gap-1.5 rounded-lg px-4 py-2 font-semibold transition-all ${
              activeTab === 'shell'
                ? 'bg-card text-foreground shadow-sm'
                : 'text-fg-3 hover:text-foreground'
            }`}
          >
            <Shield size={15} className="text-amber-500" />
            <span>15% 外围安全壳 ({CNL_SHELL_ITEMS.length})</span>
          </button>
        </div>

        {/* 搜索框 */}
        <div className="relative max-w-sm flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-fg-3" />
          <Input
            type="text"
            placeholder="搜索槽位关键词、动词公式、意图（如 PR、500、roll back）..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 text-xs"
          />
        </div>
      </div>

      {/* 选项卡内容 1: 核心动词引擎 */}
      {activeTab === 'verbs' && (
        <div className="space-y-4">
          {/* 动词快速筛选胶囊 */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-medium text-fg-3 mr-1">动词引擎:</span>
            {['ALL', 'GET', 'HAVE', 'MAKE', 'TAKE', 'GO', 'COME', 'DO', 'PUT'].map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => setSelectedVerb(v)}
                className={`rounded-lg px-3 py-1 text-xs font-mono font-medium transition-all ${
                  selectedVerb === v
                    ? 'bg-primary text-primary-foreground font-bold shadow-sm'
                    : 'border border-border/80 bg-card text-fg-2 hover:bg-muted/80'
                }`}
              >
                {v}
              </button>
            ))}
          </div>

          {/* 动词卡片列表 */}
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {filteredVerbs.map(renderFormulaCard)}
          </div>
        </div>
      )}

      {/* 选项卡内容 2: 15% 外围安全壳 */}
      {activeTab === 'shell' && (
        <div className="space-y-4">
          {/* 安全壳分类筛选 */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-medium text-fg-3 mr-1">安全壳分类:</span>
            {[
              { id: 'ALL', label: '全部安全壳' },
              { id: 'sensory', label: '心理与感官 (主观表达)' },
              { id: 'polite', label: '社交礼貌缓冲 (消除冒犯)' },
              { id: 'defense', label: '听力防御反击 (控场降速)' },
            ].map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setShellCategory(cat.id)}
                className={`rounded-lg px-3 py-1 text-xs font-medium transition-all ${
                  shellCategory === cat.id
                    ? 'bg-primary text-primary-foreground font-bold shadow-sm'
                    : 'border border-border/80 bg-card text-fg-2 hover:bg-muted/80'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* 安全壳卡片列表 */}
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {filteredShell.map(renderShellCard)}
          </div>
        </div>
      )}
    </div>
  )
}
