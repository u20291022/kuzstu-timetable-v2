import { Injectable } from '@angular/core';
import { ColorsService } from './colors.service';
import { settings } from '../../shared/settings';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {
  private catImageLoaded = false;
  private imageUrls = [
    `${settings.baseUrl}/timetable/image/blue-cat.jpg`,
    `${settings.baseUrl}/timetable/image/pink-cat.jpg`,
    `${settings.baseUrl}/timetable/image/yellow-cat.jpg`,
    `${settings.baseUrl}/timetable/image/green-cat.jpg`,
  ]

  constructor(public colorsService: ColorsService) {
    this.preloadImages();
    setTimeout(() => {
      this.setCatImageToLoaded();
    }, 2 * 1000); // for safari. Safari doesn't trigger load event for images that are already in cache
  }

  private preloadImages() {
    this.imageUrls.forEach((url) => {
      const img = new Image();
      img.src = url;
    });
  }

  isCatImageLoaded() {
    return this.catImageLoaded;
  }

  setCatImageToLoaded() {
    this.catImageLoaded = true;
  }

  getCurrentCatImageUrl() {
    return this.imageUrls[Math.min(this.colorsService.getCurrentColorIndex(), this.imageUrls.length - 1)];
  }
}
