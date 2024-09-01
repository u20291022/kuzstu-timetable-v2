import { Component } from '@angular/core';
import { LessonComponent } from "./lesson/lesson.component";
import { Lesson } from '../../shared/models/lesson.model';
import { NgFor, NgIf } from '@angular/common';
import { LoadingComponent } from "../../shared/components/loading/loading.component";
import { ImagesService } from '../../core/services/images.service';
import { TimetableService } from '../../core/services/timetable.service';
import { CalendarService } from '../../core/services/calendar.service';
import { ChevronSvgComponent } from "../../shared/components/chevron-svg/chevron-svg.component";

@Component({
  selector: 'app-lessons',
  standalone: true,
  imports: [NgIf, NgFor, LessonComponent, LoadingComponent, ChevronSvgComponent],
  templateUrl: './lessons.component.html',
  styleUrl: './lessons.component.css'
})
export class LessonsComponent {
  private startX: number = 0;
  private startY: number = 0;
  private swipingRight: boolean = false;
  private swipingLeft: boolean = false;
  private swipingUpOrDown: boolean = false;
  private swipingLeftOrDown: boolean = false;

  constructor(
    private imagesService: ImagesService,
    private timetableService: TimetableService,
    private calendarService: CalendarService
  ) {}

  public isSwipingRight(): boolean {
    return this.swipingRight;
  }

  public isSwipingLeft(): boolean {
    return this.swipingLeft;
  }

  public isLoadingLessons(): boolean {
    return this.timetableService.isLoadingLessons();
  }

  public isCatImageLoaded(): boolean {
    return this.imagesService.isCatImageLoaded();
  }

  public getLessons(): Lesson[] {
    return this.timetableService.getLessons();
  }


  public getCurrentCatImageUrl(): string {
    return this.imagesService.getCurrentCatImageUrl();
  }

  public onCatImageLoad(): void {
    this.imagesService.setCatImageToLoaded();
  }

  public onTouchStart(event: TouchEvent) {
    this.startX = event.touches[0].clientX;
    this.startY = event.touches[0].clientY;
  }

  public onTouchMove(event: TouchEvent): void {
    const x = event.touches[0].clientX;
    const y = event.touches[0].clientY;
    const deltaX = x - this.startX;
    const deltaY = y - this.startY;

    if (Math.abs(deltaY) > 10 && !this.swipingLeftOrDown) {
      this.swipingUpOrDown = true;
    }

    if (Math.abs(deltaX) > 15 && !this.swipingUpOrDown) {
      this.swipingLeftOrDown = true;
      event.preventDefault();
      
      const lessonsElement = document.getElementsByClassName('lessons')[0] as HTMLElement;
      const translateValue = Math.min(25, Math.max(-25, deltaX / 3));
      
      lessonsElement.style.transform = `translateX(${translateValue}px)`;

      if (Math.abs(translateValue) < 25) {
        this.swipingRight = false;
        this.swipingLeft = false;
      }
      else {
        if (deltaX > 0) {
          this.swipingLeft = true;
        }
        else {
          this.swipingRight = true;
        }
      }
    }
  }

  public onTouchEnd(): void {
    if (this.isSwipingRight()) {
      this.onSwipeRight();
    } else if (this.isSwipingLeft()) {
      this.onSwipeLeft();
    }

    this.startX = 0;
    this.swipingRight = false;
    this.swipingLeft = false;
    this.swipingUpOrDown = false;
    this.swipingLeftOrDown = false;

    const lessonsElement = document.getElementsByClassName('lessons')[0] as HTMLElement;
    lessonsElement.style.transform = `translateX(0px)`;
  }

  private onSwipeLeft() {
    this.calendarService.setPrevDay();
  }

  private onSwipeRight() {
    this.calendarService.setNextDay();
  }
}
