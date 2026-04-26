import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

@Component({
    selector: 'app-banner',
    templateUrl: 'banner.component.html',
    styleUrl: 'banner.component.css',
    imports: [NgOptimizedImage],
})
export class BannerComponent {}
