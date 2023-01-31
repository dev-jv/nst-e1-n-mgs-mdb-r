import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './interfaces/product.interface';
import { CreateProductDto } from './dto/product.dto';

@Injectable()
export class ProductService {

    constructor(@InjectModel('Product') private readonly productModel: Model<Product>) {}

    async getProducts(): Promise<Product[]> {
        return this.productModel.find();
    }

    async createProduct(createProductDto: CreateProductDto): Promise<Product> {
        const product = new this.productModel(createProductDto);
        return await product.save();
    }

    async getProduct(productId): Promise<Product> {
        return this.productModel.findById(productId);
    }

    async deleteProduct(productId): Promise<Product> {
        return this.productModel.findByIdAndDelete(productId);
    }

    async updateProduct(productId, createProductDto: CreateProductDto): Promise<Product> {
        return this.productModel.findByIdAndUpdate(productId, createProductDto, {new: true});
    }
}
