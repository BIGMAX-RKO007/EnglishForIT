import { createFileRoute } from '@tanstack/react-router'
import { getOptionalUser } from '@/features/auth/middleware'
import { AppShell } from '@/components/app/app-shell'
import { DmpProjectWorkbench } from '@/features/it-english/components/DmpProjectWorkbench'

export const Route = createFileRoute('/{-$locale}/app/project-dmp')({
  head: () => ({
    meta: [
      { name: 'robots', content: 'noindex' },
      { title: '当前业务用语：NRI × 芙蓉综合租赁 DMP 项目实战词汇与话术 | EnglishForIT' },
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
  component: ProjectDmpPage,
})

function ProjectDmpPage() {
  const { user } = Route.useLoaderData()

  return (
    <AppShell user={user} active="project-dmp" crumb="当前业务用语 (DMP 项目专属)">
      <DmpProjectWorkbench />
    </AppShell>
  )
}
