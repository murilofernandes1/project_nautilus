import express from "express";
import pkg from "@prisma/client";
const { PrismaClient } = pkg;
const router = express.Router();
const prisma = new PrismaClient();

router.get("/listar-usuarios", async (req, res) => {
  try {
    const users = await prisma.user.findMany({ omit: { password: true } }); //ele omite a senha, nao informando a senha junto do user
    res.status(200).json({ message: "Usuários listados com sucesso:", users });
  } catch (error) {
    res.status(500).json({ message: "Falha no servidor" });
  }
});

router.post("/posts", async (req, res) => {
  try {
    const { content, published, authorId } = req.body;

    const post = await prisma.post.create({
      data: {
        content,
        published,
        author: {
          connect: { id: authorId },
        },
      },
    });

    res.status(200).json({ message: "Post adicionado com sucesso", post });
  } catch (error) {
    res.status(500).json({ message: "Erro ao postar", error: error.message });
  }
});

router.get("/posts", async (req, res) => {
  try {
    const allPosts = await prisma.post.findMany();
    res.status(200).json(allPosts);
  } catch (error) {
    res.status(500).json({ message: "Erro ao mostrar os posts" });
  }
});

export default router;
