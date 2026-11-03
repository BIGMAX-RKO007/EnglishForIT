import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

interface CopyButtonProps {
  text: string
  label?: string
  className?: string
  size?: number
}

export function CopyButton({ text, label, className = '', size = 15 }: CopyButtonProps) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (e) {
      console.error('Failed to copy', e)
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      title="复制内容到剪贴板（可直接粘贴至 Slack / PR / 简历）"
      className={`inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium transition-all ${
        copied
          ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
          : 'bg-muted/70 text-fg-2 hover:bg-muted hover:text-foreground border border-border/60'
      } ${className}`}
    >
      {copied ? (
        <>
          <Check size={size} className="text-emerald-500" />
          <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400">已复制</span>
        </>
      ) : (
        <>
          <Copy size={size} className="text-fg-3 hover:text-foreground" />
          {label && <span className="text-[11px]">{label}</span>}
        </>
      )}
    </button>
  )
}

