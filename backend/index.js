const express = require('express');

require('dotenv').config()
const {PrismaClient} = require("@prisma/client");


const cors = require('cors')

const prisma = new PrismaClient()
const app = express()
app.use(cors())

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})

app.use(express.json());


app.get('/boards/:id/comments', async (req, res) => {
    const { id } = req.params;

    const card = await prisma.card.findUnique({ where: { id: parseInt(id) } });
    if (!card) {
      return res.status(404).send({ error: 'Card not found' });
    }
    const cards = await prisma.comment.findMany({ where: { cardId: card.id } });
    return res.json(cards);
  });

app.get('/boards/:id/cards', async (req, res) => {
    const { id } = req.params;

    const board = await prisma.board.findUnique({ where: { id: parseInt(id) } });
    if (!board) {
      return res.status(404).send({ error: 'Board not found' });
    }
    const cards = await prisma.card.findMany({ where: { boardId: board.id } });
    return res.json(cards);
  });

app.get('/boards', async (req, res) => {
    const boards = await prisma.board.findMany()
    res.json(boards)
  })

  app.post('/boards/:id/comments', async (req, res) => {
    const { id } = req.params;

    const { content } = req.body
    const newComment = await prisma.comment.create({
      data: {
        content,
        cardId: parseInt(id)
      }
    })
    res.json(newComment)
  })


  app.post('/boards/:id/cards', async (req, res) => {
    const { id } = req.params;
    const { title, description, gif, likes } = req.body;
  
    // Find the board with the specified ID
    const board = await prisma.board.findUnique({ where: { id: parseInt(id) } });
  
    if (!board) {
      return res.status(404).json({ error: 'Board not found' });
    }
  
    // Create a new card and add it to the board's cards array
    const newCard = await prisma.card.create({
      data: {
        title,
        description,
        gif,
        likes,
        boardId: board.id
      }
    });
  
    res.json(newCard);
  });

  app.post('/boards', async (req, res) => {
    const { title, type, creator } = req.body
    const newBoard = await prisma.board.create({
      data: {
        title,
        type,
        creator
      }
    })
    res.json(newBoard)
  })


  app.put('/cards/:id', async (req, res) => {
    const { id } = req.params
    const {title, description, gif, likes  } = req.body
    const updatedCard = await prisma.card.update({
      where: { id: parseInt(id) },
      data: {
        title,
        description,
        gif,
        likes
      }
    })
    res.json(updatedCard)
  })


  app.put('/boards/:id', async (req, res) => {
    const { id } = req.params
    const { title, type, creator } = req.body
    const updatedBoard = await prisma.board.updateMany({
      where: { id: parseInt(id) },
      data: {
        title,
        type,
        creator
      }
    })
    res.json(updatedBoard)
  })

  app.delete('/comments/:id', async (req, res) => {
    const { id } = req.params
    const deletedComment = await prisma.comment.deleteMany({
        where: { id: parseInt(id) }      })
    res.json(deletedComment)
  })

  app.delete('/boards/:id', async (req, res) => {
    const { id } = req.params
    const deletedBoard = await prisma.board.deleteMany({
        where: { id: parseInt(id) }      })
    res.json(deletedBoard)
  })

  app.delete('/cards/:id', async (req, res) => {
    const { id } = req.params
    const deletedCard = await prisma.card.deleteMany({
        where: { id: parseInt(id) }      })
    res.json(deletedCard)
  })


  