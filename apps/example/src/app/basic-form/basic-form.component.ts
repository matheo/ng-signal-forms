import { Component, effect, inject } from '@angular/core';
import {
  SignalFormBuilder,
  SignalInputDebounceDirective,
  SignalInputDirective,
  SignalInputErrorDirective,
  withErrorComponent,
} from '@ng-signal-forms';
import { JsonPipe, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomErrorComponent } from '../custom-input-error.component';

@Component({
  selector: 'app-basic-form',
  template: `
    <div class="container">
      <div>
        <div>
          <label>Name</label>
          <input ngModel [formField]="form.controls.name" />
        </div>

        <div>
          <label>Age</label>
          <input type="number" ngModel [formField]="form.controls.age" />
        </div>
      </div>

      <div>
        <button (click)="reset()">Reset form</button>

        <h3>States</h3>
        <pre
          >{{
            {
              state: form.state(),
              dirtyState: form.dirtyState(),
              touchedState: form.touchedState(),
              valid: form.valid()
            } | json
          }}
    </pre>

        <h3>Value</h3>
        <pre>{{ form.value() | json }}</pre>

        <h3>Errors</h3>
        <pre>{{ form.errorsArray() | json }}</pre>
      </div>
    </div>
  `,
  standalone: true,
  imports: [
    JsonPipe,
    FormsModule,
    SignalInputDirective,
    SignalInputErrorDirective,
    NgIf,
    NgFor,
    SignalInputDebounceDirective,
  ],
  providers: [withErrorComponent(CustomErrorComponent)],
})
export default class BasicFormComponent {
  private sfb = inject(SignalFormBuilder);

  form = this.sfb.createFormGroup<{ name: string; age: number | null }>({
    name: 'Alice',
    age: null,
  });

  formChanged = effect(() => {
    console.log('form changed:', this.form.value());
  });

  nameChanged = effect(() => {
    console.log('name changed:', this.form.controls.name.value());
  });

  ageChanged = effect(() => {
    console.log('age changed:', this.form.controls.age.value());
  });

  reset() {
    this.form.reset();
  }

  setForm() {
    // TODO: allow form values to be set
  }
}
