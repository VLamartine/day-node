import sequelize from "../config/database";
import User from "../models/User";

const seedUsers = async () => {
  try {
    await sequelize.sync({ force: true }); // Apaga e recria as tabelas
    console.log("Banco de dados resetado!");

    const users = [
      { name: "Alice Johnson", email: "alice.johnson@example.com" },
      { name: "Alice Smith", email: "alice.smith@example.com" },
      { name: "Alice Brown", email: "alice.brown@example.com" },
      { name: "Bob Johnson", email: "bob.johnson@example.com" },
      { name: "Bob Williams", email: "bob.williams@example.com" },
      { name: "Charlie Brown", email: "charlie.brown@example.com" },
      { name: "Charlie Davis", email: "charlie.davis@example.com" },
      { name: "Charlie Wilson", email: "charlie.wilson@example.com" },
      { name: "Daniel Miller", email: "daniel.miller@example.com" },
      { name: "Daniel Lee", email: "daniel.lee@example.com" },
      { name: "Eve Davis", email: "eve.davis@example.com" },
      { name: "Eve White", email: "eve.white@example.com" },
      { name: "Eve Adams", email: "eve.adams@example.com" },
      { name: "Frank Miller", email: "frank.miller@example.com" },
      { name: "Frank Smith", email: "frank.smith@example.com" },
      { name: "Grace Johnson", email: "grace.johnson@example.com" },
      { name: "Grace White", email: "grace.white@example.com" },
      { name: "Hannah Wilson", email: "hannah.wilson@example.com" },
      { name: "Hannah Lee", email: "hannah.lee@example.com" },
      { name: "Isaac Adams", email: "isaac.adams@example.com" },
    ];

    await User.bulkCreate(users);
    console.log("Usuários inseridos com sucesso!");
  } catch (error) {
    console.error("Erro ao inserir usuários:", error);
  } finally {
    process.exit();
  }
};

seedUsers();
