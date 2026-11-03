import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { requireUser } from '@/features/auth/middleware'
import { AppShell } from '@/components/app/app-shell'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { AudioSpeaker } from '@/features/it-english/components/AudioSpeaker'
import { CopyButton } from '@/features/it-english/components/CopyButton'
import { SELF_INTRO_TEMPLATES, TOP_INTERVIEW_QUESTIONS, type IntroTemplate } from '@/features/it-english/data/self-intro.data'
import { Sparkles, Sliders } from 'lucide-react'

export const Route = createFileRoute('/{-$locale}/app/self-intro')({
  head: () => ({ meta: [{ name: 'robots', content: 'noindex' }] }),
    loader: async ({ params }) => {
    const user = await requireUser({ data: { locale: params.locale } })
    return { user }
  },
  component: SelfIntroPage,
})

function SelfIntroPage() {
  const { user } = Route.useLoaderData()
  const [selectedTemplate, setSelectedTemplate] = useState<IntroTemplate>(SELF_INTRO_TEMPLATES[0])
  const [activeTab, setActiveTab] = useState<'templates' | 'builder' | 'qa'>('templates')

  // Custom Builder State
  const [customName, setCustomName] = useState('Dev')
  const [customRole, setCustomRole] = useState('Senior Backend Engineer')
  const [customYears, setCustomYears] = useState('5')
  const [customStack, setCustomStack] = useState('Go, Docker, PostgreSQL, and Kubernetes')
  const [customHighlight, setCustomHighlight] = useState('re-architected the checkout service handling 25,000 QPS with 99.99% uptime')

  const generatedCustomPitch = `Hi, I'm ${customName}. I'm a ${customRole} with over ${customYears} years of experience building reliable, scalable systems. My primary stack centers around ${customStack}. In my most recent role, I ${customHighlight}. I enjoy collaborating in cross-functional agile teams, and I'm excited to bring my engineering background and problem-solving skills to this position.`

  return (
    <AppShell user={user} active="self-intro" crumb="自我介绍 (Self-Intro & Pitch)">
      <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="page-h">自我介绍破冰台</h1>
            <Badge variant="pro" dot>能用即标准</Badge>
          </div>
          <p className="mt-1 text-sm text-fg-2">
            摆脱死记硬背！专为 IT 工程师打造的 30 秒电梯破冰、1 分钟标准自述与即时定制工具。
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex items-center rounded-lg border border-border bg-muted/40 p-1 text-xs">
          <button
            type="button"
            onClick={() => setActiveTab('templates')}
            className={`rounded-md px-3 py-1.5 font-medium transition-all ${
              activeTab === 'templates' ? 'bg-card text-foreground shadow-sm' : 'text-fg-3 hover:text-foreground'
            }`}
          >
            经典范例 (30s/1m/3m)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('builder')}
            className={`rounded-md px-3 py-1.5 font-medium transition-all ${
              activeTab === 'builder' ? 'bg-card text-foreground shadow-sm' : 'text-fg-3 hover:text-foreground'
            }`}
          >
            一键自制专属自述
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('qa')}
            className={`rounded-md px-3 py-1.5 font-medium transition-all ${
              activeTab === 'qa' ? 'bg-card text-foreground shadow-sm' : 'text-fg-3 hover:text-foreground'
            }`}
          >
            经典面试打乱追问
          </button>
        </div>
      </div>

      {activeTab === 'templates' && (
        <div className="grid gap-6 lg:grid-cols-12">
          {/* Template selector */}
          <div className="space-y-3 lg:col-span-4">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-fg-3">选择时长与场景</h2>
            {SELF_INTRO_TEMPLATES.map((tmpl) => (
              <div
                key={tmpl.id}
                onClick={() => setSelectedTemplate(tmpl)}
                className={`cursor-pointer rounded-xl border p-4 transition-all ${
                  selectedTemplate.id === tmpl.id
                    ? 'border-primary bg-primary/5 ring-1 ring-primary'
                    : 'border-border bg-card hover:border-border-strong'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-semibold text-primary">{tmpl.duration}</span>
                  <Badge variant="free">{tmpl.roleZh}</Badge>
                </div>
                <h3 className="mt-2 text-sm font-semibold text-foreground">{tmpl.titleZh}</h3>
                <p className="mt-1 line-clamp-2 text-xs text-fg-3">{tmpl.scriptZh}</p>
              </div>
            ))}

            <div className="rounded-xl border border-border/80 bg-muted/30 p-3.5 text-xs text-fg-3">
              <span className="font-semibold text-foreground">💡 为什么是这三种时长？</span>
              <ul className="mt-1.5 list-inside list-disc space-y-1">
                <li><strong className="text-fg-2">30 秒</strong>：开场破冰或技术交叉面，干脆利落；</li>
                <li><strong className="text-fg-2">1 分钟</strong>：标准单人主面试通用篇，信息密度最高；</li>
                <li><strong className="text-fg-2">3 分钟</strong>：猎头或 Hiring Manager 详聊个人成长与架构演进。</li>
              </ul>
            </div>
          </div>

          {/* Template detailed reader */}
          <div className="space-y-5 lg:col-span-8">
            <Card className="p-5">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm font-bold text-primary">{selectedTemplate.duration}</span>
                    <h2 className="text-base font-semibold text-foreground">{selectedTemplate.title}</h2>
                  </div>
                  <p className="text-xs text-fg-3">{selectedTemplate.titleZh}</p>
                </div>
                <div className="flex items-center gap-2">
                  <AudioSpeaker text={selectedTemplate.scriptEn} label="听完整段落" size={15} />
                  <CopyButton text={selectedTemplate.scriptEn} label="复制英文" size={15} />
                </div>
              </div>

              {/* Full Paragraph */}
              <div className="mt-4 rounded-lg bg-muted/40 p-4 text-sm leading-relaxed text-foreground">
                <p className="font-sans text-[14.5px] leading-relaxed selection:bg-primary/20">
                  {selectedTemplate.scriptEn}
                </p>
                <p className="mt-3 border-t border-border/60 pt-3 text-xs leading-normal text-fg-3">
                  {selectedTemplate.scriptZh}
                </p>
              </div>

              {/* Sentence by sentence breakdown */}
              <div className="mt-6 space-y-3">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-fg-3">逐句精读与核心语块</h3>
                {selectedTemplate.breakdown.map((item, idx) => (
                  <div key={idx} className="rounded-lg border border-border/70 bg-card p-3.5 transition-colors hover:border-border-strong">
                    <div className="flex items-center justify-between">
                      <span className="rounded bg-muted px-2 py-0.5 font-mono text-[11px] font-semibold text-fg-2">
                        {item.sectionZh} ({item.section})
                      </span>
                      <AudioSpeaker text={item.textEn} size={13} />
                    </div>
                    <p className="mt-2 text-sm font-medium text-foreground">{item.textEn}</p>
                    <p className="mt-1 text-xs text-fg-3">{item.textZh}</p>
                    <div className="mt-2.5 flex flex-wrap gap-1.5">
                      {item.keyCollocations.map((col, cIdx) => (
                        <span key={cIdx} className="rounded-md border border-primary/20 bg-primary/10 px-2 py-0.5 text-[11px] font-medium text-primary">
                          {col}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      )}

      {activeTab === 'builder' && (
        <div className="grid gap-6 lg:grid-cols-12">
          {/* Builder Form */}
          <div className="space-y-4 lg:col-span-5">
            <Card className="p-5">
              <div className="mb-4 flex items-center gap-2 border-b border-border pb-3">
                <Sliders size={18} className="text-primary" />
                <h2 className="text-sm font-semibold text-foreground">填入你的真实信息</h2>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="mb-1 block font-medium text-fg-2">英文称呼 (Name / Nickname)</label>
                  <Input value={customName} onChange={(e) => setCustomName(e.target.value)} placeholder="Alex" />
                </div>

                <div>
                  <label className="mb-1 block font-medium text-fg-2">目标职位 (Target Role)</label>
                  <Input value={customRole} onChange={(e) => setCustomRole(e.target.value)} placeholder="Senior Frontend Engineer" />
                </div>

                <div>
                  <label className="mb-1 block font-medium text-fg-2">工作年限 (Years of Experience)</label>
                  <Input value={customYears} onChange={(e) => setCustomYears(e.target.value)} placeholder="5" />
                </div>

                <div>
                  <label className="mb-1 block font-medium text-fg-2">核心技术栈 (Core Tech Stack)</label>
                  <Input value={customStack} onChange={(e) => setCustomStack(e.target.value)} placeholder="TypeScript, React, Node.js, Tailwind" />
                </div>

                <div>
                  <label className="mb-1 block font-medium text-fg-2">最亮眼的一项成果/指标 (Key Highlight / Impact)</label>
                  <textarea
                    rows={3}
                    value={customHighlight}
                    onChange={(e) => setCustomHighlight(e.target.value)}
                    className="w-full rounded-md border border-border bg-background px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                    placeholder="e.g. reduced load latency by 40% and maintained 99.99% uptime"
                  />
                  <p className="mt-1 text-[11px] text-fg-3">支持中英文夹杂，填好后右侧实时生成标准硅谷工程表达！</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Real-time Preview */}
          <div className="space-y-4 lg:col-span-7">
            <Card className="p-5">
              <div className="mb-4 flex items-center justify-between border-b border-border pb-3">
                <div className="flex items-center gap-2">
                  <Sparkles size={18} className="text-primary" />
                  <h2 className="text-sm font-semibold text-foreground">实时生成的标准工程自述</h2>
                </div>
                <div className="flex items-center gap-2">
                  <AudioSpeaker text={generatedCustomPitch} label="发音试听" size={15} />
                  <CopyButton text={generatedCustomPitch} label="复制到剪贴板" size={15} />
                </div>
              </div>

              <div className="rounded-xl border border-primary/20 bg-primary/5 p-4.5 text-[14.5px] leading-relaxed text-foreground">
                {generatedCustomPitch}
              </div>

              <div className="mt-5 space-y-2.5">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-fg-3">为什么这段自述极其地道？</h3>
                <div className="grid gap-2 sm:grid-cols-2 text-xs">
                  <div className="rounded-lg border border-border p-3">
                    <span className="font-semibold text-foreground">1. 强力动词中心</span>
                    <p className="mt-1 text-fg-3">使用了 centers around, building reliable systems，自然不生硬。</p>
                  </div>
                  <div className="rounded-lg border border-border p-3">
                    <span className="font-semibold text-foreground">2. 结果与指标导向</span>
                    <p className="mt-1 text-fg-3">强调 99.99% uptime 和 QPS，体现资深工程师的价值感。</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      )}

      {activeTab === 'qa' && (
        <div className="space-y-4">
          <div className="rounded-xl border border-border bg-card p-4 text-xs text-fg-3">
            <p className="font-semibold text-foreground">💡 来自教材 Lesson 14 Job Interview 的核心逻辑：</p>
            <p className="mt-1">
              老外面试官问你问题，本质上只有两类意图：
              <span className="font-medium text-foreground"> ① What value can you add to my team? (你能为团队带来什么价值？)</span> 和 
              <span className="font-medium text-foreground"> ② Why do you want this job? (你为什么想来？)</span>
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {TOP_INTERVIEW_QUESTIONS.map((qa) => (
              <Card key={qa.id} className="p-4.5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">{qa.questionEn}</h3>
                    <p className="text-xs text-fg-3">{qa.questionZh}</p>
                  </div>
                  <AudioSpeaker text={qa.questionEn} size={14} />
                </div>

                <div className="mt-3 rounded-md bg-muted/40 p-2.5 text-xs text-fg-2">
                  <span className="font-semibold text-foreground">面试官意图：</span> {qa.intent}
                </div>

                <div className="mt-3 border-t border-border pt-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-primary">推荐回答示范：</span>
                    <div className="flex items-center gap-1.5">
                      <AudioSpeaker text={qa.goodAnswerEn} size={13} />
                      <CopyButton text={qa.goodAnswerEn} size={13} />
                    </div>
                  </div>
                  <p className="mt-1.5 text-xs font-medium leading-relaxed text-foreground">{qa.goodAnswerEn}</p>
                  <p className="mt-1 text-xs text-fg-3">{qa.goodAnswerZh}</p>
                </div>

                <div className="mt-3 rounded border border-border/80 bg-background/50 px-2.5 py-1.5 text-[11px] text-fg-3">
                  <span className="font-semibold text-foreground">避坑秘籍：</span> {qa.tips}
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </AppShell>
  )
}
