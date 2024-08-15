import { Component, Input } from '@angular/core';
import { Color, Colors } from '../../models/colors.model';
import { ColorName } from '../../enums/color-name.enum';
import { ColorsService } from '../../../core/services/colors.service';

@Component({
  selector: 'app-color-circle',
  standalone: true,
  imports: [],
  templateUrl: './color-circle.component.html',
  styles: ``
})
export class ColorCircleComponent {
  @Input() color: string = ColorName.BLUE;

  constructor(private colorsService: ColorsService) {}

  public getCurrentColor(): Color {
    const currentColor = this.colorsService.getColorWithThemes(this.color as ColorName);
    return currentColor.light; // only light cuz with dark mode colors circle looks ugly
  }
}
