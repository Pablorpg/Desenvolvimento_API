import { Sequelize } from "sequelize";
                            //banco    //user  //senha
// export const conn = new Sequelize("tarefas3G", "root", "root", {
//   host: "localhost",
//   dialect: "mysql",
//   port: "3306",
// });

export const conn = new Sequelize({
  dialect: 'sqlite',
  storage: './dev.sqlite'
});

// try {
//   await conn.authenticate();
//   console.log("Connection has been established successfully.");
// } catch (error) {
//   console.error("Unable to connect to the database:", error);
// }

// export default conn;