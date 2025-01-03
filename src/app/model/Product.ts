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
    CustId:number
    name:string
    MobileNo:string
    password:string
    constructor()
    {
        this.CustId=0;
        this.name="";
        this.MobileNo="";
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