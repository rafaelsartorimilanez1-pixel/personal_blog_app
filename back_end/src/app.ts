import express from 'express'
import cors from 'cors'

import postRoutes from "./routes/postRoutes"
import userRoutes from "./routes/userRoutes"
import commentRoutes from "./routes/commentRoutes"

const app = express();

app.use(express.json())
app.use(cors())

app.use(commentRoutes)
app.use(userRoutes)
app.use(postRoutes)

export default app