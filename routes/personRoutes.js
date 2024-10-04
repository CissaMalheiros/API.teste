const router = require('express').Router();
const Person = require('../models/Person');

router.post('/', async (req, res) => {
  const { name, salary, approved } = req.body;

  if (!name) {
    return res.status(422).json({ error: 'O nome é obrigatório!' });
  }

  const person = { name, salary, approved };

  try {
    await Person.create(person);
    return res.status(201).json({ message: 'Pessoa inserida no sistema com sucesso!' });
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao criar pessoa. '});
  }
});

router.get('/', async (req, res) => {
  try {
    const people = await Person.find();
    return res.status(200).json(people);
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao buscar pessoas. '});
  }
});

router.get('/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const person = await Person.findOne({ _id: id });

    if (!person) {
      return res.status(422).json({ message: 'O usuário não foi encontrado!' });
    }

    return res.status(200).json(person);
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao buscar o usuário. ' });
  }
});

router.patch('/:id', async (req, res) => {
  const id = req.params.id;
  const { name, salary, approved } = req.body;

  const person = { name, salary, approved };

  try {
    const updatedPerson = await Person.updateOne({ _id: id }, person);

    if (updatedPerson.matchedCount === 0) {
      return res.status(422).json({ message: 'O usuário não foi encontrado!' });
    }

    return res.status(200).json(person);
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao atualizar o usuário. '});
  }
});

router.delete('/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const person = await Person.findOne({ _id: id });

    if (!person) {
      return res.status(422).json({ message: 'O usuário não foi encontrado!' });
    }

    await Person.deleteOne({ _id: id });
    return res.status(200).json({ message: 'Usuário removido com sucesso!' });
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao remover o usuário. '});
  }
});

module.exports = router;
