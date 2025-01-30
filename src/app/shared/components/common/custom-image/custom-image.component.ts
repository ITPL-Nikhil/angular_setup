import {
  Component,
  Input,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-custom-image',
  templateUrl: './custom-image.component.html',
  styleUrls: ['./custom-image.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true, // Mark as standalone
  imports: [CommonModule, HttpClientModule], // Import HttpClientModule
})
export class CustomImageComponent implements OnInit {
  @Input() src: string = ''; // Image URL
  @Input() alt: string = 'Image'; // Alt text for accessibility
  @Input() width: string = 'auto'; // Default width
  @Input() height: string = 'auto'; // Default height
  @Input() borderRadius: string = '0'; // Border radius
  @Input() objectFit: 'cover' | 'contain' | 'fill' | 'none' = 'cover'; // Object fit property
  @Input() lazyLoading: boolean = true; // Enable lazy loading

  cachedImage: SafeUrl | null = null; // Cached image URL
  isLoading: boolean = true; // Loading state
  error: boolean = false; // Error state

  constructor(
    private http: HttpClient,
    private sanitizer: DomSanitizer,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadImage();
  }

  loadImage(): void {
    if (!this.src) {
      this.error = true;
      return;
    }

    // Check if the image is already cached
    const cachedImage = localStorage.getItem(this.src);
    if (cachedImage) {
      this.cachedImage = this.sanitizer.bypassSecurityTrustUrl(cachedImage);
      this.isLoading = false;
      this.cdr.markForCheck(); // Trigger change detection
      return;
    }

    // Fetch the image and cache it
    this.http.get(this.src, { responseType: 'blob' }).subscribe({
      next: (blob) => {
        const reader = new FileReader();
        reader.onload = () => {
          const base64Image = reader.result as string;
          localStorage.setItem(this.src, base64Image); // Cache the image
          this.cachedImage = this.sanitizer.bypassSecurityTrustUrl(base64Image);
          this.isLoading = false;
          this.cdr.markForCheck(); // Trigger change detection
        };
        reader.readAsDataURL(blob);
      },
      error: () => {
        this.error = true;
        this.isLoading = false;
        this.cdr.markForCheck(); // Trigger change detection
      },
    });
  }

  get styles(): { [key: string]: string } {
    return {
      width: this.width,
      height: this.height,
      'border-radius': this.borderRadius,
      'object-fit': this.objectFit,
    };
  }
}
