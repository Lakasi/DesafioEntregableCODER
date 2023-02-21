import fs from "fs/promises"
import { randomUUID } from "crypto";

class ProductManager{
    constructor(path){
        this.content;
        this.path = path
    }

    async readProducts(){
        const jsonProducts = await fs.readFile(this.path, "utf-8")
        this.content = JSON.parse(jsonProducts)
        return this.content
    }

    async addProducts(title, description, price, thumbnail, stock){
        if(title !== undefined && description !== undefined && price !== undefined && thumbnail !== undefined && stock !== undefined){
            const product = {
                title : title,
                description : description,
                price : price,
                thumbnail : thumbnail,
                stock : stock,
                code : randomUUID()
            }

            this.content.push(product)
            const jsonProducts = JSON.stringify(this.content, null, 2)
            await fs.writeFile(this.path, jsonProducts)
        }
        else{
            console.log("Hay campos vacios")
        }
    }
    
    async getProductsById(id){
        const jsonProducts = await fs.readFile(this.path, "utf-8")
        this.content = JSON.parse(jsonProducts)

        const productsFind = this.content.find((product) => product.code === id)
        if(productsFind === undefined){
            console.log("Product not found")
        }
        else{
            return productsFind;
        }
    }
    
    getProducts(){
    console.log(this.content)
    }

    async deleteContent(){
        await fs.rm(this.content)
    }
}

const Products = new ProductManager("content/content.txt")

await Products.readProducts()
await Products.addProducts(
    "titulo prueba",
    "description prueba",
    250,
    "imagen",
    25
)
Products.getProducts()