import ResourcePage from './ResourcePage.jsx'

export default function Workouts() {
  return (
    <ResourcePage
      columns={[
        { heading: 'Workout', render: (workout) => workout.title ?? 'Untitled workout' },
        { heading: 'Activity', render: (workout) => workout.activityType ?? '—' },
        { heading: 'Difficulty', render: (workout) => workout.difficulty ?? '—' },
        { heading: 'Duration', render: (workout) => `${workout.duration ?? 0} min` },
        { heading: 'Description', render: (workout) => workout.description ?? '—' },
      ]}
      description="Find a guided workout that fits your next training session."
      endpoint="/api/workouts/"
      title="Workouts"
    />
  )
}
