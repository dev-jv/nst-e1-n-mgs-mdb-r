import {
    Controller,
    HttpStatus,
    Get,
    Post,
    Put,
    Delete,
    Res,
    Body,
    Param,
    NotFoundException,
    Query
} from '@nestjs/common';
import { CreateProductDto } from './dto/product.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {

    constructor(private productService: ProductService) {}

    @Post('/create')
    async createPost(@Res() res, @Body() createProductDto: CreateProductDto) {
        const product = await this.productService.createProduct(createProductDto);
        console.log('--------------------------------------------------------------------------------------------');
        console.log(product);
        console.log('--------------------------------------------------------------------------------------------');
        return res.status(HttpStatus.OK).json({
            message: 'Product successfully created',
            product: product
        });
    }

    @Get('/')
    async getProducts(@Res() res) {
        const products = await this.productService.getProducts();
        console.log('--------------------------------------------------------------------------------------------');
        console.log(products);
        console.log('--------------------------------------------------------------------------------------------');
        return res.status(HttpStatus.OK).json(products);
    }

    @Get('/:id')
    async getProduct(@Res() res, @Param('id') productId) {
        const product = await this.productService.getProduct(productId);
        if (!product) throw new NotFoundException('Product does not exists');
        console.log('--------------------------------------------------------------------------------------------');
        console.log(product);
        console.log('--------------------------------------------------------------------------------------------');
        return res.status(HttpStatus.OK).json(product);
    }

    @Delete('/delete')
    async deleteProduct(@Res() res, @Query('id') productId) {
        const deletedProduct = await this.productService.deleteProduct(productId);
        if (!deletedProduct) throw new NotFoundException('Product does not exists')
        console.log('--------------------------------------------------------------------------------------------');
        console.log(deletedProduct);
        console.log('--------------------------------------------------------------------------------------------');
        return res.status(HttpStatus.OK).json({
            message: 'Product deleted successfully',
            deletedProduct
        });
    }

    @Put('/update')
    async updateProduct(@Res() res, @Query('id') productId, @Body() createProductDto: CreateProductDto) {
        const updateProduct = await this.productService.updateProduct(productId, createProductDto);
        if (!updateProduct) throw new NotFoundException('Product does not exists')
        console.log('--------------------------------------------------------------------------------------------');
        console.log(updateProduct);
        console.log('--------------------------------------------------------------------------------------------');
        return res.status(HttpStatus.OK).json({
            message: 'Product updated successfully',
            updateProduct
        });
    }
}
