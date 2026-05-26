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
}
