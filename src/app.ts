import app from "./app";

const PORT = Number(process.env.PORT) || 3000;

const server = app.listen(PORT, "127.0.0.1", () => {
  console.log(`Server is running on http://127.0.0.1:${PORT}`);
});

server.on("error", (err) => {
  console.error("Server error:", err);
});