const express = require("express")
const cors = require("cors")

const studies = require("./data/studies")

const app = express()

app.use(cors())

app.get("/api/studies", (req, res) => {
    const { search, status, category, direction, page = 1, limit = 6 } = req.query

    let filteredStudies = studies

    if (search) {
        filteredStudies = filteredStudies.filter((study) =>
            study.title.toLowerCase().includes(search.toLowerCase()) ||
            study.platform.toLowerCase().includes(search.toLowerCase()) ||
            study.direction.toLowerCase().includes(search.toLowerCase()) ||
            study.status.toLowerCase().includes(search.toLowerCase()) ||
            study.category.some((item) =>
                item.toLowerCase().includes(search.toLowerCase())
            )
        )
    }

    if (status) {
        filteredStudies = filteredStudies.filter((study) =>
            study.status.toLowerCase() === status.toLocaleLowerCase()
        )
    }

    if (category) {
        filteredStudies = filteredStudies.filter((study) =>
            study.category.some((item) =>
                item.toLocaleLowerCase() === category.toLocaleLowerCase()
            )
        )
    }

    if (direction) {
        filteredStudies = filteredStudies.filter(
            (study) => study.direction.toLowerCase() === direction.toLowerCase()
        )
    }

    const startIndex = (page - 1) * limit
    const endIndex = page * limit
    const paginatedStudies = filteredStudies.slice(startIndex, endIndex)

    res.json({
        total: filteredStudies.length,
        page: Number(page),
        limit: Number(limit),
        results: paginatedStudies
    })
})

app.listen(3000, () => {
    console.log("Server running on port 3000")
})