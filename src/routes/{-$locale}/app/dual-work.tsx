import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/{-$locale}/app/dual-work')({
  beforeLoad: ({ params }) => {
    throw redirect({
      to: '/{-$locale}/app/defense',
      params: { locale: params.locale },
    })
  },
})
