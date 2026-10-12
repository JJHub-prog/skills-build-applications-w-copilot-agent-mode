import ResourcePage from './ResourcePage.jsx'

function userName(user) {
  return user?.displayName ?? user?.username ?? 'Unknown athlete'
}

export default function Activities() {
  return (
    <ResourcePage
      columns={[
        { heading: 'Athlete', render: (activity) => userName(activity.user) },
        { heading: 'Activity', render: (activity) => activity.type ?? '—' },
        { heading: 'Duration', render: (activity) => `${activity.duration ?? 0} min` },
        { heading: 'Points', render: (activity) => activity.points ?? 0 },
        {
          heading: 'Date',
          render: (activity) => activity.date
            ? new Date(activity.date).toLocaleDateString()
            : '—',
        },
      ]}
      description="Recent movement and training logged by the community."
      endpoint="/api/activities/"
      title="Activities"
    />
  )
}
