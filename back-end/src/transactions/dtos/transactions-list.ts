export class TransactionsListDto {
    constructor(
        readonly id: number,
        readonly description: string,
        readonly price: number,
        readonly category: string,
        readonly type: string,
    ) { }
}
