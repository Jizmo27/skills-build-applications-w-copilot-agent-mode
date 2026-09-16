import mongoose from 'mongoose';
import Team from '../models/Team.js';
import User from '../models/User.js';
import Activity from '../models/Activity.js';
import Leaderboard from '../models/Leaderboard.js';
import Workout from '../models/Workout.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

// Seed the octofit_db database with test data
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);
    console.log('Connected to octofit_db');
    console.log('Seed the octofit_db database with test data');

    await Promise.all([
      Team.deleteMany({}),
      User.deleteMany({}),
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const [marvel, dc] = await Team.insertMany([
      { name: 'Team Marvel', description: 'Assemble and train like a hero.' },
      { name: 'Team DC', description: 'Justice through fitness.' },
    ]);

    const [ironman, hulk, wonderwoman, batman] = await User.insertMany([
      { name: 'Tony Stark', email: 'tony.stark@octofit.test', age: 45, team: marvel._id },
      { name: 'Bruce Banner', email: 'bruce.banner@octofit.test', age: 42, team: marvel._id },
      { name: 'Diana Prince', email: 'diana.prince@octofit.test', age: 30, team: dc._id },
      { name: 'Bruce Wayne', email: 'bruce.wayne@octofit.test', age: 38, team: dc._id },
    ]);

    await Activity.insertMany([
      { user: ironman._id, type: 'Running', durationMinutes: 30, caloriesBurned: 320, date: new Date('2026-09-01') },
      { user: hulk._id, type: 'Weightlifting', durationMinutes: 60, caloriesBurned: 450, date: new Date('2026-09-02') },
      { user: wonderwoman._id, type: 'Cycling', durationMinutes: 45, caloriesBurned: 400, date: new Date('2026-09-03') },
      { user: batman._id, type: 'Swimming', durationMinutes: 40, caloriesBurned: 380, date: new Date('2026-09-04') },
    ]);

    await Workout.insertMany([
      {
        name: 'Full Body Blast',
        description: 'A full-body circuit combining strength and cardio intervals.',
        category: 'Strength',
        difficulty: 'intermediate',
        durationMinutes: 45,
      },
      {
        name: '5K Endurance Run',
        description: 'Steady-pace run designed to build cardiovascular endurance.',
        category: 'Cardio',
        difficulty: 'beginner',
        durationMinutes: 30,
      },
      {
        name: 'Hero Core Challenge',
        description: 'High-intensity core workout for advanced athletes.',
        category: 'Core',
        difficulty: 'advanced',
        durationMinutes: 25,
      },
    ]);

    await Leaderboard.insertMany([
      { user: hulk._id, team: marvel._id, points: 950, rank: 1 },
      { user: wonderwoman._id, team: dc._id, points: 900, rank: 2 },
      { user: batman._id, team: dc._id, points: 860, rank: 3 },
      { user: ironman._id, team: marvel._id, points: 800, rank: 4 },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
