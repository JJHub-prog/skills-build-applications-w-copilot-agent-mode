import ResourcePage from './ResourcePage.jsx'

export default function Users() {
  return (
    <ResourcePage
      columns={[
        {
          heading: 'Athlete',
          render: (user) => user.displayName ?? user.username ?? 'Unknown athlete',
        },
        { heading: 'Username', render: (user) => user.username ?? '—' },
        { heading: 'Email', render: (user) => user.email ?? '—' },
        { heading: 'Team', render: (user) => user.team?.name ?? 'Unassigned' },
      ]}
      description="A growing community of people moving toward their goals."
      endpoint="/api/users/"
      title="Users"
    />
  )
}
