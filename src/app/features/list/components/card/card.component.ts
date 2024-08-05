import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Product } from '../../../../shared/interfaces/product.interface';
import { ProductsService } from '../../../../shared/services/products.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { NgIf } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatSnackBarModule, NgIf, MatInputModule, ReactiveFormsModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  _productService = inject(ProductsService)
  _snackBar = inject(MatSnackBar)

  @Input({ required: true }) product!: Product;
  @Output() deleteSuccess = new EventEmitter<boolean>();
  @Output() updateSuccess = new EventEmitter<boolean>();

  isEdit = false
  newTaskTitle = new FormControl<string>('', {nonNullable: true, validators: Validators.required})


  public deleteProduct(id : number) {
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

  public updateProduct(id : number) {
    const inputTitle = this.newTaskTitle.value;
    console.log(inputTitle);
    
    const payload = { title: inputTitle };

    if (!inputTitle.trim()) {
      this.openSnackBar("O título do produto não pode estar vazio.", "Fechar");
      return;
    }

    this._productService.update(id, payload).subscribe({
      next: () => {
        this.openSnackBar("Produto atualizado com sucesso!", "Fechar");
        this.updateSuccess.emit(true);
        this.isEdit = false;
      },
      error: (e) => {
        this.openSnackBar(`Falha ao atualizar o produto. ${e}`, "Fechar");
        this.updateSuccess.emit(false);
        this.isEdit = false;
      }
    });
  }

  private openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, { duration: 3000, horizontalPosition: "end", verticalPosition: "top" });
  }

}
