import { Router } from 'express';
import LeaderboardEntry from '../models/LeaderboardEntry';

const router = Router();

router.get('/', async (_request, response) => {
  const leaderboard = await LeaderboardEntry.find()
    .sort({ points: -1 })
    .populate('user', '-passwordHash')
    .populate('team')
    .lean();
  response.json(leaderboard);
});

export default router;
