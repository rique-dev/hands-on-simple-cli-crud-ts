import { find, create, update, remove, MESSAGE_ERROR } from '../controller/itemController'
import { to } from '../util'
import { createItemMock } from '../model/Item'
import * as commander from 'commander'

  ; (async () => {
    commander
      .version('v1')
      .option('-c, --create', 'create item')
      .option('-l, --list', 'list all item')
      .option('-r, --read [value]', 'read item by id')
      .option('-u, --update [value]', 'update item by id')
      .option('-d, --delete [value]', 'delete item by id')
      .parse(process.argv)

    if (commander.create) {
      const [err, item] = await to(create(createItemMock()))

      console.log(
        err ? err : `id: ${item.id}`
      )

      return
    }

    if (commander.list) {
      const [err, items] = await to(find(0))

      console.log(
        err ? err : items
      )
      return
    }

    if (commander.read) {
      const id = Number(commander.read)
      const [err, items] = await to(find(id))

      console.log(
        err ? err : items
      )

      return
    }

    if (commander.update) {
      const id = Number(commander.update)
      const [err, item] = await to(update({
        id,
        name: 'item updated',
        power: 'item updated',
      }))

      console.log(
        err ? err : item
      )

      return
    }

    if (commander.delete) {
      const id = Number(commander.delete)

      const [err, item] = await to(remove({ ...createItemMock(), id }))

      console.log(
        err ? err : item
      )

      return
    }
  })()
