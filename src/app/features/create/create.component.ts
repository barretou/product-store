import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { ProductsService } from '../../shared/services/products.service';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [RouterLink, MatButtonModule, ReactiveFormsModule, MatInputModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent {
  _productService = inject(ProductsService)

  form = new FormGroup({
    title: new FormControl<string>('', {nonNullable: true, validators: Validators.required})
  });

  public onSubmit() {
    const payload = { title: this.form.controls.title.value };
    this._productService.create(payload).subscribe(() => {
      alert("Sucesso")
    });
  }
}
