const productService = require("../services/productService")

async function getProducts(req,res){
    try{
        let products = await productService.getProducts()
        return res.json(products)
    }catch(err){
        console.log(err)
        return res.status(500).json({message:"Something went wrong"})
    }
}

async function getProductById(req,res){
    try{
        const id = Number(req.params.id)
        let data = await productService.getProductById(id)

        if(!data){
            return res.status(404).json({message:"Product not found"})
        }

        return res.json(data)
    }catch(err){
        console.log(err)
        return res.status(500).json({message:"Something went wrong"})
    }
}

async function createProduct(req,res){
    try{
        console.log(req.body)
        const {name,price} = req.body
        let newItem = await productService.createProduct(name,price)
        return res.status(201).json(newItem)
    }catch(err){
        console.log(err)
        return res.status(500).json({message:"Something went wrong"})
    }
}

async function updateProduct(req,res){
    try{
        const id = Number(req.params.id)
        const {name,price} = req.body
        let data = await productService.updateProduct(id,name,price)

        if(!data){
            return res.status(404).json({message:"Product not found"})
        }

        return res.json(data)
    }catch(err){
        console.log(err)
        return res.status(500).json({message:"Something went wrong"})
    }
}

async function patchProduct(req,res){
    try{
        const id = Number(req.params.id)
        let data = await productService.patchProduct(id,req.body)

        if(!data){
            return res.status(404).json({message:"Product not found"})
        }

        return res.json(data)
    }catch(err){
        console.log(err)
        return res.status(500).json({message:"Something went wrong"})
    }
}

async function deleteProduct(req,res){
    try{
        const id = Number(req.params.id)
        let data = await productService.deleteProduct(id)

        if(!data){
            return res.status(404).json({message:"Product not found"})
        }

        return res.json(data)
    }catch(err){
        console.log(err)
        return res.status(500).json({message:"Something went wrong"})
    }
}

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    patchProduct,
    deleteProduct
}
