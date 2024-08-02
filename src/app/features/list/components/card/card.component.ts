import { Component, inject, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Product } from '../../../../shared/interfaces/product.interface';
import { ProductsService } from '../../../../shared/services/products.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatSnackBarModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  _productService = inject(ProductsService)
  _snackBar = inject(MatSnackBar)

  @Input({ required: true }) product!: Product;

  public async deleteProduct(id : number) {
    this._productService.delete(id).subscribe(() => {
      this.openSnackBar("Produto deletado com sucesso!", "fechar");
    })
  }

  private openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

}
