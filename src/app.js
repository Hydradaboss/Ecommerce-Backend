import aRouter from "./routes/authRoute.js"
import express from "express"
import pRouter from "./routes/productRoute.js"

const app = express()

app.use(express.json())
app.use("/auth", aRouter)
app.use("/product", pRouter)

export default app