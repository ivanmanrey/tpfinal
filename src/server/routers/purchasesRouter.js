import express from 'express'
import PurchasesApi from '../apis/purchasesApi.js'

function getPurchasesRouter(){
    const router = express.Router()

    const purchasesApi = new PurchasesApi()

    router.get('/', async (req, res) => {
        try {
            const queryParams = new Map(Object.entries(req.query))
            const purchases = await purchasesApi.get(queryParams)
            res.json(purchases)
        } catch (error) {
            res.status(error.status).json(error)
        }
    })

    router.get('/:id', async (req, res) => {
        try {
            const queryParams = new Map(Object.entries(req.query))
            const purchases = await purchasesApi.get(queryParams)
            res.json(purchases)
        } catch (error) {
            res.status(error.status).json(error)
        }
    })

    router.post('/', async (req, res) => {
        const purchase = req. body

        try {
            const newPurchase = await purchasesApi.add(purchase)
            res.status(201).json(newPurchase)
        } catch (error) {
            res.status(error.status).json(error)
        }
    })

    router.put('/:id', async (req, res) => {
        const purchase = req.body

        try {
            const updatedPurchase = await purchasesApi.update(req.params.id, purchase)
            res.status(201).json(updatedPurchase)
        } catch (error) {
            res.status(error.status).json(error)
        }
    })

    router.delete('/:id', async (req, res) => {
        try {
            await purchasesApi.deletePurchase(req.params.id)
            res.status(201)
        } catch (error) {
            res.status(error.status).json(error)
        }
    }
        )

    return router
}

export { getPurchasesRouter }