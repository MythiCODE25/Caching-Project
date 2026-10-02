const { readData, writeData } = require("../database/productDatabase")

async function getProducts(){
    await new Promise((resolve) => {
        setTimeout(resolve,1500)
    })
    return await readData()
}

async function getProductById(id){
    let products = await getProducts()
    return products.find((item) => item.id === id)
}

async function createProduct(name,price){
    let products = await readData()
    let id = products.length ? Math.max(...products.map((item) => item.id)) + 1 : 1
    let newItem = {
        id,
        name,
        price
    }
    products.push(newItem)
    await writeData(products)
    return newItem
}

async function updateProduct(id,name,price){
    let products = await readData()
    let index = products.findIndex((item) => item.id === id)

    if(index === -1){
        return null
    }

    products[index] = {
        id,
        name,
        price
    }

    await writeData(products)
    return products[index]
}

async function patchProduct(id,data){
    let products = await readData()
    let index = products.findIndex((item) => item.id === id)

    if(index === -1){
        return null
    }

    products[index] = {
        ...products[index],
        ...data,
        id
    }

    await writeData(products)
    return products[index]
}

async function deleteProduct(id){
    let products = await readData()
    let index = products.findIndex((item) => item.id === id)

    if(index === -1){
        return null
    }

    let deletedProduct = products[index]
    products.splice(index,1)
    await writeData(products)
    return deletedProduct
}

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    patchProduct,
    deleteProduct
}
