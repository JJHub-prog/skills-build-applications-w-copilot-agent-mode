import { Router } from 'express';
import Activity from '../models/Activity';

const router = Router();

router.get('/', async (_request, response) => {
  const activities = await Activity.find()
    .sort({ date: -1 })
    .populate('user', '-passwordHash')
    .lean();
  response.json(activities);
});

export default router;
