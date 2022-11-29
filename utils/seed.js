const connection = require('../config/connection');
const { Thought, User } = require('../models');
const { getRandomUsername, getRandomThoughts } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');

  await Thought.deleteMany({});

  await User.deleteMany({});

  const users = [];

  for (let i = 0; i < 20; i++) {
    const assignments = getRandomThoughts(20);

    const fullName = getRandomUsername();
    const first = fullName.split(' ')[0];
    const last = fullName.split(' ')[1];
    const github = `${first}${Math.floor(Math.random() * (99 - 18 + 1) + 18)}`;

    users.push({
      first,
      last,
      github,
      assignments,
    });
  }

  await User.collection.insertMany(users);

  await Thought.collection.insertOne({
    thoughtName: 'I feel great!',
    inPerson: false,
    users: [...users],
  });

  console.table(users);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});