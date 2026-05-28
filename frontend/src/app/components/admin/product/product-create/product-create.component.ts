import {
    Category,
    CreateProductParams,
    Products,
    categoryToLabel,
} from '@api/products/products.api';
import { Component, ViewChild, inject } from '@angular/core';
import {
    FileSelectEvent,
    FileUpload,
    FileUploadModule,
} from 'primeng/fileupload';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FloatLabel } from 'primeng/floatlabel';
import { InputComponent } from '@components/global/input/input.component';
import { InputNumber } from 'primeng/inputnumber';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';
import { Select } from 'primeng/select';
import { TextareaComponent } from '@components/global/textarea/textarea.component';
import { TextareaModule } from 'primeng/textarea';

@Component({
    selector: 'app-product-create',
    imports: [
        FileUploadModule,
        TextareaModule,
        FloatLabel,
        Select,
        NgClass,
        ReactiveFormsModule,
        InputComponent,
        TextareaComponent,
        InputNumber,
    ],
    templateUrl: './product-create.component.html',
    styleUrl: './product-create.component.css',
})
export class ProductCreateComponent {
    @ViewChild(FileUpload) private readonly fileUpload?: FileUpload;

    private readonly formBuilder = inject(FormBuilder);
    private readonly products = inject(Products);
    private readonly router = inject(Router);

    protected image: File | null = null;
    protected isLoading = false;
    protected previewUrl: string | null = null;

    protected readonly categories = Object.values(Category).map((category) => ({
        label: categoryToLabel(category),
        value: category,
    }));

    protected form = this.formBuilder.nonNullable.group({
        name: ['', [Validators.required]],
        category: [null, [Validators.required]],
        summary: ['', [Validators.required]],
        description: [''],
        price: [0, [Validators.required]],
    });

    private setImage(file: File): void {
        if (this.previewUrl) {
            URL.revokeObjectURL(this.previewUrl);
        }

        this.isLoading = true;

        this.image = file;

        this.previewUrl = URL.createObjectURL(file);

        this.isLoading = false;
    }

    protected onRemoveImage(event?: Event): void {
        if (event) {
            event.stopPropagation();
        }

        if (this.previewUrl) {
            URL.revokeObjectURL(this.previewUrl);
        }

        this.previewUrl = null;
        this.image = null;
    }

    protected onSelectImages(event: FileSelectEvent): void {
        const file = event.files?.[0];
        if (!file) {
            return;
        }

        this.setImage(file);
    }

    protected onSubmit(): void {
        this.form.markAllAsTouched();

        if (this.form.invalid || !this.image) {
            return;
        }

        const formValue = this.form.getRawValue();

        const product: CreateProductParams = {
            name: formValue.name,
            category: formValue.category!,
            price: formValue.price,
            summary: formValue.summary,
            description: formValue.description ?? '',
            image: this.image,
        };

        this.products.create(product).subscribe({
            next: () => {
                this.onRemoveImage();
                this.form.reset();

                this.router.navigate(['/admin/products']);
            },
        });
    }
}
