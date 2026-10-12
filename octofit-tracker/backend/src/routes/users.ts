import { Router } from 'express';
import User from '../models/User';

const router = Router();

router.get('/', async (_request, response) => {
  const users = await User.find().select('-passwordHash').populate('team').lean();
  response.json(users);
});

export default router;
