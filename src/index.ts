import express from "express";
import sequelize from "./config/database";
import User from "./models/User";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = process.env.PORT ?? "3000";

app.use(express.json());

if (require.main === module) {
  sequelize
    .sync()
    .then(() => {
      console.log("Banco de dados conectado e tabelas sincronizadas!");
    })
    .catch((err) => {
      console.error("Erro ao conectar ao banco de dados:", err);
    });
}
app.get("/", (req, res) => {
  res.send("Hello, TypeScript with Express!");
});

// Rota para listar usuários
app.get("/users", async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

// Rota para criar um usuário
app.post("/users", async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = await User.create({ name, email });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar usuário" });
  }
});

// Rota para editar um usuário
app.put("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    user.name = name || user.name;
    user.email = email || user.email;
    await user.save();

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar usuário" });
  }
});

app.delete("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    await user.destroy();
    res.json({ message: "Usuário deletado com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar usuário" });
  }
});

// Rota para buscar um usuário pelo id
app.get("/users/:id", async (req, res) => {
  /**
   * TODO: Implementar a função que retorna o usuário pelo ID
   */
  res.status(501).send("Not Implemented");
});

app.get("/users/search", async (req, res) => {
  /**
   * TODO: Implementar a função que busca o usuário pelo nome
   */
  res.status(501).send("Not Implemented");
});

app.get("/fibonacci/:n", async (req, res) => {
  /**
   * TODO: Implementar uma função que retorne o n-ésimo número na sequência de fibbonacci (Considere que a sequencia começa com [0, 1])
   * Deve ser capaz de calcular a sequencia até n = 1000
   *
   * retorne um objeto: {result: valor}
   */
  // res.status(501).send("Not Implemented");
});

/**
 * TODO: Implementar o model de posts, as rotas de CRUD e uma rota para pegar todos os posts de um usuário
 * O model deve conter: id, user_id, title, body
 */

if (require.main === module) {
  const server = app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

export default app;
