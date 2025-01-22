import { Pipe, PipeTransform } from '@angular/core';
import { ProductData } from '../model/Product';

@Pipe({
  name: 'filterProducts',
  standalone: true
})
export class FilterProductsPipe implements PipeTransform {

  transform(items: ProductData[], searchTerm: string): ProductData[] {
    if(!searchTerm){
      return items;
    }
    const text = searchTerm.toLowerCase();
    return items.filter((item) => {
      return item.productName.toLowerCase().includes(text);
    })
  }

}
