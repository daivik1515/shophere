import { Routes } from '@angular/router';
import { ProductsComponent } from './views/products/products.component';
import { OrderComponent } from './views/order/order.component';
import { PreviousOrderComponent } from './views/previous-order/previous-order.component';

export const routes: Routes = [
    {
        path:"",
        redirectTo:"home",
        pathMatch:"full"
    },
    {
        path:"home",
        component:ProductsComponent
    },
    {
        path:"order",
        component:OrderComponent
    },
    {
        path:"previousorder",
        component:PreviousOrderComponent
    }
    
];
