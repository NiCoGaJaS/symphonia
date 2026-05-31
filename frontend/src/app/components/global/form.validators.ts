import { FormGroup, ValidatorFn } from '@angular/forms';

export function allOrNoneValidator(): ValidatorFn {
    return (control) => {
        if (!(control instanceof FormGroup)) {
            return null;
        }

        const group = control as FormGroup;
        const inputs = Object.values(group.controls);

        if (inputs.length === 0) {
            return null;
        }

        const empty = inputs.filter((input) => !input.getRawValue()).length;

        if (empty === 0 || empty === inputs.length) {
            return null;
        }

        return { allOrNone: true };
    };
}
