import fs from 'fs/promises'

class ProductManager{
    constructor(path){
        this.path = path
        this.products = []
    }

    async readFile(){
        let json = await fs.readFile(this.path, 'utf-8')
        this.products = JSON.parse(json)
        return 
    }

    async writeFile(){
        let json = JSON.stringify(this.products, null, 2)
        await fs.writeFile(this.path, json)
        return
    }
    async getProducts(){
        await this.readFile()
        return console.log(this.products)
    }

    async addProduct(title, description, price, thumbnail, code, stock){
        this.readFile()
        let id = this.generateId()

        if(title && description && price && thumbnail && code && stock){
            const codeExist = this.products.some(p => p.code === code)
            if(codeExist){
                throw new Error("El producto con ese codigo ya existe")
            }
            else{
                this.products.push({title, description, price, thumbnail, code, stock, id: id})
                await this.writeFile()
            }
        }
        else{
            throw new Error("Faltan campos del producto")
        }
        
    }
    generateId(){
        return (this.products.length === 0 )? 1 : this.products[this.products.length - 1].id + 1;
    }
    async getProductById(id){
        await this.readFile()

        try{
            const findProduct = this.products.find(p => p.id === id)
            if(!findProduct){
                throw new Error(`El producto con ese id no existe ${id}`)
            }
            else{
                console.log("El producto encontrando es: ", findProduct)
            }
        }
        catch(error){
            console.log(`Error ${error.message}`)
        }

    }
    async updateProduct(id, data){
        await this.readFile()

        const indexId = this.products.findIndex(p => p.id === id)
        if(indexId != -1){
            this.products[indexId] = {
                ...this.products[indexId],
                ...data
            }
            await this.writeFile()
        }
        
        else{
            throw new Error("No existe elemento con ese id")
        }
    }
    async deleteProduct(id){
        await this.readFile()

        const indexId = this.products.findIndex(p => p.id === id)
        
        if(indexId != -1){
            this.products.splice(indexId, 1)
            await this.writeFile()
        }
        else{
            throw new Error("No existe elemento con ese id")
        }
    }
}

const producto = new ProductManager("./products.json")

// await producto.addProduct("product1", "description1", 350, "foto", "asdasd54", 35)
// await producto.addProduct("product2", "description2", 3550, "foto", "asdaaasd54", 35)
// await producto.addProduct("product3", "description3", 3540, "foto", "asddasd54", 35)
// await producto.deleteProduct(2)
// await producto.deleteProduct(3)
// producto.getProducts()




