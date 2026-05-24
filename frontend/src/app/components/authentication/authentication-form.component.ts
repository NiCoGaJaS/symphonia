import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { Avatar } from 'primeng/avatar';
import { Divider } from 'primeng/divider';
import { FloatLabel } from 'primeng/floatlabel';
import { InputGroup } from 'primeng/inputgroup';
import { InputGroupAddon } from 'primeng/inputgroupaddon';
import { InputText } from 'primeng/inputtext';
import { Password } from 'primeng/password';
import { RouterLink } from '@angular/router';

export type AuthenticationFormProperties = FormGroup<{
    email: FormControl<string>;
    password: FormControl<string>;
}>;

@Component({
    selector: 'app-authentication-form',
    standalone: true,
    imports: [
        Avatar,
        Divider,
        FloatLabel,
        FormsModule,
        InputGroup,
        InputGroupAddon,
        InputText,
        Password,
        ReactiveFormsModule,
        RouterLink,
    ],
    templateUrl: './authentication-form.component.html',
    styleUrl: './authentication-form.component.css',
})
export class AuthenticationForm {
    @Input({ required: true }) title = '';
    @Input({ required: true }) description = '';
    @Input() isSubmitting = false;

    @Input({ required: true }) primary = '';
    @Input({ required: true }) secondary = '';
    @Input({ required: true }) secondaryIcon = '';
    @Input({ required: true }) secondaryLink = '';

    protected form: AuthenticationFormProperties = inject(
        FormBuilder,
    ).nonNullable.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]],
    });

    @Output() submitted = new EventEmitter<typeof this.form>();

    onSubmit(): void {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }

        this.submitted.emit(this.form);
    }
}
