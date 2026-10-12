import ResourcePage from './ResourcePage.jsx'

function userName(user) {
  return user?.displayName ?? user?.username ?? 'Unknown athlete'
}

export default function Leaderboard() {
  return (
    <ResourcePage
      columns={[
        { heading: 'Rank', render: (_entry, index) => index + 1 },
        { heading: 'Athlete', render: (entry) => userName(entry.user) },
        { heading: 'Team', render: (entry) => entry.team?.name ?? 'Unassigned' },
        { heading: 'Points', render: (entry) => entry.points ?? 0 },
      ]}
      description="Celebrate the athletes earning points through their activities."
      endpoint="/api/leaderboard/"
      title="Leaderboard"
    />
  )
}
