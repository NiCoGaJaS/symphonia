import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-editable-form',
    standalone: true,
    imports: [ReactiveFormsModule],
    templateUrl: './editable-form.component.html',
    styleUrl: './editable-form.component.css',
})
export class EditableForm implements OnInit {
    @Input({ required: true }) title!: string;
    @Input({ required: true }) form!: FormGroup;
    @Input() labels: Record<string, string> = {};
    @Input() prefixes: Record<string, string> = {};

    @Output() submitted = new EventEmitter<void>();
    @Output() clearAndSubmit = new EventEmitter<void>();

    protected editing = false;
    private previous = null;

    ngOnInit(): void {
        this.previous = this.form.getRawValue();
        this.form.disable({ emitEvent: false });
    }

    protected onEdit(): void {
        this.editing = true;
        this.previous = this.form.getRawValue();
        this.form.enable({ emitEvent: false });
    }

    protected onSubmit(): void {
        if (!this.editing) {
            return;
        }

        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }

        this.submitted.emit();

        this.editing = false;
        this.form.disable({ emitEvent: false });
    }

    protected onClearAndSubmit(): void {
        if (!this.editing) {
            return;
        }

        this.form.reset();
        this.clearAndSubmit.emit();

        this.editing = false;
        this.form.disable({ emitEvent: false });
    }

    protected onCancel(): void {
        if (!this.editing) {
            return;
        }

        this.restorePrevious();

        this.editing = false;
        this.form.disable({ emitEvent: false });
    }

    public restorePrevious(): void {
        if (this.previous === null) {
            return;
        }

        this.form.reset(this.previous);
        this.form.markAsPristine();
        this.form.markAsUntouched();
    }

    protected get errors(): (string | undefined)[] {
        return Object.entries(this.form.controls)
            .filter(([, control]) => control.errors !== null)
            .flatMap(([name, control]) => {
                const errors = control.errors;

                if (!errors) {
                    return [];
                }

                if (!control.touched && !control.dirty) {
                    return [];
                }

                const messages = [];

                let field = null;
                const prefix = this.prefixes[name];
                const label = this.labels[name];
                if (prefix && label) {
                    field = `${prefix} ${label}`;
                }

                if (errors['required']) {
                    if (field) {
                        messages.push(`${field} ist erforderlich.`);
                    } else {
                        messages.push('Ein Feld ist erforderlich.');
                    }
                }

                if (errors['pattern']) {
                    if (field) {
                        messages.push(`${field} hat ein ungültiges Format.`);
                    } else {
                        messages.push(`Ein Feld hat ein ungültiges Format.`);
                    }
                }

                return messages;
            });
    }
}
