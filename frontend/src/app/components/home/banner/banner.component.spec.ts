import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BannerComponent } from '@components/home/banner/banner.component';

describe('Banner Component', () => {
    let fixture: ComponentFixture<BannerComponent>;
    let native: HTMLElement;
    let component: BannerComponent;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [BannerComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(BannerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        native = fixture.nativeElement;
    });

    it('should create banner', () => {
        expect(component).toBeTruthy();
    });

    it('should render banner image', () => {
        const img = native.querySelector('.banner-image');
        expect(img).toBeTruthy();
    });

    it('should render banner title', () => {
        const title = native.querySelector('.banner-title');
        expect(title).toBeTruthy();
    });

    it('should render banner paragraph', () => {
        const paragraph = native.querySelector('.banner-paragraph');
        expect(paragraph).toBeTruthy();
    });

    it('should render banner actions', () => {
        const shopping = native.querySelector('.banner-shopping-button');
        const offers = native.querySelector('.banner-offers-button');

        expect(shopping).toBeTruthy();
        expect(offers).toBeTruthy();
    });
});
