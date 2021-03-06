import fs from 'fs';
import path from 'path';

import ProductUpdate from '../src/server/features/products/ProductUpdate.js';
import ProductsDAOFactory from '../src/server/data/product/daoFactory.js';
import ProductGet from '../src/server/features/products/ProductGet.js'
import ProductValidator from '../src/server/validators/ProductValidator.js';
import ImageUploader from '../src/server/uploaders/ImageUploader.js';
import ProductAdd from '../src/server/features/products/ProductAdd.js';
import { v4 as uuidv4 } from 'uuid';

export function addProduct() {
  const randomId = uuidv4()
  console.log(randomId)
  const img = fs.createReadStream(path.resolve() + "/test/files/13.png")
  
  const product = {
    id: randomId,
    name: "Postre Balcarce",
    image: img,
    price: 40,
    bizcocho: {
            vainilla: false,
            chocolate: false
        },
        peso_gr: 1500,
        capas : 2,
        relleno : {
            ddl : true,
            nutella : false,
            crema : false,
            merengue: false,
            frutos_secos: false,
            frutas : false
        },
        cubierta: {
            chocolate: true,
            crema_chantilly: false,
            fondant: false,
            merengue: false
        }
  }
    

  const dao = ProductsDAOFactory.getDao()
  const validator = new ProductValidator()
  const uploader = new ImageUploader()
  const add = new ProductAdd(dao, validator, uploader)
  add.run(product)
    .then(() => console.log("Producto agregado"))
    .catch(e => console.log(e))
}

export function updateProduct() {
  const product = {
    id:0,
    name: "Tora de Update",
    price: 40,
    bizcocho: {
            vainilla: false,
            chocolate: false
        },
        peso_gr: 1500,
        capas : 2,
        relleno : {
            ddl : true,
            nutella : false,
            crema : false,
            merengue: false,
            frutos_secos: false,
            frutas : false
        },
        cubierta: {
            chocolate: true,
            crema_chantilly: false,
            fondant: false,
            merengue: false
        }
  }

  const dao = ProductsDAOFactory.getDao()
  const validator = new ProductValidator()
  const uploader = new ImageUploader()
  const update = new ProductUpdate(dao, validator, uploader)
  update.run(product)
    .then(() => console.log("Producto modificado"))
    .catch(e => console.log(e))
}

export function getAllProducts() {
  const dao = ProductsDAOFactory.getDao()
  const getAll = new ProductGet(dao)
  let queryParams = new Map()
  //queryParams.set("id",1)

  getAll.run(queryParams)
    //.then((result) => console.log(`Listado de productos: + ${JSON.stringify(result)}`))
    .catch(error => console.log(error))
}