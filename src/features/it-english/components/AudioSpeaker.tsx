import { useState, useEffect } from 'react'
import { Volume2, Square } from 'lucide-react'

interface AudioSpeakerProps {
  text: string
  rate?: number
  label?: string
  className?: string
  size?: number
}

export function AudioSpeaker({
  text,
  rate = 0.95,
  label,
  className = '',
  size = 16,
}: AudioSpeakerProps) {
  const [speaking, setSpeaking] = useState(false)
  const [supported, setSupported] = useState(true)

  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setSupported(false)
    }
  }, [])

  function speak() {
    if (!supported || typeof window === 'undefined') return

    // If currently speaking, stop
    if (speaking) {
      window.speechSynthesis.cancel()
      setSpeaking(false)
      return
    }

    window.speechSynthesis.cancel() // clear any queue

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.rate = rate
    utterance.pitch = 1.0

    // Try to pick an English voice
    const voices = window.speechSynthesis.getVoices()
    const englishVoice =
      voices.find(
        (v) =>
          v.lang.startsWith('en') &&
          (v.name.includes('Natural') ||
            v.name.includes('Google') ||
            v.name.includes('Microsoft') ||
            v.name.includes('Samantha') ||
            v.name.includes('Daniel')),
      ) || voices.find((v) => v.lang.startsWith('en'))

    if (englishVoice) {
      utterance.voice = englishVoice
    }

    utterance.onstart = () => setSpeaking(true)
    utterance.onend = () => setSpeaking(false)
    utterance.onerror = () => setSpeaking(false)

    window.speechSynthesis.speak(utterance)
  }

  if (!supported) return null

  return (
    <button
      type="button"
      onClick={speak}
      title={speaking ? '点击停止朗读' : '戴上耳机听纯正发音'}
      aria-label="发音朗读"
      className={`inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium transition-all ${
        speaking
          ? 'bg-primary/20 text-primary border border-primary/30 animate-pulse'
          : 'bg-muted/70 text-fg-2 hover:bg-muted hover:text-foreground border border-border/60'
      } ${className}`}
    >
      {speaking ? (
        <>
          <Square size={size} className="fill-current text-primary" />
          <span className="text-[11px] font-mono tracking-tight text-primary">播放中</span>
        </>
      ) : (
        <>
          <Volume2 size={size} className="text-fg-3 hover:text-foreground" />
          {label && <span className="text-[11px]">{label}</span>}
        </>
      )}
    </button>
  )
}
