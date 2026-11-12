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
  BookmarkCheck,
} from 'lucide-react'

/**
 * 辅助渲染函数：将句式模板分解，固定动词/句式骨架加上高亮背景，槽位替换部分加上鲜明下划线
 */
function renderStyledTemplate({
  template,
  slotX,
  slotY,
  theme = 'sky',
  isMono = false,
}: {
  template: string
  slotX?: string
  slotY?: string
  theme: 'emerald' | 'sky' | 'rose'
  isMono?: boolean
}) {
  if (!template) return null

  const themeClasses = {
    emerald: {
      frame: 'rounded bg-emerald-500/15 text-emerald-950 dark:text-emerald-100 dark:bg-emerald-500/25 px-1.5 py-0.5 font-bold mx-0.5',
      slot: 'font-bold text-foreground underline underline-offset-4 decoration-2 decoration-emerald-500 px-1',
    },
    sky: {
      frame: isMono
        ? 'rounded bg-sky-500/15 text-sky-900 dark:text-sky-200 px-1.5 py-0.5 font-mono font-medium mx-0.5'
        : 'rounded bg-sky-500/15 text-sky-950 dark:text-sky-100 dark:bg-sky-500/25 px-1.5 py-0.5 font-bold mx-0.5',
      slot: isMono
        ? 'font-mono font-bold text-sky-950 dark:text-sky-100 underline underline-offset-4 decoration-2 decoration-sky-500 px-1'
        : 'font-bold text-foreground underline underline-offset-4 decoration-2 decoration-sky-500 px-1',
    },
    rose: {
      frame: isMono
        ? 'rounded bg-rose-500/15 text-rose-900 dark:text-rose-200 px-1.5 py-0.5 font-mono font-medium mx-0.5'
        : 'rounded bg-rose-500/15 text-rose-950 dark:text-rose-100 dark:bg-rose-500/25 px-1.5 py-0.5 font-bold mx-0.5',
      slot: isMono
        ? 'font-mono font-bold text-rose-950 dark:text-rose-100 underline underline-offset-4 decoration-2 decoration-rose-500 px-1'
        : 'font-bold text-foreground underline underline-offset-4 decoration-2 decoration-rose-500 px-1',
    },
  }[theme]

  const parts = template.split(/(\{X\}|\{Y\})/g)

  // 如果没有槽位，整个句子作为固定表达高亮
  if (parts.length === 1) {
    return <span className={themeClasses.frame}>{template}</span>
  }

  return (
    <span className="leading-relaxed inline-block">
      {parts.map((part, index) => {
        if (part === '{X}') {
          return (
            <span key={index} className={themeClasses.slot}>
              {slotX || '{槽位}'}
            </span>
          )
        }
        if (part === '{Y}') {
          return (
            <span key={index} className={themeClasses.slot}>
              {slotY || '{时间/条件}'}
            </span>
          )
        }
        if (!part) return null
        return (
          <span key={index} className={themeClasses.frame}>
            {part}
          </span>
        )
      })}
    </span>
  )
}

export function CnlSlotWorkbench() {
  const [activeTab, setActiveTab] = useState<'verbs' | 'shell'>('verbs')
  const [selectedVerb, setSelectedVerb] = useState<string>('ALL')
  const [shellCategory, setShellCategory] = useState<string>('ALL')
  const [search, setSearch] = useState<string>('')

  // 记录每个动词公式当前选中的槽位 index
  const [selectedSlots, setSelectedSlots] = useState<Record<string, number>>({})

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
        formula.templateZh.toLowerCase().includes(q) ||
        formula.mentalModel.toLowerCase().includes(q) ||
        formula.templateJa.toLowerCase().includes(q) ||
        formula.slots.some(
          (s) =>
            s.en.toLowerCase().includes(q) ||
            s.label.includes(q) ||
            (s.zh && s.zh.includes(q))
        )
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
        item.templateZh.toLowerCase().includes(q) ||
        item.templateJa.toLowerCase().includes(q) ||
        (item.slots &&
          item.slots.some(
            (s) =>
              s.en.toLowerCase().includes(q) ||
              s.label.includes(q) ||
              (s.zh && s.zh.includes(q))
          ))
      return matchCat && matchSearch
    })
  }, [shellCategory, search])

  // 渲染单个动词公式卡片
  const renderFormulaCard = (formula: CnlFormula) => {
    const activeIndex = selectedSlots[formula.id] ?? formula.defaultSlotIndex
    const currentSlot: CnlSlotOption = formula.slots[activeIndex] || formula.slots[0]

    // 纯文本版（供朗读播放与复制使用）
    const plainEn = formula.templateEn.replace('{X}', currentSlot.en).replace('{Y}', 'tomorrow')
    const plainJa = formula.templateJa.replace('{X}', currentSlot.ja).replace('{Y}', '明日')
    const plainZh = formula.templateZh.replace('{X}', currentSlot.zh || currentSlot.label).replace('{Y}', '明天')

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

        {/* 交互式槽位选择器与替换辅导 */}
        <div className="mb-4 rounded-xl border border-border/60 bg-muted/30 p-3">
          <div className="mb-2 flex items-center justify-between text-xs">
            <span className="font-medium text-fg-2 flex items-center gap-1">
              🧩 <strong>选择填入槽位 [{formula.slotName}]：</strong>
            </span>
            <span className="text-[11px] text-fg-3">点击即时拼装生成</span>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {formula.slots.map((slot, idx) => {
              const isSelected = activeIndex === idx
              return (
                <button
                  key={slot.en}
                  type="button"
                  onClick={() => {
                    setSelectedSlots((prev) => ({ ...prev, [formula.id]: idx }))
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

          {/* 💡 槽位替换规律与使用辅导 */}
          <div className="mt-3 rounded-lg border border-border/70 bg-card/75 p-3 text-xs text-muted-foreground space-y-1.5">
            <div className="flex items-center gap-1.5 font-semibold text-foreground">
              <span className="text-primary font-bold">💡 槽位替换规律与使用说明：</span>
            </div>
            <p className="leading-relaxed">
              <strong>• 怎么换：</strong>点击上方任意芯片，即可直接将该具体场景（中 / 英 / 自然拼读 / 日语 / 罗马音）即时换入句中。
            </p>
            <p className="leading-relaxed">
              <strong>• 为什么可以随便换：</strong>高亮底色的<strong>固定骨架</strong>已锁死全部时态、语调和语法结构，带下划线的<strong>槽位 [{formula.slotName}]</strong> 仅用于承载具体的业务名词。无论换成什么具体对象，整句话的语法和语调永远 100% 成立。
            </p>
            <p className="leading-relaxed">
              <strong>• 对应规律：</strong>英文字符串在固定动词/介词后接入对象，日文在助词前对应填入，两端意思精准对称。工位实战中，您只需将下划线部分直接替换为您手头的实际任务、系统模块或问题即可。
            </p>
          </div>
        </div>

        {/* 动态拼装结果展示 */}
        <div className="space-y-3">
          {/* 🇨🇳 中文含义（带底色与下划线对应） */}
          <div className="rounded-xl border border-emerald-500/20 bg-gradient-to-r from-emerald-500/5 via-transparent to-transparent p-3.5">
            <div className="mb-1.5 flex items-center justify-between">
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                🇨🇳 中文含义（意图表达）
              </span>
              <CopyButton text={plainZh} label="复制中文" />
            </div>

            <div className="text-sm sm:text-base font-medium text-foreground">
              {renderStyledTemplate({
                template: formula.templateZh,
                slotX: currentSlot.zh || currentSlot.label,
                slotY: '明天',
                theme: 'emerald',
              })}
            </div>
          </div>

          {/* 🇬🇧 英语拼装 + Phonics（核心动词底色 + 槽位下划线） */}
          <div className="rounded-xl border border-sky-500/20 bg-gradient-to-r from-sky-500/5 via-transparent to-transparent p-3.5">
            <div className="mb-1.5 flex items-center justify-between">
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-sky-600 dark:text-sky-400">
                🇬🇧 English（核心动词加底色 · 槽位加下划线）
              </span>
              <div className="flex items-center gap-1.5">
                <AudioSpeaker text={plainEn} lang="en" label="美音" />
                <CopyButton text={plainEn} label="复制英文" />
              </div>
            </div>

            <div className="text-sm sm:text-base tracking-tight">
              {renderStyledTemplate({
                template: formula.templateEn,
                slotX: currentSlot.en,
                slotY: 'tomorrow',
                theme: 'sky',
              })}
            </div>

            {/* Phonics 自然拼读注音 */}
            <div className="mt-2.5 flex flex-wrap items-center gap-1.5 text-xs">
              <span className="rounded bg-sky-500/15 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400 border border-sky-500/20">
                Phonics 拼读
              </span>
              <div className="font-mono text-xs">
                {renderStyledTemplate({
                  template: formula.phonicsTemplate,
                  slotX: currentSlot.phonics,
                  slotY: 'tuh-MAH-roh',
                  theme: 'sky',
                  isMono: true,
                })}
              </div>
            </div>
          </div>

          {/* 🇯🇵 日语对账 + 罗马音（固定敬语底色 + 槽位下划线） */}
          <div className="rounded-xl border border-rose-500/20 bg-gradient-to-r from-rose-500/5 via-transparent to-transparent p-3.5">
            <div className="mb-1.5 flex items-center justify-between">
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-rose-600 dark:text-rose-400">
                🇯🇵 日本語（现场敬语对应）
              </span>
              <div className="flex items-center gap-1.5">
                <AudioSpeaker text={plainJa} lang="ja" label="日音" />
                <CopyButton text={plainJa} label="复制日文" />
              </div>
            </div>

            <div className="text-sm sm:text-base tracking-tight">
              {renderStyledTemplate({
                template: formula.templateJa,
                slotX: currentSlot.ja,
                slotY: '明日',
                theme: 'rose',
              })}
            </div>

            <div className="mt-1.5 flex flex-wrap items-center gap-1 text-xs font-mono">
              <span className="text-[10px] uppercase tracking-wider text-fg-3 font-sans">罗马音:</span>
              <div>
                {renderStyledTemplate({
                  template: formula.romajiTemplate,
                  slotX: currentSlot.romaji,
                  slotY: 'ashita',
                  theme: 'rose',
                  isMono: true,
                })}
              </div>
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

    // 纯文本生成（用于朗读与复制）
    const plainEn = currentSlot && shell.slotPlaceholder
      ? shell.templateEn.replace(shell.slotPlaceholder, currentSlot.en)
      : shell.templateEn

    const plainJa = currentSlot && shell.slotPlaceholder
      ? shell.templateJa.replace(shell.slotPlaceholder, currentSlot.ja)
      : shell.templateJa

    const plainZh = currentSlot && shell.slotPlaceholder
      ? shell.templateZh.replace(shell.slotPlaceholder, currentSlot.zh || currentSlot.label)
      : shell.templateZh

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
            <div className="mb-1.5 flex items-center justify-between text-xs">
              <span className="font-medium text-fg-2">
                🧩 <strong>场景预设槽位 [{shell.slotName || '对象'}]：</strong>
              </span>
              <span className="text-[11px] text-fg-3">点击即时置换</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {shell.slots.map((slot, idx) => (
                <button
                  key={slot.en}
                  type="button"
                  onClick={() => setSelectedShellSlots((prev) => ({ ...prev, [shell.id]: idx }))}
                  className={`rounded-lg px-2.5 py-1 text-xs transition-all ${
                    activeIndex === idx
                      ? 'bg-primary text-primary-foreground font-semibold shadow-sm'
                      : 'border border-border/80 bg-card text-fg-2 hover:bg-muted/80'
                  }`}
                >
                  {slot.label}
                </button>
              ))}
            </div>

            {/* 💡 槽位替换说明 */}
            <div className="mt-2.5 rounded-lg border border-border/70 bg-card/75 p-2 text-xs text-muted-foreground">
              <p className="leading-relaxed">
                <strong className="text-foreground">• 替换规律：</strong>高亮底色部分为固定安全壳表达，只需将带下划线的 <strong>[{shell.slotName || '对象'}]</strong> 替换为您想沟通的实际事项，两端语法均直接闭环成立。
              </p>
            </div>
          </div>
        )}

        <div className="space-y-3">
          {/* 🇨🇳 中文含义 */}
          <div className="rounded-xl border border-emerald-500/20 bg-gradient-to-r from-emerald-500/5 via-transparent to-transparent p-3">
            <div className="mb-1 flex items-center justify-between">
              <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                🇨🇳 中文含义
              </span>
              <CopyButton text={plainZh} label="复制中文" />
            </div>
            <div className="text-sm font-medium text-foreground">
              {renderStyledTemplate({
                template: shell.templateZh,
                slotX: currentSlot?.zh || currentSlot?.label,
                theme: 'emerald',
              })}
            </div>
          </div>

          {/* 🇬🇧 英文 + Phonics（固定表达加底色 + 槽位加下划线） */}
          <div className="rounded-xl border border-sky-500/20 bg-gradient-to-r from-sky-500/5 via-transparent to-transparent p-3">
            <div className="mb-1 flex items-center justify-between">
              <span className="text-xs font-semibold text-sky-600 dark:text-sky-400">
                🇬🇧 English（固定句式加底色 · 槽位加下划线）
              </span>
              <div className="flex items-center gap-1.5">
                <AudioSpeaker text={plainEn} lang="en" label="美音" />
                <CopyButton text={plainEn} label="复制英文" />
              </div>
            </div>
            <div className="text-sm font-medium text-foreground">
              {renderStyledTemplate({
                template: shell.templateEn,
                slotX: currentSlot?.en,
                theme: 'sky',
              })}
            </div>
            <div className="mt-1.5 flex flex-wrap items-center gap-1.5 text-xs">
              <span className="rounded bg-sky-500/15 px-1 py-0.2 text-[10px] font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
                Phonics
              </span>
              <div className="font-mono text-xs">
                {renderStyledTemplate({
                  template: shell.phonics,
                  slotX: currentSlot?.phonics,
                  theme: 'sky',
                  isMono: true,
                })}
              </div>
            </div>
          </div>

          {/* 🇯🇵 日文 + 罗马音 */}
          <div className="rounded-xl border border-rose-500/20 bg-gradient-to-r from-rose-500/5 via-transparent to-transparent p-3">
            <div className="mb-1 flex items-center justify-between">
              <span className="text-xs font-semibold text-rose-600 dark:text-rose-400">
                🇯🇵 日本語
              </span>
              <div className="flex items-center gap-1.5">
                <AudioSpeaker text={plainJa} lang="ja" label="日音" />
                <CopyButton text={plainJa} label="复制日文" />
              </div>
            </div>
            <div className="text-sm font-medium text-foreground">
              {renderStyledTemplate({
                template: shell.templateJa,
                slotX: currentSlot?.ja,
                theme: 'rose',
              })}
            </div>
            <div className="mt-1 flex flex-wrap items-center gap-1 text-xs font-mono">
              <span className="text-[10px] text-fg-3 font-sans">罗马音:</span>
              <div>
                {renderStyledTemplate({
                  template: shell.romaji,
                  slotX: currentSlot?.romaji,
                  theme: 'rose',
                  isMono: true,
                })}
              </div>
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

      {/* 视觉图例说明 (Visual Legend) */}
      <div className="flex flex-wrap items-center gap-4 rounded-xl border border-border/80 bg-muted/40 px-4 py-2.5 text-xs">
        <div className="flex items-center gap-1.5 font-medium text-foreground">
          <BookmarkCheck size={15} className="text-primary" />
          <span>视觉图例指南：</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="rounded bg-sky-500/20 px-2 py-0.5 font-bold text-sky-900 dark:text-sky-200">
            核心固定动词 / 句式骨架
          </span>
          <span className="text-fg-3">= 肌肉记忆，不可替换，直接脱口而出</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="font-bold underline underline-offset-4 decoration-2 decoration-primary px-1 text-foreground">
            槽位替换参数
          </span>
          <span className="text-fg-3">= 灵活插槽，点击即时替换业务词汇</span>
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
