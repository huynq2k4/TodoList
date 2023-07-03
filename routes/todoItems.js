import { Router } from 'express';
import todoItems from '../models/todoItems';

import todoItemsModel from '../models/todoItems';

const router = Router();

//First route - add Todo Item to database
router.post('/api/item', async (req, res) => {
    try {
        const newItem = new todoItemsModel({
            item: req.body.item,
            date: req.body.date
        })

        const saveItem = await newItem.save()
        res.status(200).json(saveItem)
    }
    catch (err) {
        res.json(err);
    }
})

//Second route - get Todo Item from database
router.get('/api/items', async (req, res) => {
    try {
        const allTodoItems = await todoItemsModel.find({});
        res.status(200).json(allTodoItems);
    }
    catch (err) {
        res.json(err);
    }
})

//Third route - update Todo Item
router.put('/api/item/:id', async (req, res) => {
    try {
        const updateItem = await todoItemsModel.findByIdAndUpdate(req.params.id, { $set: req.body });
        res.status(200).json('Item Updated');
    }
    catch (err) {
        res.json(err);
    }
})

//Fourth route - delete Todo Item
router.delete('/api/item/:id', async (req, res) => {
    try {
        const deleteItem = await todoItemsModel.findByIdAndDelete(req.params.id);
        res.status(200).json('Item Deleted');
    }
    catch (err) {
        res.json(err);
    }
})

export default router;