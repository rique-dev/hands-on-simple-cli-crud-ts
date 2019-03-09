export type Item = {
    id: number;
    name: string;
    power: string;
}

export const createItemMock = (): Item => {
    const id = new Date().getTime()

    return {
        id,
        name: `name ${id}`,
        power: `power ${id}`,
    }
}
