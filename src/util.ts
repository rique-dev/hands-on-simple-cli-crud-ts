// const to = <T = any>(promise: Promise<any>) => promise.then((data: T) => [null, data]).catch((err: Error) => [err])
const to = async <T>(promise: Promise<T>): Promise<[Error | undefined, T]> => {
    try {
        const result: T = await promise
        return [undefined, result]
    } catch (error) {
        return [error, undefined as any]
    }
}

const not = (value: any) => !value
const equal = (A: any, B: any) => A === B
export { to, not, equal }