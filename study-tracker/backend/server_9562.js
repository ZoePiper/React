const express = require("express")
const cors = require("cors")
const studiesRoutes = require("./routes/studies.routes")

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/studies", studiesRoutes)

app.listen(3000, () => {
    console.log("Server running on port 3000")
})