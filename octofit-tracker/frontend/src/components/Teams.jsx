import ResourcePage from './ResourcePage.jsx'

export default function Teams() {
  return (
    <ResourcePage
      columns={[
        { heading: 'Team', render: (team) => team.name ?? 'Unnamed team' },
        {
          heading: 'Members',
          render: (team) => Array.isArray(team.members) ? team.members.length : 0,
        },
        { heading: 'Points', render: (team) => team.points ?? 0 },
      ]}
      description="Meet the teams and see how they are doing together."
      endpoint="/api/teams/"
      title="Teams"
    />
  )
}
