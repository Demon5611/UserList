import express from 'express';
import { User } from '../../db/models';

const router = express.Router();

router.get('/all', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.error('Не получилось получить данные из БД', error);
    res.status(500).json({ error: 'Ошибка на сервере' });
  }
});

router.post('/create', async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const newUser = await User.create({
      name,
      email,
      phone,
    });
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Бэк :Ошибка при создании пользователя', error);
    res.status(500).json({ error: 'Ошибка на сервере' });
  }
});

router.delete('/:id', async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: 'Пользователь не найден' });
    }
    await user.destroy();

    res.status(204).end();
  } catch (error) {
    console.error('Бэк: Ошибка при удалении пользователя', error);
    res.status(500).json({ error: 'Ошибка на сервере' });
  }
});

router.patch('/edit/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log('id from request:', id);
    const { name, email, phone } = req.body;
    const [updatedRowCount, updatedUsers] = await User.update({
      name,
      email,
      phone,
    }, {
      where: {
        id,
      },
      returning: true,
    });
    if (updatedRowCount === 0) {
      return res.status(404).json({ error: 'Пользователь не найден' });
    }

    return res.json(updatedUsers[1][0]);
  } catch (err) {
    console.error('Бэк: Ошибка при обновлении пользователя', err);
    res.status(500).json({ err: 'Ошибка на сервере' });
  }
});

export default router;
