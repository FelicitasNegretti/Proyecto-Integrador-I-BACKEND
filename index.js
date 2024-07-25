const express = require("express")
const app = express()

const {connectToMongoDB, disconnectFromMongoDB} = require("./src/mongodb")

app.use(express.json())

app.use((req, res, next) => {
    res.header("Content-Type", "application/json; charset=utf-8")
    next()
})

app.get("/", (req, res) => {
    res.status(200).end("Bienvenido a la API del supermercado")
})


//OBTENER TODOS LOS PRODUCTOS
app.get('/supermercado', async (req, res) => {
    const client = await connectToMongoDB()
    if(!client){
        res.status(500).send("Error: no existe cliente")
        return
    }
    const db = client.db('sample_mflix')
    const supermercado = await db
    .collection('supermercado')
    .find()
    .toArray()
    console.log(supermercado)

    await disconnectFromMongoDB()

    res.json(supermercado)
})


//OBTENER UN PRODUCTO POR SU CODIGO
app.get('/supermercado/codigo/:codigo', async (req, res) => {
    const productoCodigo = parseInt(req.params.codigo) || 0
    const client = await connectToMongoDB()
    if(!client){
        res.status(500).send("Error: no existe cliente")
        return
    }
    const db = client.db('sample_mflix')
    const producto = await db
    .collection('supermercado')
    .findOne({ codigo: productoCodigo})
    console.log(producto)

    await disconnectFromMongoDB()

    !producto ? res.status(404).send("No existe un producto con ese código") : res.json(producto)
})


//FILTRAR PRODUCTOS SEGUN UN VALOR PARCIAL

app.get('/supermercado/nombre/:nombre', async (req, res) => {
    const productoNombre = req.params.nombre
    console.log(productoNombre)
    const client = await connectToMongoDB()
    if(!client){
        res.status(500).send("Error: no existe cliente")
        return
    }
    const db = client.db('sample_mflix')
    const productosFiltrados = await db
    .collection('supermercado')
    .find({nombre: { $regex: productoNombre, $options: "i"} })
    .toArray()
    console.log(productosFiltrados)

    await disconnectFromMongoDB()

    !productosFiltrados ? res.status(404).send("No existe un producto con ese nombre") : res.json(productosFiltrados)
})


//AGREGAR UN NUEVO PRODUCTO
app.post('/supermercado', async (req, res) => {
    const nuevoProducto = req.body
    
    nuevoProducto.codigo = Math.floor(Math.random() * 10000)

    if(Object.keys(nuevoProducto).length === 0) {
        res.status(422).send("Error en el formato de los datos")
    }

    const client = await connectToMongoDB()
    if(!client){
        res.status(500).send("Error: no existe cliente")
        return
    }
    const collection = client.db('sample_mflix').collection('supermercado')
    collection
    .insertOne(nuevoProducto)
    .then((response) => res.status(201).json(nuevoProducto))
    .catch((error) => res.status(500).send("Error al crear el nuevo producto"))
    .finally(async () => {
        await disconnectFromMongoDB()
    })

    //res.send("OK")
})


//MODIFICAR EL PRECIO DE UN PRODUCTO
app.patch('/supermercado/codigo/:codigo', async (req, res) => {
    const codigo = parseInt(req.params.codigo) || 0
    const nuevosDatos = req.body
    console.log(codigo, nuevosDatos)

     if(Object.keys(nuevosDatos).length === 0) {
        res.status(422).send("Error en el formato de los datos")
    }

    const client = await connectToMongoDB()
    if(!client){
        res.status(500).send("Error: no existe cliente")
        return
    }
    
    const collection = client.db('sample_mflix').collection('supermercado')
    collection
    .updateOne( {codigo}, {$set: nuevosDatos})
    .then((response) => res.status(200).json(nuevosDatos))
    .catch((error) => res.status(500).send("Error al actualizar el producto"))
    .finally(async () => {
        await disconnectFromMongoDB()
    })

    //res.send("OK")
})


//ELIMINAR UN PRODUCTO
app.delete('/supermercado/codigo/:codigo', async (req, res) => {
    const codigo = parseInt(req.params.codigo) || 0

     if(!req.params.codigo) {
        res.status(422).send("No existe un producto con ese código para eliminar")
        return
    }

    const client = await connectToMongoDB()
    if(!client){
        res.status(500).send("Error: no existe cliente")
        return
    }
    
    const collection = client.db('sample_mflix').collection('supermercado')
    collection
    .deleteOne( {codigo} )
    .then((response) => {
        //console.log(response)
        if(response.deletedCount === 0) {
            res.status(204).send(`No existe un producto con el código: ${codigo}`)
        } else {
            res.status(200).send("Producto eliminado")
        }  
    })
    .catch((error) => res.status(500).send("Error al eliminar el producto"))
    .finally(async () => {
        await disconnectFromMongoDB()
    })
})


const PORT = process.env.PORT || 3000


//Middleware para cuando ninguna ruta responde a la petición
app.use((req, res, next) => {
    res.status(404).json({ error: "Not Found"})
})

app.listen(PORT, () => console.log(`http://localhost:${PORT}`))
