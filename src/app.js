import aRouter from "./routes/authRoute.js"
import express from "express"

const app = express()

app.use(express.json())
app.use("/auth", aRouter)

export default app