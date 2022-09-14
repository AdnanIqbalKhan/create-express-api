import { Request, Response } from 'express'
import { Model } from 'mongoose'

interface ResBody {
    message: string | unknown
    data?: [] | {}
}
const formatError = (error: unknown): string => {
    return (error instanceof Error) ? error.message : String(error)
}

async function getAll<T>(req: Request, res: Response<ResBody>, typeName: string, Model: Model<T>) {
    try {
        const data = await Model.find({})
        res.status(200).send({ message: `All ${typeName} List`, data: data })
    } catch (error) {
        res.status(500).send({ message: formatError(error) })
    }
}


async function get<T>(req: Request<{ id: string }>, res: Response<ResBody>, typeName: string, Model: Model<T>) {
    try {
        const model = await Model.findById(req.params.id)
        if (!model) {
            res.status(404).send({ message: `Incorrect Id, ${typeName} not found` })
        } else {
            res.status(200).send({ message: 'Retrieve Successfully', data: model })
        }
    } catch (error) {
        res.status(500).send({ message: formatError(error) })
    }
}


async function create<T>(req: Request<any, any, T>, res: Response<ResBody>, typeName: string, Model: Model<T>) {
    const model = new Model(req.body)
    try {
        await model.save()
        res.status(200).send({ message: `${typeName} created Successfully`, data: model })
    } catch (error) {
        res.status(500).send({ message: formatError(error) })
    }
}


async function update<T>(req: Request<{ id: string }>, res: Response<ResBody>, typeName: string, Model: Model<T>) {
    try {
        const model = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true })
        if (!model) {
            res.status(404).send({ message: `Incorrect Id, ${typeName} not found` })
        } else {
            res.status(200).send({ message: 'Updated Successfully', data: model })
        }
    } catch (error) {
        res.status(500).send({ message: formatError(error) })
    }
}


async function remove<T>(req: Request<{ id: string }>, res: Response<ResBody>, typeName: string, Model: Model<T>) {
    try {
        const model = await Model.findByIdAndDelete(req.params.id)
        if (!model) {
            res.status(404).send({ message: `Incorrect Id, ${typeName} not found` })
        } else {
            res.status(200).send({ message: 'Deleted Successfully' })
        }
    } catch (error) {
        res.status(500).send({ message: formatError(error) })
    }
}

export = {
    get, getAll, create, update, remove
}