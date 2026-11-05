import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { getOptionalUser } from '@/features/auth/middleware'
import { AppShell } from '@/components/app/app-shell'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { AudioSpeaker } from '@/features/it-english/components/AudioSpeaker'
import { CopyButton } from '@/features/it-english/components/CopyButton'
import { STAR_PROJECTS, ACTION_VERB_CATEGORIES, type StarProject } from '@/features/it-english/data/project-star.data'
import { HelpCircle, Terminal } from 'lucide-react'

export const Route = createFileRoute('/{-$locale}/app/project-star')({
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
  component: ProjectStarPage,
})

function ProjectStarPage() {
  const { user } = Route.useLoaderData()
  const [selectedProject, setSelectedProject] = useState<StarProject>(STAR_PROJECTS[0])
  const [activeTab, setActiveTab] = useState<'case-study' | 'custom-star' | 'verbs'>('case-study')

  // Custom STAR state
  const [customTitle, setCustomTitle] = useState('Payment Gateway Idempotency & Retry Overhaul')
  const [customStack, setCustomStack] = useState('Node.js, Redis, MySQL, Kafka')
  const [customS, setCustomS] = useState('Our payment service experienced duplicate transaction errors during network jitter.')
  const [customT, setCustomT] = useState('I was responsible for designing an idempotent transaction mechanism to guarantee exactly-once processing.')
  const [customA, setCustomA] = useState('I implemented distributed Redis locks with unique idempotency keys and integrated asynchronous compensation webhooks.')
  const [customR, setCustomR] = useState('Duplicate transactions dropped to zero, eliminating financial reconciliation discrepancies.')

  const fullCustomScript = `In this project (${customTitle}), ${customS} ${customT} Specifically, ${customA} As a result, ${customR}`

  return (
    <AppShell user={user} active="project-star" crumb="项目经历 (Project STAR)">
      <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="page-h">项目经历 STAR 转换台</h1>
            <Badge variant="pro" dot>硅谷面试标准</Badge>
          </div>
          <p className="mt-1 text-sm text-fg-2">
            面试中讲清楚项目只需遵循 STAR 法则：背景 (S) ➔ 任务 (T) ➔ 方案与动词 (A) ➔ 量化收益 (R)。
          </p>
        </div>

        <div className="flex items-center rounded-lg border border-border bg-muted/40 p-1 text-xs">
          <button
            type="button"
            onClick={() => setActiveTab('case-study')}
            className={`rounded-md px-3 py-1.5 font-medium transition-all ${
              activeTab === 'case-study' ? 'bg-card text-foreground shadow-sm' : 'text-fg-3 hover:text-foreground'
            }`}
          >
            高频经典项目案例
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('custom-star')}
            className={`rounded-md px-3 py-1.5 font-medium transition-all ${
              activeTab === 'custom-star' ? 'bg-card text-foreground shadow-sm' : 'text-fg-3 hover:text-foreground'
            }`}
          >
            自制我的项目经历
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('verbs')}
            className={`rounded-md px-3 py-1.5 font-medium transition-all ${
              activeTab === 'verbs' ? 'bg-card text-foreground shadow-sm' : 'text-fg-3 hover:text-foreground'
            }`}
          >
            40+ 工程强动词速查
          </button>
        </div>
      </div>

      {activeTab === 'case-study' && (
        <div className="grid gap-6 lg:grid-cols-12">
          {/* Projects sidebar */}
          <div className="space-y-3 lg:col-span-4">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-fg-3">选择工程项目类型</h2>
            {STAR_PROJECTS.map((proj) => (
              <div
                key={proj.id}
                onClick={() => setSelectedProject(proj)}
                className={`cursor-pointer rounded-xl border p-4 transition-all ${
                  selectedProject.id === proj.id
                    ? 'border-primary bg-primary/5 ring-1 ring-primary'
                    : 'border-border bg-card hover:border-border-strong'
                }`}
              >
                <h3 className="text-sm font-semibold text-foreground">{proj.titleZh}</h3>
                <p className="mt-1 text-xs font-mono text-primary">{proj.title}</p>
                <div className="mt-2.5 flex flex-wrap gap-1">
                  {proj.techStack.map((tech, idx) => (
                    <span key={idx} className="rounded bg-muted px-1.5 py-0.5 text-[10px] text-fg-3">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}

            <div className="rounded-xl border border-border bg-muted/20 p-4 text-xs text-fg-3">
              <span className="font-semibold text-foreground">💡 面试官怎么听项目？</span>
              <p className="mt-1.5 leading-relaxed">
                不要花大量时间在 S（背景）上念经！把 70% 的时间放在 <strong>Action（你具体选了什么技术、解决了什么难点）</strong> 和 <strong>Result（量化指标提升）</strong> 上。
              </p>
            </div>
          </div>

          {/* Project Details */}
          <div className="space-y-5 lg:col-span-8">
            <Card className="p-5">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
                <div>
                  <h2 className="text-base font-semibold text-foreground">{selectedProject.title}</h2>
                  <p className="text-xs text-fg-3">{selectedProject.titleZh}</p>
                </div>
                <div className="flex items-center gap-2">
                  <AudioSpeaker
                    text={`${selectedProject.situationEn} ${selectedProject.taskEn} ${selectedProject.actionEn} ${selectedProject.resultEn}`}
                    label="朗读完整项目"
                    size={15}
                  />
                  <CopyButton
                    text={`${selectedProject.situationEn}\n\n${selectedProject.taskEn}\n\n${selectedProject.actionEn}\n\n${selectedProject.resultEn}`}
                    label="复制全文"
                    size={15}
                  />
                </div>
              </div>

              {/* STAR 4 stages */}
              <div className="mt-5 space-y-3.5">
                {/* Situation */}
                <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400">
                      [ S ] Situation - 业务背景与系统规模
                    </span>
                    <AudioSpeaker text={selectedProject.situationEn} size={13} />
                  </div>
                  <p className="mt-2 text-sm text-foreground">{selectedProject.situationEn}</p>
                  <p className="mt-1 text-xs text-fg-3">{selectedProject.situationZh}</p>
                </div>

                {/* Task */}
                <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-amber-600 dark:text-amber-400">
                      [ T ] Task - 你的核心职责与工程目标
                    </span>
                    <AudioSpeaker text={selectedProject.taskEn} size={13} />
                  </div>
                  <p className="mt-2 text-sm text-foreground">{selectedProject.taskEn}</p>
                  <p className="mt-1 text-xs text-fg-3">{selectedProject.taskZh}</p>
                </div>

                {/* Action */}
                <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400">
                      [ A ] Action - 技术选型、架构落地与难点突破 (重点!)
                    </span>
                    <AudioSpeaker text={selectedProject.actionEn} size={13} />
                  </div>
                  <p className="mt-2 text-sm text-foreground">{selectedProject.actionEn}</p>
                  <p className="mt-1 text-xs text-fg-3">{selectedProject.actionZh}</p>
                  <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
                    <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">高频强动词：</span>
                    {selectedProject.actionVerbs.map((v, i) => (
                      <span key={i} className="rounded bg-emerald-500/10 px-1.5 py-0.5 font-mono text-[11px] text-emerald-600 dark:text-emerald-400">
                        {v}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Result */}
                <div className="rounded-xl border border-purple-500/20 bg-purple-500/5 p-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-purple-600 dark:text-purple-400">
                      [ R ] Result - 量化业务收益与系统指标
                    </span>
                    <AudioSpeaker text={selectedProject.resultEn} size={13} />
                  </div>
                  <p className="mt-2 text-sm text-foreground">{selectedProject.resultEn}</p>
                  <p className="mt-1 text-xs text-fg-3">{selectedProject.resultZh}</p>
                  <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
                    <span className="text-[11px] font-semibold text-purple-600 dark:text-purple-400">亮眼指标：</span>
                    {selectedProject.metrics.map((m, i) => (
                      <Badge key={i} variant="free" className="text-[10px]">
                        {m}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* Follow-up Questions & Grilling */}
              <div className="mt-6 border-t border-border pt-5">
                <div className="mb-3 flex items-center gap-2">
                  <HelpCircle size={17} className="text-primary" />
                  <h3 className="text-sm font-semibold text-foreground">老外面试官常追问的两个问题 (Grilling Questions)</h3>
                </div>

                <div className="space-y-3">
                  {selectedProject.followUpQuestions.map((q, idx) => (
                    <div key={idx} className="rounded-lg border border-border/80 bg-muted/30 p-3.5 text-xs">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="font-semibold text-foreground">{q.questionEn}</p>
                          <p className="mt-0.5 text-fg-3">{q.questionZh}</p>
                        </div>
                        <AudioSpeaker text={q.questionEn} size={13} />
                      </div>
                      <div className="mt-2 rounded bg-background/80 p-2.5 text-fg-2">
                        <span className="font-semibold text-primary">💡 破局策略：</span>
                        <p className="mt-0.5 text-fg-3">{q.hintZh}</p>
                        <p className="mt-1 font-mono text-[11px] text-fg-2">{q.hintEn}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </div>
      )}

      {activeTab === 'custom-star' && (
        <div className="grid gap-6 lg:grid-cols-12">
          {/* Builder Form */}
          <div className="space-y-4 lg:col-span-6">
            <Card className="p-5">
              <h2 className="mb-3 text-sm font-semibold text-foreground">自制你的专属项目 STAR 描述</h2>
              <div className="space-y-3.5 text-xs">
                <div>
                  <label className="mb-1 block font-medium text-fg-2">项目名称 (Project Title)</label>
                  <Input value={customTitle} onChange={(e) => setCustomTitle(e.target.value)} />
                </div>
                <div>
                  <label className="mb-1 block font-medium text-fg-2">技术栈 (Tech Stack)</label>
                  <Input value={customStack} onChange={(e) => setCustomStack(e.target.value)} />
                </div>
                <div>
                  <label className="mb-1 block font-medium text-blue-600 dark:text-blue-400">
                    [S] 背景与挑战 (Situation / Problem)
                  </label>
                  <textarea
                    rows={2}
                    value={customS}
                    onChange={(e) => setCustomS(e.target.value)}
                    className="w-full rounded-md border border-border bg-background px-3 py-2 text-xs"
                  />
                </div>
                <div>
                  <label className="mb-1 block font-medium text-amber-600 dark:text-amber-400">
                    [T] 你的工程职责 (Task)
                  </label>
                  <textarea
                    rows={2}
                    value={customT}
                    onChange={(e) => setCustomT(e.target.value)}
                    className="w-full rounded-md border border-border bg-background px-3 py-2 text-xs"
                  />
                </div>
                <div>
                  <label className="mb-1 block font-medium text-emerald-600 dark:text-emerald-400">
                    [A] 技术选型与实施 (Action - 使用强动词)
                  </label>
                  <textarea
                    rows={3}
                    value={customA}
                    onChange={(e) => setCustomA(e.target.value)}
                    className="w-full rounded-md border border-border bg-background px-3 py-2 text-xs"
                  />
                </div>
                <div>
                  <label className="mb-1 block font-medium text-purple-600 dark:text-purple-400">
                    [R] 量化数据收益 (Result - 吞吐量/延迟/成本)
                  </label>
                  <textarea
                    rows={2}
                    value={customR}
                    onChange={(e) => setCustomR(e.target.value)}
                    className="w-full rounded-md border border-border bg-background px-3 py-2 text-xs"
                  />
                </div>
              </div>
            </Card>
          </div>

          {/* Generated Result */}
          <div className="space-y-4 lg:col-span-6">
            <Card className="p-5">
              <div className="mb-4 flex items-center justify-between border-b border-border pb-3">
                <div className="flex items-center gap-2">
                  <Terminal size={17} className="text-primary" />
                  <h3 className="text-sm font-semibold text-foreground">实时合成的标准回答</h3>
                </div>
                <div className="flex items-center gap-2">
                  <AudioSpeaker text={fullCustomScript} label="发音试听" size={14} />
                  <CopyButton text={fullCustomScript} label="复制段落" size={14} />
                </div>
              </div>

              <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 text-[14px] leading-relaxed text-foreground">
                {fullCustomScript}
              </div>

              <div className="mt-5 rounded-lg border border-border p-4 text-xs text-fg-3">
                <span className="font-semibold text-foreground">面试讲法秘诀：</span>
                <p className="mt-1 leading-relaxed">
                  在面试时，按照 <span className="font-mono text-primary font-semibold">"Situation ➔ Task ➔ Action ➔ Result"</span> 顺畅念出这段话，中间深呼吸停顿 1 秒，老外就能 100% 听清你的架构功底！
                </p>
              </div>
            </Card>
          </div>
        </div>
      )}

      {activeTab === 'verbs' && (
        <div className="grid gap-4 md:grid-cols-3">
          {ACTION_VERB_CATEGORIES.map((cat, idx) => (
            <Card key={idx} className="p-4.5">
              <h3 className="text-sm font-semibold text-foreground border-b border-border pb-2.5">{cat.category}</h3>
              <div className="mt-3 space-y-2">
                {cat.verbs.map((verb, vIdx) => {
                  const enOnly = verb.split(' ')[0]
                  return (
                    <div key={vIdx} className="flex items-center justify-between rounded-md bg-muted/40 px-2.5 py-1.5 text-xs">
                      <span className="font-medium text-foreground">{verb}</span>
                      <AudioSpeaker text={enOnly} size={12} />
                    </div>
                  )
                })}
              </div>
            </Card>
          ))}
        </div>
      )}
    </AppShell>
  )
}
