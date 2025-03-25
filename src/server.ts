import express from "express";
import colors from "colors";
import morgan from "morgan";
import { createServer } from "http";
import { Server as SocketIOServer } from "socket.io";
import { db } from "./config/db";
import listRouter from "./routes/ListRouter";

export async function connectBD() {
  try {
    await db.authenticate();
    db.sync();
    console.log(colors.magenta.bold("Connect successfully a DB"));
  } catch (error) {
    console.log(colors.red.bold("Error al conectar a la DB"));
  }
}

connectBD();

const app = express();
const server = createServer(app);
const io = new SocketIOServer(server);

io.on("connection", (socket) => {
  console.log(colors.green.bold(`🟢 Nuevo cliente conectado: ${socket.id}`));

  socket.on("disconnect", () => {
    console.log(colors.red.bold(`🔴 Cliente desconectado: ${socket.id}`));
  });
});

app.use(morgan("dev"));
app.use(express.json());

app.use("/api/lists", listRouter);

export { app, server, io };
