import { readFile, writeFile, appendFile, existsSync, unlink } from 'fs'
import { promisify } from 'util'
import { to, not, equal } from '../util'
import { Item } from '../model/Item'


const readFileAsync = promisify(readFile)
const writeFileAsync = promisify(writeFile)
const appendFileAsync = promisify(appendFile)
const unlinkAsync = promisify(unlink)

const FILE_NAME = equal(process.env.NODE_ENV, 'test') ? 'db-test.json' : 'db.json'

const MESSAGE_ERROR = {
    CAN_NOT_CREATE: 'Can\'t create file',
    CAN_NOT_OPEN: 'Can\'t open file',
    CAN_NOT_SAVE: 'Can\'t save file',
}

const deleteDatabase = () => to(unlinkAsync(FILE_NAME))

const createDatabase = async () => await appendFileAsync(FILE_NAME, '[]')

const verifyExistFileIfNotCreate = async () =>
    not(existsSync(FILE_NAME))
        ? createDatabase()
        : true

const openDatabase = async (): Promise<Item[]> => {
    const [error] = await to(verifyExistFileIfNotCreate())

    if (error) {
        throw new Error(MESSAGE_ERROR.CAN_NOT_CREATE)
    }

    const ENCODED = 'utf8'
    const [err, dbEncoded] = await to(readFileAsync(FILE_NAME, ENCODED))

    if ((err || !dbEncoded)) {
        throw new Error(MESSAGE_ERROR.CAN_NOT_OPEN)
    }

    return JSON.parse(dbEncoded.toString())
}

const saveDatabase = async (items: Item[], itemToReturn: Item): Promise<Item> => {
    const [err] = await to(writeFileAsync(FILE_NAME, JSON.stringify(items)))

    if (err) {
        throw new Error(MESSAGE_ERROR.CAN_NOT_SAVE)
    }

    return itemToReturn
}

export {
    openDatabase,
    saveDatabase,
    deleteDatabase,
}