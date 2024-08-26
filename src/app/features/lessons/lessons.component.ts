import { Component } from '@angular/core';
import { LessonComponent } from "./lesson/lesson.component";
import { Lesson } from '../../shared/models/lesson.model';
import { NgFor, NgIf } from '@angular/common';
import { LoadingComponent } from "../../shared/components/loading/loading.component";
import { ImagesService } from '../../core/services/images.service';
import { LessonsService } from '../../core/services/lessons.service';

@Component({
  selector: 'app-lessons',
  standalone: true,
  imports: [NgIf, NgFor, LessonComponent, LoadingComponent],
  templateUrl: './lessons.component.html',
  styleUrl: './lessons.component.css'
})
export class LessonsComponent {
  constructor(private imagesService: ImagesService, private lessonsService: LessonsService) {}

  public isLoadingLessons(): boolean {
    return this.lessonsService.isLoadingLessons();
  }

  public isCatImageLoaded(): boolean {
    return this.imagesService.isCatImageLoaded();
  }

  public getLessons(): Lesson[] {
    return this.lessonsService.getLessons();
  }


  public getCurrentCatImageUrl(): string {
    return this.imagesService.getCurrentCatImageUrl();
  }

  public onCatImageLoad(): void {
    this.imagesService.setCatImageToLoaded();
  }
}
