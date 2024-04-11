import express from 'express';
import bcrypt from 'bcrypt';
import cors from 'cors';

import { User, Link } from './db/models.js';
import generateShortLink from './utils/generateShortLink.js';

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());

app.post('/sign_in', async (request, response) => {
  const { username, password } = request.body;

  const user = await User.findOne({ where: { username } });
  if (user) {
    const hash = user.password;
    if (bcrypt.compareSync(password, hash) === true)
      response.send(user).status(200);
    else response.sendStatus(401);
  } else response.sendStatus(404);
});

app.post('/sign_up', async (request, response) => {
  const { username, password } = request.body;
  const hash = bcrypt.hashSync(password, 10);

  try {
    const newUser = await User.create({ username, password: hash });
    response.send(newUser).status(201);
  } catch (error) {
    response.sendStatus(403);
  }
});

app.post('/is_available/', async (request, response) => {
  const { username } = request.body;
  const user = await User.findOne({ where: { username } });
  if (user) response.send(false);
  else response.send(true);
});

app.post('/get_user', async (request, response) => {
  const { userId } = request.body;
  const user = await User.findByPk(userId);

  if (user) response.send(user).status(200);
  else response.sendStatus(404);
});

app.post('/', async (request, response) => {
  const { longUrl } = request.body;
  const shortUrl = generateShortLink();

  const link = await Link.create({ longUrl, shortUrl });
  if (link) response.send(link).status(204);
  else response.sendStatus(500);
});

app.post('/:userId', async (request, response) => {
  const { userId } = request.params;
  const { longUrl } = request.body;
  const shortUrl = generateShortLink();
  const user = await User.findByPk(userId);
  const link = await Link.create({ longUrl, shortUrl, userId });

  if (link) {
    response.send(link).status(204);
  } else response.sendStatus(500);
});

app.get('/:shortUrl', async (request, response) => {
  console.log(request.params);
  const { shortUrl } = request.params;
  const link = await Link.findOne({ where: { shortUrl } });

  if (link) {
    const { linkId, clicks, longUrl } = link;

    link.increment('clicks');
    response.redirect(`http://localhost:5173/${longUrl}`);
  } else response.sendStatus(404);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
