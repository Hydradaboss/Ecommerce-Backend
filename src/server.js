import http from "http";
import app from "./app.js";
const server = http.createServer(app);

try {
  server.listen(process.env.PORT, () => {
    console.log(`started on port ${process.env.PORT}`);
  });
} catch (error) {
  console.log(error);
}