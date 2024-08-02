import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
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
  @Output() deleteSuccess = new EventEmitter<boolean>();


  public async deleteProduct(id : number) {
    this._productService.delete(id).subscribe({
      next: () => {
        this.openSnackBar("Produto deletado com sucesso!", "Fechar");
        this.deleteSuccess.emit(true);
      },
      error: (e) => {
        this.openSnackBar(`Falha ao deletar o produto. ${e}`, "Fechar");
        this.deleteSuccess.emit(false);
      }
    })
  }

  private openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, { duration: 3000, horizontalPosition: "end", verticalPosition: "top" });
  }

}
