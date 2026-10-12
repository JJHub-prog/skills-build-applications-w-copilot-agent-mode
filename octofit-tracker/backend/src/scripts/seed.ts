import mongoose from 'mongoose';
import { connectDatabase } from '../config/database';
import Activity from '../models/Activity';
import LeaderboardEntry from '../models/LeaderboardEntry';
import Team from '../models/Team';
import User from '../models/User';
import Workout from '../models/Workout';

const demoDate = new Date('2026-10-01T12:00:00.000Z');

const activitySeeds = [
  {
    id: '670000000000000000000001',
    username: 'alex.morgan',
    type: 'Running',
    duration: 35,
    points: 70,
    notes: 'Steady neighborhood run',
  },
  {
    id: '670000000000000000000002',
    username: 'jordan.lee',
    type: 'Cycling',
    duration: 45,
    points: 90,
    notes: 'Outdoor cycling session',
  },
  {
    id: '670000000000000000000003',
    username: 'sam.taylor',
    type: 'Strength training',
    duration: 30,
    points: 60,
    notes: 'Full-body strength workout',
  },
  {
    id: '670000000000000000000004',
    username: 'riley.chen',
    type: 'Yoga',
    duration: 40,
    points: 60,
    notes: 'Mobility and recovery session',
  },
];

const workoutSeeds = [
  {
    id: '670000000000000000000101',
    title: 'Beginner Run',
    description: 'A comfortable run to build an aerobic base.',
    activityType: 'Running',
    difficulty: 'beginner',
    duration: 25,
  },
  {
    id: '670000000000000000000102',
    title: 'Bodyweight Strength',
    description: 'A balanced circuit of foundational bodyweight exercises.',
    activityType: 'Strength training',
    difficulty: 'beginner',
    duration: 30,
  },
  {
    id: '670000000000000000000103',
    title: 'Cycling Intervals',
    description: 'Alternate brisk efforts with easy recovery periods.',
    activityType: 'Cycling',
    difficulty: 'intermediate',
    duration: 40,
  },
  {
    id: '670000000000000000000104',
    title: 'Recovery Flow',
    description: 'Gentle stretches and mobility work for recovery.',
    activityType: 'Yoga',
    difficulty: 'beginner',
    duration: 20,
  },
];

async function seedDatabase(): Promise<void> {
  try {
    await connectDatabase();

    await Team.updateOne(
      { name: 'Falcons' },
      { $set: { points: 160 } },
      { upsert: true },
    );
    await Team.updateOne(
      { name: 'Comets' },
      { $set: { points: 120 } },
      { upsert: true },
    );
    const teams = await Team.find({ name: { $in: ['Falcons', 'Comets'] } });
    const teamByName = new Map(teams.map((team) => [team.name, team]));
    const falcons = teamByName.get('Falcons');
    const comets = teamByName.get('Comets');

    if (!falcons || !comets) {
      throw new Error('Unable to load seeded teams');
    }

    const users = [
      {
        username: 'alex.morgan',
        email: 'alex.morgan@example.com',
        displayName: 'Alex Morgan',
        team: falcons._id,
      },
      {
        username: 'jordan.lee',
        email: 'jordan.lee@example.com',
        displayName: 'Jordan Lee',
        team: falcons._id,
      },
      {
        username: 'sam.taylor',
        email: 'sam.taylor@example.com',
        displayName: 'Sam Taylor',
        team: comets._id,
      },
      {
        username: 'riley.chen',
        email: 'riley.chen@example.com',
        displayName: 'Riley Chen',
        team: comets._id,
      },
    ];

    for (const user of users) {
      await User.updateOne(
        { username: user.username },
        { $set: user },
        { upsert: true },
      );
    }
    const seededUsers = await User.find({
      username: { $in: users.map(({ username }) => username) },
    });
    const userByUsername = new Map(
      seededUsers.map((user) => [user.username, user]),
    );

    if (seededUsers.length !== users.length) {
      throw new Error('Unable to load all seeded users');
    }

    await Team.updateOne(
      { _id: falcons._id },
      {
        $set: {
          members: seededUsers
            .filter((user) => user.team?.equals(falcons._id))
            .map((user) => user._id),
        },
      },
    );
    await Team.updateOne(
      { _id: comets._id },
      {
        $set: {
          members: seededUsers
            .filter((user) => user.team?.equals(comets._id))
            .map((user) => user._id),
        },
      },
    );

    for (const activity of activitySeeds) {
      const user = userByUsername.get(activity.username);
      if (!user) {
        throw new Error(`Unable to find seeded user ${activity.username}`);
      }

      await Activity.updateOne(
        { _id: new mongoose.Types.ObjectId(activity.id) },
        {
          $set: {
            user: user._id,
            type: activity.type,
            duration: activity.duration,
            points: activity.points,
            date: demoDate,
            notes: activity.notes,
          },
        },
        { upsert: true },
      );

      await LeaderboardEntry.updateOne(
        { user: user._id },
        {
          $set: {
            team: user.team,
            points: activity.points,
          },
        },
        { upsert: true },
      );
    }

    for (const workout of workoutSeeds) {
      await Workout.updateOne(
        { _id: new mongoose.Types.ObjectId(workout.id) },
        { $set: workout },
        { upsert: true },
      );
    }

    console.log(
      `Database seeding complete: ${seededUsers.length} users, 2 teams, ${activitySeeds.length} activities, ${activitySeeds.length} leaderboard entries, and ${workoutSeeds.length} workouts.`,
    );
  } finally {
    await mongoose.disconnect();
  }
}

seedDatabase().catch((error: unknown) => {
  console.error('Error seeding database:', error);
  process.exitCode = 1;
});
