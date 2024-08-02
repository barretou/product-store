import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../shared/services/products.service';
import { Product } from '../../shared/interfaces/product.interface';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit{
  // Injects
  _productService = inject(ProductsService)

  // Propriedades
  products : Product[] = []
  

  ngOnInit(): void {
    this._productService.getAll().subscribe((products) => {
        this.products = products;
    });
  }
}
