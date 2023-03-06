export interface IProduct{
id:number;
name?:string;
categoryId?: number;
price?: number;
image?: string;
cartId?: number;
quantity?: number;
totalPrice?: number
isProductInCart?: boolean
isProductMatchOrderSearch?: boolean
}