import express from 'express';
import './config/database.js';
import { PORT, API_BASE_URL } from './config/env.js';
import usersRouter from './routes/users.js';
import teamsRouter from './routes/teams.js';
import activitiesRouter from './routes/activities.js';
import leaderboardRouter from './routes/leaderboard.js';
import workoutsRouter from './routes/workouts.js';

const app = express();

app.use(express.json());

app.use('/api/users/', usersRouter);
app.use('/api/teams/', teamsRouter);
app.use('/api/activities/', activitiesRouter);
app.use('/api/leaderboard/', leaderboardRouter);
app.use('/api/workouts/', workoutsRouter);

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', service: 'octofit-tracker-api' });
});

app.listen(PORT, () => {
  console.log(`OctoFit Tracker API listening at ${API_BASE_URL}`);
});
