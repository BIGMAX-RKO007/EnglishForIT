import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { getOptionalUser } from '@/features/auth/middleware'
import { AppShell } from '@/components/app/app-shell'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { AudioSpeaker } from '@/features/it-english/components/AudioSpeaker'
import { CopyButton } from '@/features/it-english/components/CopyButton'
import { STANDUP_EXAMPLES, WORK_SCENARIOS, type StandupExample, type WorkScenario } from '@/features/it-english/data/daily-work.data'
import { Users, GitPullRequest, AlertTriangle, MessageSquare } from 'lucide-react'

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
  const [activeTab, setActiveTab] = useState<'standup' | 'scenarios'>('standup')

  // Standup Generator state
  const [selectedExample, setSelectedExample] = useState<StandupExample>(STANDUP_EXAMPLES[0])
  const [yesterdayInput, setYesterdayInput] = useState('finished the user profile API endpoint and wrote unit tests')
  const [todayInput, setTodayInput] = useState('integrating frontend forms and testing avatar upload edge cases')
  const [blockerInput, setBlockerInput] = useState('no blockers, but waiting for PR #128 review')

  const generatedStandup = `Morning everyone! Yesterday, I ${yesterdayInput}. Today, I'm focusing on ${todayInput}. Blocker-wise, ${blockerInput}. That's all from me!`

  // Scenarios state
  const [selectedScenario, setSelectedScenario] = useState<WorkScenario>(WORK_SCENARIOS[0])

  return (
    <AppShell user={user} active="daily-work" crumb="日常沟通 (Daily Workplace)">
      <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="page-h">日常工作交流模拟器</h1>
            <Badge variant="pro" dot>现学现用</Badge>
          </div>
          <p className="mt-1 text-sm text-fg-2">
            解决工作中最频繁的场景：每日站会（Standup）、代码审查（PR Review）、线上排障与 Slack 异步对齐。
          </p>
        </div>

        <div className="flex items-center rounded-lg border border-border bg-muted/40 p-1 text-xs">
          <button
            type="button"
            onClick={() => setActiveTab('standup')}
            className={`rounded-md px-3 py-1.5 font-medium transition-all ${
              activeTab === 'standup' ? 'bg-card text-foreground shadow-sm' : 'text-fg-3 hover:text-foreground'
            }`}
          >
            每日站会发言器 (Standup)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('scenarios')}
            className={`rounded-md px-3 py-1.5 font-medium transition-all ${
              activeTab === 'scenarios' ? 'bg-card text-foreground shadow-sm' : 'text-fg-3 hover:text-foreground'
            }`}
          >
            实战情景对答 (PR / 故障 / Slack)
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
    </AppShell>
  )
}
