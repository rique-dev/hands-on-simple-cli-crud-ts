import { expect } from 'chai'
import { Item } from './Item'


const item: Item = {
    id: 99,
    name: 'Henrique',
    power: 'Clean code',
}

describe('feature: Model', () => {

    it('id', () => {
        return expect(typeof item.id).to.be.eql('number');
    })

    it('name', () => {
        return expect(typeof item.name).to.be.eql('string');
    })

    it('power', () => {
        expect(typeof item.power).to.be.eql('string');
    })
})