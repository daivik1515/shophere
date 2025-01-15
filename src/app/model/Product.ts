export interface APIResponse
{
    message:string,
    result:boolean,
    data: any
}

  
export interface ProductData {
    _id: string
    productSku: string
    productName: string
    productPrice: number
    productShortName: string
    productDescription: string
    createdDate: string
    deliveryTimeSpan: string
    categoryId: number
    productImageUrl: string
    categoryName: string
  }
  
export class Customer
  {
    _id:string
    name:string
    mobileNo:string
    password:string
    constructor()
    {
        this._id='';
        this.name="";
        this.mobileNo="";
        this.password="";
    }
  }

  export class LoginCustomer
  {
    
    name:string
    password:string
    constructor()
    {
        this.name="";
        this.password="";
    }
  }

  export class cart 
  {
    cartId:number
    custId:string
    productId:string
    quantity:number
    constructor()
    {
      this.cartId=0;
      this.custId='';
      this.productId='';
      this.quantity=1;
    }
  }