// material
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';

// angular and services
import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../shared/services/products.service';
import { Product } from '../../shared/interfaces/product.interface';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
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
}
