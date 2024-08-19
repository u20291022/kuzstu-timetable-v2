import { Component, Input } from '@angular/core';
import { Lesson } from '../../../shared/models/lesson.model';
import { NgFor } from '@angular/common';
import { PersonSvgComponent } from "../../../shared/components/person-svg/person-svg.component";
import { LocationSvgComponent } from "../../../shared/components/location-svg/location-svg.component";

@Component({
  selector: 'app-lesson',
  standalone: true,
  imports: [NgFor, PersonSvgComponent, LocationSvgComponent],
  templateUrl: './lesson.component.html',
  styleUrl: './lesson.component.css'
})
export class LessonComponent {
  @Input() lesson!: Lesson;
}
