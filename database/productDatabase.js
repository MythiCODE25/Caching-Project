const fs = require("fs/promises")
const path = require("path")

const filePath = path.join(__dirname,"db.json")

async function readData(){
    let data = await fs.readFile(filePath,"utf-8")
    return JSON.parse(data)
}

async function writeData(products){
    await fs.writeFile(filePath,JSON.stringify(products,null,2),"utf-8")
}

module.exports = {
    readData,
    writeData
}
