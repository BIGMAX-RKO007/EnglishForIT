import { createFileRoute } from '@tanstack/react-router'
import { getOptionalUser } from '@/features/auth/middleware'
import { AppShell } from '@/components/app/app-shell'
import { CnlSlotWorkbench } from '@/features/it-english/components/CnlSlotWorkbench'

export const Route = createFileRoute('/{-$locale}/app/defense')({
  head: () => ({
    meta: [
      { name: 'robots', content: 'noindex' },
      { title: '通用语言防身系统：8 大核心动词与 15% 安全壳 | EnglishForIT' },
    ],
  }),
  loader: async () => {
    const user = await getOptionalUser()
    const effectiveUser = user ?? {
      id: 'guest',
      email: 'engineer@workplace.local',
      name: 'Software Engineer',
    }
    return { user: effectiveUser }
  },
  component: DefensePage,
})

function DefensePage() {
  const { user } = Route.useLoaderData()

  return (
    <AppShell user={user} active="defense" crumb="语言防身与槽位引擎 (CNL)">
      <CnlSlotWorkbench />
    </AppShell>
  )
}
