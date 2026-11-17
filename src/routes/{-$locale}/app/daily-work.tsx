import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { getOptionalUser } from '@/features/auth/middleware'
import { AppShell } from '@/components/app/app-shell'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { AudioSpeaker } from '@/features/it-english/components/AudioSpeaker'
import { CopyButton } from '@/features/it-english/components/CopyButton'
import {
  STANDUP_EXAMPLES,
  WORK_SCENARIOS,
  TECH_BRIEFING_DATA,
  type StandupExample,
  type WorkScenario,
  type TechBriefingDimension,
} from '@/features/it-english/data/daily-work.data'
import {
  Users,
  GitPullRequest,
  AlertTriangle,
  MessageSquare,
  Presentation,
  Globe2,
  ChevronRight,
  Sparkles,
  CheckCircle2,
  FileSpreadsheet,
} from 'lucide-react'

export const Route = createFileRoute('/{-$locale}/app/daily-work')({
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
  component: DailyWorkPage,
})

function DailyWorkPage() {
  const { user } = Route.useLoaderData()
  const [activeTab, setActiveTab] = useState<'standup' | 'scenarios' | 'briefing'>('standup')

  // Standup Generator state
  const [selectedExample, setSelectedExample] = useState<StandupExample>(STANDUP_EXAMPLES[0])
  const [yesterdayInput, setYesterdayInput] = useState('finished the user profile API endpoint and wrote unit tests')
  const [todayInput, setTodayInput] = useState('integrating frontend forms and testing avatar upload edge cases')
  const [blockerInput, setBlockerInput] = useState('no blockers, but waiting for PR #128 review')

  const generatedStandup = `Morning everyone! Yesterday, I ${yesterdayInput}. Today, I'm focusing on ${todayInput}. Blocker-wise, ${blockerInput}. That's all from me!`

  // Scenarios state
  const [selectedScenario, setSelectedScenario] = useState<WorkScenario>(WORK_SCENARIOS[0])

  // Tech Briefing state
  const [briefingLang, setBriefingLang] = useState<'zh' | 'ja' | 'ko' | 'en'>('zh')
  const [selectedDimension, setSelectedDimension] = useState<TechBriefingDimension>(TECH_BRIEFING_DATA[0])

  return (
    <AppShell user={user} active="daily-work" crumb="日常沟通 (Daily Workplace)">
      <div className="mb-6 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="page-h">日常工作交流模拟器</h1>
            <Badge variant="pro" dot>现学现用</Badge>
          </div>
          <p className="mt-1 text-sm text-fg-2">
            解决工作中最频繁的场景：每日站会（Standup）、代码审查（PR Review）、线上排障与架构评审技术汇报。
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-1 rounded-xl border border-border bg-muted/40 p-1 text-xs">
          <button
            type="button"
            onClick={() => setActiveTab('standup')}
            className={`rounded-lg px-3 py-1.5 font-medium transition-all ${
              activeTab === 'standup' ? 'bg-card text-foreground shadow-sm' : 'text-fg-3 hover:text-foreground'
            }`}
          >
            每日站会发言器 (Standup)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('scenarios')}
            className={`rounded-lg px-3 py-1.5 font-medium transition-all ${
              activeTab === 'scenarios' ? 'bg-card text-foreground shadow-sm' : 'text-fg-3 hover:text-foreground'
            }`}
          >
            实战情景对答 (PR / 故障 / Slack)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('briefing')}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-medium transition-all ${
              activeTab === 'briefing'
                ? 'bg-card text-primary font-semibold shadow-sm ring-1 ring-primary/20'
                : 'text-fg-3 hover:text-foreground'
            }`}
          >
            <Presentation size={14} className="text-primary" />
            <span>架构评审与技术汇报 (Briefing)</span>
            <span className="rounded-full bg-primary/10 px-1.5 py-0.2 text-[10px] font-bold text-primary">
              中日韩英
            </span>
          </button>
        </div>
      </div>

      {activeTab === 'standup' && (
        <div className="grid gap-6 lg:grid-cols-12">
          {/* Preset templates */}
          <div className="space-y-3 lg:col-span-5">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-fg-3">常见站会角色范例</h2>
            {STANDUP_EXAMPLES.map((ex) => (
              <div
                key={ex.id}
                onClick={() => {
                  setSelectedExample(ex)
                  setYesterdayInput(ex.yesterdayEn)
                  setTodayInput(ex.todayEn)
                  setBlockerInput(ex.blockersEn)
                }}
                className={`cursor-pointer rounded-xl border p-4 transition-all ${
                  selectedExample.id === ex.id
                    ? 'border-primary bg-primary/5 ring-1 ring-primary'
                    : 'border-border bg-card hover:border-border-strong'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-foreground">{ex.roleZh}</span>
                  <Badge variant="free">{ex.role}</Badge>
                </div>
                <p className="mt-2 text-xs text-fg-3 line-clamp-2">{ex.fullSpokenEn}</p>
                <div className="mt-2 flex items-center justify-between border-t border-border/60 pt-2 text-[11px] text-primary">
                  <span>点击套用模板 ➔</span>
                  <AudioSpeaker text={ex.fullSpokenEn} size={12} />
                </div>
              </div>
            ))}

            <div className="rounded-xl border border-border bg-muted/20 p-4 text-xs text-fg-3">
              <span className="font-semibold text-foreground">💡 站会发言黄金三原则：</span>
              <ul className="mt-1.5 list-inside list-disc space-y-1">
                <li><strong className="text-fg-2">Yesterday</strong>: 过去式，用 wrapped up / finished；</li>
                <li><strong className="text-fg-2">Today</strong>: 进行时，用 focusing on / diving into；</li>
                <li><strong className="text-fg-2">Blockers</strong>: 卡点，有就直说 I'm blocked by...，没有就说 No blockers on my end。</li>
              </ul>
            </div>
          </div>

          {/* Standup Generator */}
          <div className="space-y-4 lg:col-span-7">
            <Card className="p-5">
              <div className="mb-4 flex items-center justify-between border-b border-border pb-3">
                <div className="flex items-center gap-2">
                  <Users size={18} className="text-primary" />
                  <h2 className="text-sm font-semibold text-foreground">输入今日工作，一键生成地道发言</h2>
                </div>
              </div>

              <div className="space-y-3.5 text-xs">
                <div>
                  <label className="mb-1 block font-medium text-blue-600 dark:text-blue-400">
                    1. 昨天做了什么 (Yesterday)
                  </label>
                  <textarea
                    rows={2}
                    value={yesterdayInput}
                    onChange={(e) => setYesterdayInput(e.target.value)}
                    className="w-full rounded-md border border-border bg-background px-3 py-2 text-xs"
                    placeholder="e.g. fixed ticket JIRA-102 and deployed to staging"
                  />
                </div>

                <div>
                  <label className="mb-1 block font-medium text-amber-600 dark:text-amber-400">
                    2. 今天计划做什么 (Today)
                  </label>
                  <textarea
                    rows={2}
                    value={todayInput}
                    onChange={(e) => setTodayInput(e.target.value)}
                    className="w-full rounded-md border border-border bg-background px-3 py-2 text-xs"
                    placeholder="e.g. benchmarking the query latency and writing API docs"
                  />
                </div>

                <div>
                  <label className="mb-1 block font-medium text-rose-600 dark:text-rose-400">
                    3. 有无卡点/需要谁协助 (Blockers / Impediments)
                  </label>
                  <textarea
                    rows={2}
                    value={blockerInput}
                    onChange={(e) => setBlockerInput(e.target.value)}
                    className="w-full rounded-md border border-border bg-background px-3 py-2 text-xs"
                    placeholder="e.g. no blockers, but need a quick sign-off from Sarah"
                  />
                </div>
              </div>

              <div className="mt-5 border-t border-border pt-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-primary">生成可直接在站会上念的口语稿：</span>
                  <div className="flex items-center gap-2">
                    <AudioSpeaker text={generatedStandup} label="发音试听" size={14} />
                    <CopyButton text={generatedStandup} label="复制口语稿" size={14} />
                  </div>
                </div>

                <div className="mt-2.5 rounded-xl border border-primary/20 bg-primary/5 p-4 text-[14px] leading-relaxed text-foreground">
                  {generatedStandup}
                </div>
              </div>
            </Card>
          </div>
        </div>
      )}

      {activeTab === 'scenarios' && (
        <div className="grid gap-6 lg:grid-cols-12">
          {/* Scenario selector */}
          <div className="space-y-3 lg:col-span-4">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-fg-3">选择工作情景</h2>
            {WORK_SCENARIOS.map((sc) => (
              <div
                key={sc.id}
                onClick={() => setSelectedScenario(sc)}
                className={`cursor-pointer rounded-xl border p-4 transition-all ${
                  selectedScenario.id === sc.id
                    ? 'border-primary bg-primary/5 ring-1 ring-primary'
                    : 'border-border bg-card hover:border-border-strong'
                }`}
              >
                <div className="flex items-center gap-2">
                  {sc.category === 'pr-review' && <GitPullRequest size={16} className="text-purple-500" />}
                  {sc.category === 'incident' && <AlertTriangle size={16} className="text-rose-500" />}
                  {sc.category === 'slack-chat' && <MessageSquare size={16} className="text-blue-500" />}
                  <h3 className="text-sm font-semibold text-foreground">{sc.titleZh}</h3>
                </div>
                <p className="mt-1 text-xs text-fg-3">{sc.title}</p>
                <p className="mt-2 line-clamp-2 text-xs text-fg-2">{sc.descriptionZh}</p>
              </div>
            ))}
          </div>

          {/* Scenario Dialogue */}
          <div className="space-y-4 lg:col-span-8">
            <Card className="p-5">
              <div className="border-b border-border pb-3">
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-semibold text-foreground">{selectedScenario.titleZh}</h2>
                  <Badge variant="free">{selectedScenario.category}</Badge>
                </div>
                <p className="mt-1 text-xs text-fg-3">{selectedScenario.descriptionZh}</p>
              </div>

              {/* Dialogue stream */}
              <div className="mt-5 space-y-4">
                {selectedScenario.dialogue.map((item, idx) => (
                  <div key={idx} className="rounded-xl border border-border/70 bg-card p-4 transition-colors hover:border-border-strong">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-primary">
                        {item.speaker} <span className="text-fg-3 font-normal">({item.speakerRole})</span>
                      </span>
                      <AudioSpeaker text={item.textEn} size={13} />
                    </div>
                    <p className="mt-2 text-sm font-medium text-foreground">{item.textEn}</p>
                    <p className="mt-1 text-xs text-fg-3">{item.textZh}</p>
                    {item.tipZh && (
                      <div className="mt-2 rounded bg-muted/50 px-2.5 py-1 text-[11px] text-fg-2">
                        💡 <span className="font-medium text-foreground">职场规范：</span>{item.tipZh}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Key Expressions Table */}
              <div className="mt-6 border-t border-border pt-4">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-fg-3">本场景可直接套用的金句</h3>
                <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
                  {selectedScenario.keyExpressions.map((exp, eIdx) => (
                    <div key={eIdx} className="rounded-lg border border-border p-3 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-primary">{exp.en}</span>
                        <div className="flex items-center gap-1">
                          <AudioSpeaker text={exp.en} size={12} />
                          <CopyButton text={exp.en} size={12} />
                        </div>
                      </div>
                      <p className="mt-1 font-medium text-foreground">{exp.zh}</p>
                      <p className="mt-1 text-[11px] text-fg-3">{exp.usageNote}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </div>
      )}

      {activeTab === 'briefing' && (
        <div className="space-y-6">
          {/* Top Banner with Language Selector */}
          <div className="relative overflow-hidden rounded-2xl border border-border/80 bg-gradient-to-br from-card via-card/90 to-primary/5 p-5 sm:p-6 shadow-sm">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <Badge variant="pro" className="font-mono text-xs">
                    ARCHITECTURE REVIEW · 架构评审与汇报
                  </Badge>
                  <span className="text-xs text-fg-3">
                    Box × Snowflake 原生打通（Openflow 管道 vs ENA 原生 API 出网）
                  </span>
                </div>
                <h2 className="mt-1.5 text-lg sm:text-xl font-bold tracking-tight text-foreground">
                  高情商技术汇报与方案选型决策罗盘
                </h2>
                <p className="mt-1 max-w-3xl text-xs sm:text-sm text-fg-2">
                  面向技术领导、企业架构师（EA）、CISO 与合规审计官的 5 个核心维度汇报策略。内置中、日、韩、英四语对照，支持发音朗读与一键复制讲稿。
                </p>
              </div>

              {/* Language Switcher Buttons */}
              <div className="flex items-center gap-1.5 rounded-xl border border-border/80 bg-card p-1.5 shadow-sm shrink-0">
                <Globe2 size={15} className="ml-1 text-primary shrink-0" />
                <span className="text-xs font-medium text-fg-3 mr-1">语言 / Language:</span>
                {(
                  [
                    { code: 'zh', label: '中文' },
                    { code: 'ja', label: '日本語' },
                    { code: 'ko', label: '한국어' },
                    { code: 'en', label: 'English' },
                  ] as const
                ).map((langItem) => (
                  <button
                    key={langItem.code}
                    type="button"
                    onClick={() => setBriefingLang(langItem.code)}
                    className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition-all ${
                      briefingLang === langItem.code
                        ? 'bg-primary text-primary-foreground shadow-sm'
                        : 'text-fg-3 hover:text-foreground hover:bg-muted/60'
                    }`}
                  >
                    {langItem.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main 2-column layout */}
          <div className="grid gap-6 lg:grid-cols-12">
            {/* Left Column: 5 Dimension Cards */}
            <div className="space-y-3 lg:col-span-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-fg-3">
                  汇报核心 5 大维度
                </h3>
                <span className="text-[11px] text-fg-3">点击切换查看</span>
              </div>

              {TECH_BRIEFING_DATA.map((dim) => {
                const isSelected = selectedDimension.id === dim.id
                const dimBadge =
                  briefingLang === 'ja'
                    ? dim.badgeJa
                    : briefingLang === 'ko'
                    ? dim.badgeKo
                    : briefingLang === 'en'
                    ? dim.badgeEn
                    : dim.badgeZh
                const dimTitle =
                  briefingLang === 'ja'
                    ? dim.titleJa
                    : briefingLang === 'ko'
                    ? dim.titleKo
                    : briefingLang === 'en'
                    ? dim.titleEn
                    : dim.titleZh
                const dimAudience =
                  briefingLang === 'ja'
                    ? dim.targetAudienceJa
                    : briefingLang === 'ko'
                    ? dim.targetAudienceKo
                    : briefingLang === 'en'
                    ? dim.targetAudienceEn
                    : dim.targetAudienceZh

                return (
                  <div
                    key={dim.id}
                    onClick={() => setSelectedDimension(dim)}
                    className={`cursor-pointer rounded-xl border p-4 transition-all ${
                      isSelected
                        ? 'border-primary bg-primary/5 ring-1 ring-primary shadow-sm'
                        : 'border-border bg-card hover:border-border-strong hover:bg-card/80'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-[11px] font-bold text-primary">
                          {dim.dimensionNumber}
                        </span>
                        <Badge variant={isSelected ? 'pro' : 'free'} className="text-[10px]">
                          {dimBadge}
                        </Badge>
                      </div>
                      <ChevronRight
                        size={14}
                        className={`transition-transform ${isSelected ? 'text-primary translate-x-0.5' : 'text-fg-3'}`}
                      />
                    </div>

                    <h4 className="mt-2 text-xs sm:text-sm font-semibold text-foreground line-clamp-2">
                      {dimTitle}
                    </h4>

                    <div className="mt-2 flex items-center gap-1.5 text-[11px] text-fg-3">
                      <span className="font-medium text-fg-2">🎯 对标对象:</span>
                      <span className="line-clamp-1">{dimAudience}</span>
                    </div>
                  </div>
                )
              })}

              {/* Presentation Strategy Card */}
              <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 text-xs space-y-2">
                <div className="flex items-center gap-1.5 font-semibold text-primary">
                  <Sparkles size={14} />
                  <span>汇报实战时间掌控攻略</span>
                </div>
                <div className="text-fg-2 space-y-1.5 text-[11px]">
                  <p>
                    ⚡ <strong>2 分钟电梯演说</strong>：主打 <strong>维度一（解决业务痛点）</strong> + <strong>维度五（真机已跑通证据）</strong>。
                  </p>
                  <p>
                    🏛️ <strong>10~15 分钟架构评审</strong>：按 <strong>维度一 ➔ 维度二（选型表） ➔ 维度三（零信任安全） ➔ 维度五（成果）</strong> 顺序展开，安全合规重点攻坚。
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Active Dimension Speech & Technical Deep-Dive */}
            <div className="space-y-4 lg:col-span-8">
              {(() => {
                const currentBadge =
                  briefingLang === 'ja'
                    ? selectedDimension.badgeJa
                    : briefingLang === 'ko'
                    ? selectedDimension.badgeKo
                    : briefingLang === 'en'
                    ? selectedDimension.badgeEn
                    : selectedDimension.badgeZh
                const currentTitle =
                  briefingLang === 'ja'
                    ? selectedDimension.titleJa
                    : briefingLang === 'ko'
                    ? selectedDimension.titleKo
                    : briefingLang === 'en'
                    ? selectedDimension.titleEn
                    : selectedDimension.titleZh
                const currentAudience =
                  briefingLang === 'ja'
                    ? selectedDimension.targetAudienceJa
                    : briefingLang === 'ko'
                    ? selectedDimension.targetAudienceKo
                    : briefingLang === 'en'
                    ? selectedDimension.targetAudienceEn
                    : selectedDimension.targetAudienceZh
                const currentTakeaway =
                  briefingLang === 'ja'
                    ? selectedDimension.coreTakeawayJa
                    : briefingLang === 'ko'
                    ? selectedDimension.coreTakeawayKo
                    : briefingLang === 'en'
                    ? selectedDimension.coreTakeawayEn
                    : selectedDimension.coreTakeawayZh
                const currentSpeech =
                  briefingLang === 'ja'
                    ? selectedDimension.speechJa
                    : briefingLang === 'ko'
                    ? selectedDimension.speechKo
                    : briefingLang === 'en'
                    ? selectedDimension.speechEn
                    : selectedDimension.speechZh

                return (
                  <Card className="p-5 sm:p-6 space-y-6">
                    {/* Header */}
                    <div className="border-b border-border pb-4">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-primary text-xs font-bold text-primary-foreground shadow-sm">
                            {selectedDimension.dimensionNumber}
                          </span>
                          <Badge variant="pro">{currentBadge}</Badge>
                        </div>
                        <div className="rounded-lg border border-border bg-muted/50 px-2.5 py-1 text-xs text-fg-2">
                          🎯 <strong>汇报适用对象：</strong> {currentAudience}
                        </div>
                      </div>
                      <h3 className="mt-3 text-base sm:text-lg font-bold text-foreground">
                        {currentTitle}
                      </h3>
                    </div>

                    {/* Core Takeaway Callout */}
                    <div className="rounded-xl border border-blue-500/20 bg-blue-500/10 p-3.5 text-xs text-blue-900 dark:text-blue-200">
                      <div className="flex items-center gap-1.5 font-bold mb-1">
                        <CheckCircle2 size={14} className="text-blue-600 dark:text-blue-400" />
                        <span>核心说服力要点 (Core Convincing Hook)</span>
                      </div>
                      <p className="leading-relaxed pl-5 font-medium">{currentTakeaway}</p>
                    </div>

                    {/* Presentation Speech */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold text-foreground uppercase tracking-wider">
                          🎙️ 实战现场汇报讲稿（即刻演练）
                        </span>
                        <div className="flex items-center gap-2">
                          <AudioSpeaker
                            text={currentSpeech}
                            lang={briefingLang}
                            label={`朗读 (${briefingLang.toUpperCase()})`}
                            size={14}
                          />
                          <CopyButton text={currentSpeech} label="复制讲稿" size={14} />
                        </div>
                      </div>

                      <div className="rounded-xl border border-border bg-muted/30 p-4 sm:p-5 text-sm leading-relaxed text-foreground whitespace-pre-line font-normal shadow-inner">
                        {currentSpeech}
                      </div>
                    </div>

                    {/* If Dimension 2: Render Comparison Table */}
                    {selectedDimension.comparisonRows && (
                      <div className="border-t border-border pt-5">
                        <div className="flex items-center gap-2 mb-3">
                          <FileSpreadsheet size={16} className="text-primary" />
                          <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
                            双方案核心对比选型矩阵 (Openflow vs ENA)
                          </h4>
                        </div>
                        <div className="overflow-x-auto rounded-xl border border-border shadow-sm">
                          <table className="w-full text-left text-xs border-collapse">
                            <thead>
                              <tr className="border-b border-border bg-muted/60 text-fg-2">
                                <th className="p-3 font-semibold min-w-[120px]">评估维度</th>
                                <th className="p-3 font-semibold min-w-[200px] text-blue-700 dark:text-blue-300">
                                  模式 A：Openflow 管道集成 (入仓)
                                </th>
                                <th className="p-3 font-semibold min-w-[200px] text-emerald-700 dark:text-emerald-300">
                                  模式 B：ENA 原生 API 直连 (出网)
                                </th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-border/60">
                              {selectedDimension.comparisonRows.map((row, rIdx) => {
                                const dimLabel =
                                  briefingLang === 'ja'
                                    ? row.dimensionJa
                                    : briefingLang === 'ko'
                                    ? row.dimensionKo
                                    : briefingLang === 'en'
                                    ? row.dimensionEn
                                    : row.dimensionZh
                                const openflowLabel =
                                  briefingLang === 'ja'
                                    ? row.openflowJa
                                    : briefingLang === 'ko'
                                    ? row.openflowKo
                                    : briefingLang === 'en'
                                    ? row.openflowEn
                                    : row.openflowZh
                                const enaLabel =
                                  briefingLang === 'ja'
                                    ? row.enaJa
                                    : briefingLang === 'ko'
                                    ? row.enaKo
                                    : briefingLang === 'en'
                                    ? row.enaEn
                                    : row.enaZh

                                return (
                                  <tr key={rIdx} className="hover:bg-muted/30 transition-colors">
                                    <td className="p-3 font-medium text-foreground bg-muted/10">
                                      {dimLabel}
                                    </td>
                                    <td className="p-3 text-fg-2 leading-relaxed">
                                      {openflowLabel}
                                    </td>
                                    <td className="p-3 text-fg-2 leading-relaxed">
                                      {enaLabel}
                                    </td>
                                  </tr>
                                )
                              })}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}

                    {/* Key Terminology Cross-Lingual Grid */}
                    <div className="border-t border-border pt-5">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-fg-3 mb-3">
                        🌐 核心技术与业务词汇（中日韩英全景对照）
                      </h4>
                      <div className="grid gap-3 sm:grid-cols-2">
                        {selectedDimension.keyTerms.map((term, tIdx) => (
                          <div
                            key={tIdx}
                            className="rounded-xl border border-border bg-card p-3.5 text-xs shadow-sm space-y-1.5"
                          >
                            <div className="flex items-center justify-between border-b border-border/60 pb-1.5">
                              <span className="font-bold text-primary">{term.term}</span>
                              <div className="flex items-center gap-1">
                                <AudioSpeaker text={term.term} lang="en" size={11} />
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-1.5 text-[11px] text-fg-2 pt-1">
                              <div>🇨🇳 <strong>中文:</strong> {term.zh}</div>
                              <div>🇯🇵 <strong>日文:</strong> {term.ja}</div>
                              <div>🇰🇷 <strong>韩文:</strong> {term.ko}</div>
                              <div>🇺🇸 <strong>英文:</strong> {term.en}</div>
                            </div>
                            <p className="text-[11px] text-fg-3 pt-1 border-t border-border/40">
                              💡 {term.contextNoteZh}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Card>
                )
              })()}
            </div>
          </div>
        </div>
      )}
    </AppShell>
  )
}
