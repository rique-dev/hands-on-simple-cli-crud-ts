import { openDatabase, saveDatabase } from '../provider/dbConnect'
import { Item } from '../model/Item'
import { not, equal } from '../util'

const INDEX_NOT_EXIST = -1
const MESSAGE_ERROR = {
    ITEM_NOT_FOUND: 'Item not exist',
    ITEM_EXIST: 'Item exist',
}

const throwError = (message: string) => { throw new Error(message) }
const getIndex = (arr: Item[], item: Item) => arr.findIndex(e => equal(e.id, item.id))

const updateItemInArray = (item: Item, items: Item[]) =>
    equal(getIndex(items, item), INDEX_NOT_EXIST)
        ? throwError(MESSAGE_ERROR.ITEM_NOT_FOUND)
        : items.map(
            _item => equal(_item.id, item.id) ? { ..._item, ...item } : _item
        )

const removeItemInArray = (item: Item, items: Item[]): Item[] =>
    equal(getIndex(items, item), INDEX_NOT_EXIST)
        ? throwError(MESSAGE_ERROR.ITEM_NOT_FOUND)
        : items.filter(_item => not(equal(_item, item)))

const createItemInArray = (item: Item, items: Item[]): Item[] =>
    not(equal(getIndex(items, item), INDEX_NOT_EXIST))
        ? throwError(MESSAGE_ERROR.ITEM_EXIST)
        : [
            ...items,
            item,
        ]

const find = async (id: number): Promise<Item[]> =>
    (await openDatabase())
        .filter(item => (id ? equal(item.id, id) : true))

type OperationType = (item: Item, items: Item[]) => Item[]
const genericOperation = (operation: OperationType) =>
    async (item: Item): Promise<Item> =>
        await saveDatabase(
            operation(
                item,
                (await openDatabase())
            ),
            item,
        )

const create = genericOperation(createItemInArray)
const remove = genericOperation(removeItemInArray)
const update = genericOperation(updateItemInArray)

export {
    find,
    update,
    remove,
    create,
    MESSAGE_ERROR,
}