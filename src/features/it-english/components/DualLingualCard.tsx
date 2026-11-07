import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { AudioSpeaker } from './AudioSpeaker'
import { CopyButton } from './CopyButton'
import type { DualPhrase } from '../data/dual-lingual.data'
import { Sparkles, BookOpen } from 'lucide-react'

interface DualLingualCardProps {
  phrase: DualPhrase
  mode?: 'all' | 'en' | 'ja'
}

export function DualLingualCard({ phrase, mode = 'all' }: DualLingualCardProps) {
  const showEn = mode === 'all' || mode === 'en'
  const showJa = mode === 'all' || mode === 'ja'

  return (
    <Card className="overflow-hidden border border-border/80 bg-card/60 p-5 shadow-sm transition-all hover:border-primary/40 hover:shadow-md">
      {/* 头部：分类标签与中文业务意图 */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-border/60 pb-3">
        <div className="flex items-center gap-2">
          <Badge variant="pro" dot>
            {phrase.categoryLabel}
          </Badge>
          <span className="text-sm font-semibold text-foreground">{phrase.title}</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-fg-3">
          <BookOpen size={13} className="text-primary/70" />
          <span>业务场景说明</span>
        </div>
      </div>

      <p className="mb-4 text-xs font-medium leading-relaxed text-fg-2 bg-muted/30 rounded-lg p-2.5 border border-border/40">
        🎯 <strong className="text-foreground">沟通意图：</strong>{phrase.intent}
      </p>

      <div className="grid gap-3.5">
        {/* 🇬🇧 英语表达 */}
        {showEn && (
          <div className="rounded-xl border border-sky-500/20 bg-gradient-to-r from-sky-500/5 via-transparent to-transparent p-3.5">
            <div className="mb-1.5 flex items-center justify-between">
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-sky-600 dark:text-sky-400">
                🇬🇧 English（外企与国际团队）
              </span>
              <div className="flex items-center gap-1.5">
                <AudioSpeaker text={phrase.en.text} lang="en" label="美音" />
                <CopyButton text={phrase.en.text} label="复制英文" />
              </div>
            </div>

            <p className="text-sm font-semibold text-foreground tracking-tight sm:text-base">
              {phrase.en.text}
            </p>

            <div className="mt-2 flex flex-wrap items-center gap-1.5 text-xs">
              <span className="rounded bg-sky-500/15 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400 border border-sky-500/20">
                Phonics 拼读
              </span>
              <span className="font-mono text-xs font-medium text-sky-800 dark:text-sky-200">
                {phrase.en.phonics}
              </span>
            </div>
          </div>
        )}

        {/* 🇯🇵 日语表达 */}
        {showJa && (
          <div className="rounded-xl border border-rose-500/20 bg-gradient-to-r from-rose-500/5 via-transparent to-transparent p-3.5">
            <div className="mb-1.5 flex items-center justify-between">
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-rose-600 dark:text-rose-400">
                🇯🇵 日本語（日本现场与日企客户）
              </span>
              <div className="flex items-center gap-1.5">
                <AudioSpeaker text={phrase.ja.text} lang="ja" label="日音" />
                <CopyButton text={phrase.ja.text} label="复制日文" />
              </div>
            </div>

            <p className="text-sm font-semibold text-foreground tracking-tight sm:text-base">
              {phrase.ja.text}
            </p>

            <div className="mt-1 text-xs text-fg-2">
              <span className="text-[10px] text-fg-3 mr-1">假名:</span>
              <span>{phrase.ja.furigana}</span>
            </div>

            <div className="mt-1 flex items-center gap-1.5 text-xs font-mono text-rose-700/80 dark:text-rose-300/80">
              <span className="text-[10px] uppercase tracking-wider text-fg-3 font-sans">罗马音:</span>
              <span>{phrase.ja.romaji}</span>
            </div>
          </div>
        )}
      </div>

      {/* 底部：跨文化避坑指南 */}
      {phrase.tip && (
        <div className="mt-3.5 flex items-start gap-2 rounded-lg bg-amber-500/10 p-2.5 text-xs leading-relaxed text-amber-900 dark:text-amber-200 border border-amber-500/20">
          <Sparkles size={14} className="mt-0.5 shrink-0 text-amber-600 dark:text-amber-400" />
          <div>
            <strong className="font-semibold text-amber-700 dark:text-amber-300">职场实战 Tips：</strong>
            {phrase.tip}
          </div>
        </div>
      )}
    </Card>
  )
}
