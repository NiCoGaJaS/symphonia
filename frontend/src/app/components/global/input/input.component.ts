import { Component, Input } from '@angular/core';
import {
    ControlContainer,
    FormGroup,
    FormGroupDirective,
    FormsModule,
    ReactiveFormsModule,
} from '@angular/forms';
import { FloatLabel } from 'primeng/floatlabel';
import { InputGroup } from 'primeng/inputgroup';
import { InputMaskDirective } from 'primeng/inputmask';
import { InputText } from 'primeng/inputtext';
import { NgClass } from '@angular/common';

@Component({
    selector: 'app-form-input',
    imports: [
        FloatLabel,
        FormsModule,
        InputGroup,
        InputText,
        NgClass,
        ReactiveFormsModule,
        InputMaskDirective,
    ],
    templateUrl: './input.component.html',
    styleUrl: './input.component.css',
    viewProviders: [
        { provide: ControlContainer, useExisting: FormGroupDirective },
    ],
})
export class InputComponent {
    @Input({ required: true }) form!: FormGroup;
    @Input({ required: true }) field!: string;
    @Input({ required: true }) label!: string;

    @Input() inputMask?: string;
    @Input() placeholder: string = '';
}
