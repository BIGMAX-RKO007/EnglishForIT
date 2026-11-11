import { createFileRoute, Link } from '@tanstack/react-router'
import {
  Mic,
  Briefcase,
  Users,
  BookOpen,
  ArrowRight,
  Terminal,
  Shield,
} from 'lucide-react'
import { getOptionalUser } from '@/features/auth/middleware'
import { getEntitlement } from '@/features/billing/middleware'
import { AppShell } from '@/components/app/app-shell'
import { Badge } from '@/components/ui/badge'

export const Route = createFileRoute('/{-$locale}/app/')({
  validateSearch: (s: Record<string, unknown>): { checkout?: string } => ({
    checkout: typeof s.checkout === 'string' ? s.checkout : undefined,
  }),
  head: () => ({ meta: [{ name: 'robots', content: 'noindex' }] }),
  loader: async () => {
    const user = await getOptionalUser()
    const ent = user ? await getEntitlement() : { plan: 'free' as const, paymentFailed: false }
    const effectiveUser = user ?? {
      id: 'guest',
      email: 'engineer@workplace.local',
      name: 'Software Engineer (Guest)',
    }
    return { user: effectiveUser, ent }
  },
  component: AppHome,
})

function AppHome() {
  const { user, ent } = Route.useLoaderData()
  const isPro = ent?.plan === 'pro'

  return (
    <AppShell user={user} isPro={isPro} active="dashboard" crumb="工作台 (English For IT)">
      {/* Hero Welcome banner */}
      <div className="mb-8 rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Badge variant="pro" dot>English For IT Professionals</Badge>
              <span className="text-xs font-mono text-fg-3">v2.0 实战版</span>
            </div>
            <h1 className="mt-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              IT 职场实用英语工作台
            </h1>
            <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-fg-2">
              拒绝学院派应试！面向真实的面试与海外远程协同：做自我介绍、清晰陈述项目与架构、开站会与日常沟通。
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-xl border border-border/80 bg-card/80 p-3 text-xs">
            <Terminal size={16} className="text-primary" />
            <div>
              <div className="font-semibold text-foreground">工位极简模式</div>
              <div className="text-[11px] text-fg-3">耳机静音听音 + 一键复制</div>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Core Practical Modules */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-mono text-xs uppercase tracking-wider text-fg-3">核心实战模块 (Core Practice Modules)</h2>
        <span className="text-xs text-primary font-medium">随时练习，开箱即用</span>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* Module 1: Self Intro */}
        <Link
          to="/{-$locale}/app/self-intro"
          className="group relative flex flex-col justify-between rounded-xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-primary/60 hover:shadow-sm"
        >
          <div>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400">
              <Mic size={20} />
            </div>
            <h3 className="mt-4 text-base font-semibold text-foreground group-hover:text-primary transition-colors">
              自我介绍破冰台
            </h3>
            <p className="mt-1.5 text-xs leading-relaxed text-fg-3">
              30 秒电梯演说、1 分钟标准程序员自述与 3 分钟成长深度自白。支持表单实时自制与打乱追问。
            </p>
          </div>
          <div className="mt-5 flex items-center gap-1 text-xs font-medium text-primary">
            <span>开始练习</span>
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </div>
        </Link>

        {/* Module 2: Project STAR */}
        <Link
          to="/{-$locale}/app/project-star"
          className="group relative flex flex-col justify-between rounded-xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-primary/60 hover:shadow-sm"
        >
          <div>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <Briefcase size={20} />
            </div>
            <h3 className="mt-4 text-base font-semibold text-foreground group-hover:text-primary transition-colors">
              项目履历 STAR 转换台
            </h3>
            <p className="mt-1.5 text-xs leading-relaxed text-fg-3">
              按 S-T-A-R 结构精准介绍你的高并发优化、微服务重构或线上排障战绩。带 40+ 工程强动词和追问破解。
            </p>
          </div>
          <div className="mt-5 flex items-center gap-1 text-xs font-medium text-primary">
            <span>进入演练</span>
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </div>
        </Link>

        {/* Module 3: Daily Workplace */}
        <Link
          to="/{-$locale}/app/daily-work"
          className="group relative flex flex-col justify-between rounded-xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-primary/60 hover:shadow-sm"
        >
          <div>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400">
              <Users size={20} />
            </div>
            <h3 className="mt-4 text-base font-semibold text-foreground group-hover:text-primary transition-colors">
              日常工作交流模拟器
            </h3>
            <p className="mt-1.5 text-xs leading-relaxed text-fg-3">
              每日站会 3 段式生成器（Yesterday / Today / Blockers）、PR Review 礼貌提评、线上故障紧急止损。
            </p>
          </div>
          <div className="mt-5 flex items-center gap-1 text-xs font-medium text-primary">
            <span>站会与对练</span>
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </div>
        </Link>

        {/* Module 4: Cheat Sheet */}
        <Link
          to="/{-$locale}/app/cheatsheet"
          className="group relative flex flex-col justify-between rounded-xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-primary/60 hover:shadow-sm"
        >
          <div>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <BookOpen size={20} />
            </div>
            <h3 className="mt-4 text-base font-semibold text-foreground group-hover:text-primary transition-colors">
              工位秒查锦囊与发音
            </h3>
            <p className="mt-1.5 text-xs leading-relaxed text-fg-3">
              《English For IT》两本教材浓缩精选的 50+ 必备高频语块，以及 SQL / Azure / Cache 等技术名词避坑发音。
            </p>
          </div>
          <div className="mt-5 flex items-center gap-1 text-xs font-medium text-primary">
            <span>查阅金句</span>
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </div>
        </Link>

        {/* Module 5: CNL & Slot Defense Engine (Dual-Lingual EN & JA) */}
        <Link
          to="/{-$locale}/app/defense"
          className="group relative flex flex-col justify-between rounded-xl border border-amber-500/40 bg-gradient-to-br from-amber-500/5 via-card to-card p-5 transition-all hover:-translate-y-0.5 hover:border-amber-500 hover:shadow-md"
        >
          <div>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <Shield size={20} />
            </div>
            <div className="mt-4 flex items-center gap-1.5">
              <h3 className="text-base font-semibold text-foreground group-hover:text-amber-500 transition-colors">
                语言防身与槽位引擎
              </h3>
              <Badge variant="pro" className="text-[10px] px-1 py-0">CNL·日英双轨</Badge>
            </div>
            <p className="mt-1.5 text-xs leading-relaxed text-fg-3">
              基于极简受控语言（CNL）设计：8 大核心动词引擎 + 15% 安全壳，全量融合英日双轨工位实战，固定表达加底色，槽位加下划线！
            </p>
          </div>
          <div className="mt-5 flex items-center gap-1 text-xs font-medium text-amber-500">
            <span>双轨槽位拼装</span>
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </div>
        </Link>
      </div>

      {/* Practical Strategy Guideline */}
      <div className="mt-8 rounded-xl border border-border bg-card p-5">
        <h3 className="text-sm font-semibold text-foreground">🎯 三步通关法（上班碎片时间 10 分钟）</h3>
        <div className="mt-3 grid gap-3 sm:grid-cols-3 text-xs">
          <div className="rounded-lg bg-muted/40 p-3">
            <span className="font-semibold text-primary">第 1 步：做自我介绍</span>
            <p className="mt-1 text-fg-3">
              进入自我介绍台，把自己的技术栈和年限填入自制器，戴耳机听 3 遍发音，默念到脱口而出。
            </p>
          </div>
          <div className="rounded-lg bg-muted/40 p-3">
            <span className="font-semibold text-primary">第 2 步：精炼一个代表作</span>
            <p className="mt-1 text-fg-3">
              在 STAR 转换台挑一个最像你的项目（例如高并发性能优化），熟悉 Action 中的动词搭配。
            </p>
          </div>
          <div className="rounded-lg bg-muted/40 p-3">
            <span className="font-semibold text-primary">第 3 步：每天写一句站会</span>
            <p className="mt-1 text-fg-3">
              在日常沟通模拟器中生成你今天的 Standup 发言，一键复制，随时在 Slack 或会议中即用。
            </p>
          </div>
        </div>
      </div>
    </AppShell>
  )
}
