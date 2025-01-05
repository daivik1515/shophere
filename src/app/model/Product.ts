export interface APIResponse
{
    message:string,
    result:boolean,
    data: any
}

  
export interface ProductData {
    productId: number
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
    custId:number
    name:string
    mobileNo:string
    password:string
    constructor()
    {
        this.custId=0;
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