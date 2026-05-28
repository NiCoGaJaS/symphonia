import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FloatLabel } from 'primeng/floatlabel';
import { InputGroup } from 'primeng/inputgroup';
import { NgClass } from '@angular/common';
import { Textarea } from 'primeng/textarea';

@Component({
    selector: 'app-form-textarea',
    imports: [FloatLabel, Textarea, InputGroup, NgClass, ReactiveFormsModule],
    templateUrl: './textarea.component.html',
    styleUrl: './textarea.component.css',
})
export class TextareaComponent {
    @Input({ required: true }) field!: string;
    @Input({ required: true }) form!: FormGroup;
    @Input({ required: true }) label!: string;
    @Input({ required: true }) rows!: number;
    @Input({ required: true }) required!: boolean;
}
