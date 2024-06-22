const express = require("express")
const app = express()

const {connectToMongoDB, disconnectFromMongoDB} = require("./src/mongodb")

app.use((req, res, next) => {
    res.header("Content-Type", "application/json, charse=utf-8")
    next()
})

app.get("/", (req, res) => {
    res.status(200).end("Bienvenido a la API del supermercado")
})

app.get('/supermercado', async (req, res) => {
    const client = await connectToMongoDB()
    const db = client.db('sample_mflix')
    const supermercado = await db.collection('supermercado').find().toArray()
    //console.log(supermercado)

    await disconnectFromMongoDB()

    res.json(supermercado)
})

app.get("/hola", (req, res) => {
    res.send("En construccion")
})


const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.log(`http://localhost:${PORT}`))
