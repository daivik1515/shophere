import { Component,inject,OnInit, signal } from '@angular/core';
import { EcommerceServiceService } from '../../service/ecommerce-service.service';
import { APIResponse, ProductData } from '../../model/Product';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{
  ecomService=inject(EcommerceServiceService);
  data=signal<ProductData[]>([]);
 ngOnInit(): void {
  this.displayProducts()
 }

  displayProducts()
  {
    this.ecomService.getProducts().subscribe((res:APIResponse)=>{
      this.data.set(res.data);
    })
  }
}
