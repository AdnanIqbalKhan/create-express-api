const getAll = async (req, res, typeName, Model) => {

    try {
        const data = await Model.find({})
        res.status(200).send({ 'message': `All ${typeName} List`, data: data })
    } catch (error) {
        res.status(500).send({ 'message': error })
    }
}

const get = async (req, res, typeName, Model) => {
    try {
        const model = await Model.findById(req.params.id)
        if (!model) {
            res.status(404).send({ 'message': `Incorrect Id, ${typeName} not found` })
        } else {
            res.status(200).send({ 'message': 'Retrieve Successfully', data: model })
        }
    } catch (error) {
        res.status(500).send({ 'message': error })
    }
}

const create = async (req, res, typeName, Model) => {
    const model = new Model(req.body)
    try {
        await model.save()
        res.status(200).send({ 'message': 'Created Successfully', data: model })
    } catch (error) {
        res.status(500).send({ 'message': error })
    }
}

const update = async (req, res, typeName, Model) => {
    try {
        const model = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true })
        if (!model) {
            res.status(404).send({ 'message': `Incorrect Id, ${typeName} not found` })
        } else {
            res.status(200).send({ 'message': 'Updated Successfully', data: model })
        }
    } catch (error) {
        res.status(500).send({ 'message': error })
    }
}

const remove = async (req, res, typeName, Model) => {
    try {
        const model = await Model.findByIdAndDelete(req.params.id)
        if (!model) {
            res.status(404).send({ 'message': `Incorrect Id, ${typeName} not found` })
        } else {
            res.status(200).send({ 'message': 'Deleted Successfully' })
        }
    } catch (error) {
        res.status(500).send({ 'message': error })
    }
}

export default {
    get, getAll, create, update, remove
}