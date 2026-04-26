import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

@Component({
    selector: 'app-banner',
    standalone: true,
    templateUrl: 'banner.component.html',
    styleUrl: 'banner.component.css',
    imports: [NgOptimizedImage],
})
export class BannerComponent {}
