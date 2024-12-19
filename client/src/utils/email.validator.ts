import { ValidatorFn } from "@angular/forms";

export function emailValidator(domains: string[]): ValidatorFn {
    const regExp = new RegExp(`[A-Za-z0-9\.]{6,}@[A-Za-z0-9]{2,}.[A-Za-z0-9]{2,}`);

    return (control) => {
        const isInvalid = control.value === '' || regExp.test(control.value);

        return isInvalid ? null : { emailValidator: true };
    };
}