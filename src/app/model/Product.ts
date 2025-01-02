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
    Name:String
    MobileNo:string
    Password:string
    constructor()
    {
        this.CustId=0;
        this.Name="";
        this.MobileNo="";
        this.Password="";
    }
  }

  export class LoginCustomer
  {
    
    UserName:String
    Password:string
    constructor()
    {
        this.UserName="";
        this.Password="";
    }
  }