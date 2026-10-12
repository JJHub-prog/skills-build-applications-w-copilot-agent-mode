import { Router } from 'express';
import Team from '../models/Team';

const router = Router();

router.get('/', async (_request, response) => {
  const teams = await Team.find().populate('members', '-passwordHash').lean();
  response.json(teams);
});

export default router;
