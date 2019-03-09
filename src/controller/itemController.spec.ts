import { expect } from 'chai'
import { find, create, update, remove, MESSAGE_ERROR } from './itemController'
import { to } from '../util'
import { Item, createItemMock } from '../model/Item'
import { deleteDatabase } from '../provider/dbConnect'

const DEFAULT_ITEM = createItemMock()

describe('feature: CRUD with local file json', () => {
    context('scenario: success', () => {
        describe('CREATE', () => {

            it('can be initialized without database', async () => {
                await deleteDatabase()

                const expected = DEFAULT_ITEM
                const [err, recived] = await to(create(expected))

                return expect(recived).to.be.equal(expected)
            })

            it('can be created a new item', async () => {
                const expected = createItemMock()

                const [err, recived] = await to(create(expected))

                return expect(expected).to.be.eql(recived)
            })
        })

        describe('READ', () => {

            it('can be finded an item by id', async () => {
                const expected = DEFAULT_ITEM
                const [err, itemsFinded] = await to(find(DEFAULT_ITEM.id))
                const [recived] = itemsFinded

                return expect(expected).to.be.eql(recived)
            })

            it('can be finded all items', async () => {
                const expected = 2
                const [err, reciveds] = await to(find(0))

                return expect(reciveds.length).to.be.eql(expected)
            })
        })

        describe('UPDATE', () => {
            it('can be updated an item by id', async () => {
                const expected: Item = {
                    ...DEFAULT_ITEM,
                    power: 'programerMan',
                }

                const [err, recived] = await to(update(expected))

                return expect(expected).to.be.eql(recived)
            })
        })

        describe('DELETE', () => {
            it('can be deleted an item by id', async () => {
                const expected = createItemMock()

                await create(expected)

                const [err, recived] = await to(remove(expected))

                return expect(expected).to.be.eql(recived)
            })
        })

    })

    context('scenario: erro', () => {
        describe('CREATE', () => {
            it('can\'t be saved with same id', async () => {
                const [err] = await to(create(DEFAULT_ITEM))
                return expect(err).to.be.an('error', MESSAGE_ERROR.ITEM_EXIST)
            })
        })

        describe('UPDATE', () => {
            it('can\'t be updated if not exist', async () => {
                const [err] = await to(update(createItemMock()))
                return expect(err).to.be.an('error', MESSAGE_ERROR.ITEM_NOT_FOUND)
            })
        })

        describe('DELETE', () => {
            it('can\'t be removed if not exist', async () => {
                const [err] = await to(remove(createItemMock()))
                return expect(err).to.be.an('error', MESSAGE_ERROR.ITEM_NOT_FOUND)
            })
        })
    })
})
