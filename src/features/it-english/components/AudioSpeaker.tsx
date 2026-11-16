import { useState, useEffect } from 'react'
import { Volume2, Square } from 'lucide-react'

// Keep a shared single audio instance to prevent overlapping playback
let currentAudio: HTMLAudioElement | null = null

interface AudioSpeakerProps {
  text: string
  audioUrl?: string
  lang?: 'en' | 'ja' | 'zh'
  rate?: number
  label?: string
  className?: string
  size?: number
}

export function AudioSpeaker({
  text,
  audioUrl,
  lang = 'en',
  rate = 0.95,
  label,
  className = '',
  size = 16,
}: AudioSpeakerProps) {
  const [speaking, setSpeaking] = useState(false)
  const [supported, setSupported] = useState(true)

  useEffect(() => {
    if (typeof window === 'undefined') {
      setSupported(false)
    }
  }, [])

  function speak() {
    if (typeof window === 'undefined') return

    // If currently speaking, stop
    if (speaking) {
      if (currentAudio) {
        currentAudio.pause()
        currentAudio.currentTime = 0
        currentAudio = null
      }
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel()
      }
      setSpeaking(false)
      return
    }

    // Stop any globally active audio or speech
    if (currentAudio) {
      currentAudio.pause()
      currentAudio.currentTime = 0
      currentAudio = null
    }
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
    }

    // 1. Prioritize pre-rendered Edge-TTS audio file if provided
    if (audioUrl) {
      const audio = new Audio(audioUrl)
      currentAudio = audio
      setSpeaking(true)

      audio.onended = () => {
        setSpeaking(false)
        if (currentAudio === audio) currentAudio = null
      }
      audio.onerror = () => {
        // Fallback to speechSynthesis if static file fails
        if (currentAudio === audio) currentAudio = null
        fallbackSpeech()
      }

      const p = audio.play()
      if (p && p.catch) {
        p.catch(() => {
          if (currentAudio === audio) currentAudio = null
          fallbackSpeech()
        })
      }
      return
    }

    // 2. Otherwise use Web Speech API
    fallbackSpeech()
  }

  function fallbackSpeech() {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setSpeaking(false)
      return
    }

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.rate = rate
    utterance.pitch = 1.0
    utterance.lang = lang === 'ja' ? 'ja-JP' : lang === 'zh' ? 'zh-CN' : 'en-US'

    // Pick appropriate voice based on language
    const voices = window.speechSynthesis.getVoices()
    if (lang === 'ja') {
      const jaVoice =
        voices.find(
          (v) =>
            v.lang.startsWith('ja') &&
            (v.name.includes('Natural') ||
              v.name.includes('Google') ||
              v.name.includes('Microsoft') ||
              v.name.includes('Kyoko') ||
              v.name.includes('Nanami') ||
              v.name.includes('Otoya')),
        ) || voices.find((v) => v.lang.startsWith('ja'))
      if (jaVoice) utterance.voice = jaVoice
    } else if (lang === 'zh') {
      const zhVoice =
        voices.find(
          (v) =>
            v.lang.startsWith('zh') &&
            (v.name.includes('Natural') ||
              v.name.includes('Xiaoxiao') ||
              v.name.includes('Yunxi') ||
              v.name.includes('Google') ||
              v.name.includes('Microsoft')),
        ) || voices.find((v) => v.lang.startsWith('zh'))
      if (zhVoice) utterance.voice = zhVoice
    } else {
      const enVoice =
        voices.find(
          (v) =>
            v.lang.startsWith('en') &&
            (v.name.includes('Natural') ||
              v.name.includes('Google') ||
              v.name.includes('Microsoft') ||
              v.name.includes('Guy') ||
              v.name.includes('Samantha') ||
              v.name.includes('Daniel')),
        ) || voices.find((v) => v.lang.startsWith('en'))
      if (enVoice) utterance.voice = enVoice
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
