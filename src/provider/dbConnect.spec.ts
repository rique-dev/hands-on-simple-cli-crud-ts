import { expect } from 'chai'
import { to } from '../util'
import { openDatabase, saveDatabase, deleteDatabase } from './dbConnect'
import { Item, createItemMock } from '../model/Item'

describe('feature: Database JSON', () => {
    it('open', async () => {
        await deleteDatabase()
        const [err, recived] = await to(openDatabase())
        const expected: Item[] = []
        return expect(expected).to.be.eql(recived)
    })

    it('save', async () => {
        const expected = createItemMock()
        const [err, recived] = await to(saveDatabase([expected], expected))

        const [error, allItems] = await to(openDatabase())
        const [recived2] = allItems

        return expect(recived).to.be.eql(recived2).and.be.eql(expected)
    })
})