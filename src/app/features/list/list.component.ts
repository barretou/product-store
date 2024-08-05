// material
import {MatButtonModule} from '@angular/material/button';
// angular and services
import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../shared/services/products.service';
import { Product } from '../../shared/interfaces/product.interface';
import { CardComponent } from './components/card/card.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CardComponent, RouterLink, MatButtonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit{
  // Injects
  _productService = inject(ProductsService)

  // Properties
  products : Product[] = []
  

  ngOnInit(): void {
    this._productService.getAll().subscribe((products) => {
        this.products = products;
    });
  }

  public onUpdateSuccess(isProductUpdated: boolean) {
    if (isProductUpdated) {
      this._productService.getAll().subscribe((products) => {
        this.products = products;
    });
    }
  }

  public onDeleteSuccess(isProductDeleted: boolean) {
    if (isProductDeleted) {
      this._productService.getAll().subscribe((products) => {
        this.products = products;
    });
    }
  }
}
