import { FormControl, FormGroup } from '@angular/forms';

type ControlsOf<T extends object> = {
  [K in keyof T]: FormControl<T[K]>;
};

export function buildForm<T extends object>(model: T): FormGroup<ControlsOf<T>> {
  const controls = {} as ControlsOf<T>;

  for (const key of Object.keys(model) as (keyof T)[]) {
    controls[key] = new FormControl(model[key]) as FormControl<T[keyof T]>;
  }

  return new FormGroup(controls);
}