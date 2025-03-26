import request from "supertest";
import app from "../index";
import { Sequelize } from "sequelize";

let sequelize: any;
let server: any;

beforeAll(async () => {
  sequelize = new Sequelize("sqlite::memory:", { logging: false });
  await sequelize.sync({ force: true }); // Limpa o banco antes dos testes

  app.set("sequelize", sequelize);
  server = app.listen(3000);
});

afterAll(async () => {
  await sequelize.close(); // Fecha conexão após os testes
  server.close();
});

describe.skip("Testes na API de usuários", () => {
  it("Deve criar um novo usuário", async () => {
    const res = await request(app).post("/users").send({
      name: "Teste User",
      email: "teste@example.com",
    });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.name).toBe("Teste User");
  });

  it("Deve buscar um usuário pelo nome", async () => {
    await request(app).post("/users").send({
      name: "Alice Johnson",
      email: "alice.j@example.com",
    });

    const res = await request(app).get("/users/search?name=Alice");

    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body[0].name).toContain("Alice");
  });

  it("Deve buscar um usuário pelo id", async () => {
    const user = (
      await request(app).post("/users").send({
        name: "Alice Johnson",
        email: "alice.j@example.com",
      })
    ).body;

    const res = await request(app).get("/users/" + user.id);
    expect(res.status).toBe(200);
    expect(res.body.name).toContain("Alice");
  });
});
