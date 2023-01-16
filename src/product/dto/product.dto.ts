export class CreateProductDto {
    readonly name: string;
    readonly description: string;
    readonly imageUrl: string;
    readonly price: string;
    readonly createdAt: Date;
}
