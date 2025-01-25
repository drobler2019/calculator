export enum Operation {
    sum = "+",
    subtraction = "-",
    division = "/",
    multiplication = "x",
    point = "."
}

export const operations = (): Operation[] =>
    [Operation.sum, Operation.subtraction, Operation.division, Operation.multiplication];