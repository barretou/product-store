// Material
import {MatInputModule} from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';

// angular
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ProductsService } from '../../shared/services/products.service';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [RouterLink, MatButtonModule, ReactiveFormsModule, MatInputModule, MatSnackBarModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent {
  _productService = inject(ProductsService)
  _snackBar = inject(MatSnackBar)
  _router = inject(Router)

  form = new FormGroup({
    title: new FormControl<string>('', {nonNullable: true, validators: Validators.required})
  });

  public createProduct() {
    const payload = { title: this.form.controls.title.value };
    this._productService.create(payload).subscribe({
      next: () => {
        this.openSnackBar("Produto criado com sucesso!", "Fechar");
      },
      error: (e) => {
        this.openSnackBar(`Falha ao criar o produto. ${e}`, "Fechar");
      }
    })
  }

  private openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, { duration: 3000, horizontalPosition: "end", verticalPosition: "top" });
  }
}
