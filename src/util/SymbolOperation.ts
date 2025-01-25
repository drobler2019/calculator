export enum Operation {
    sum = '+',
    subtraction = '-',
    division = '/',
    multiplication = 'x',
    point = '.',
    reset = 'RESET',
    result = '=',
    deleteValue = 'DEL'
}

export const operations = (): Operation[] =>
    [Operation.sum, Operation.subtraction, Operation.division, Operation.multiplication];