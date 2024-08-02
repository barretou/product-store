import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [RouterLink, MatButtonModule, ReactiveFormsModule, MatInputModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent {
  form = new FormGroup({
    title: new FormControl<string>('', {nonNullable: true, validators: Validators.required})
  });

  public onSubmit() {
    console.log(this.form.controls.title.value);
  }
}
