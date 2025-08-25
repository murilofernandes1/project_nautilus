import express from "express";
import publicRoutes from "../routes/public.js";

const app = express();
app.use(express.json());

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});

app.use("/", publicRoutes);

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
