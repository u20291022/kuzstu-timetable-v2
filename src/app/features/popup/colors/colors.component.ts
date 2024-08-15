import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { Color } from '../../../shared/models/colors.model';
import { ColorsService } from '../../../core/services/colors.service';
import { ColorName } from '../../../shared/enums/color-name.enum';
import { ColorCircleComponent } from "../../../shared/components/color-circle/color-circle.component";

@Component({
  selector: 'app-colors',
  standalone: true,
  imports: [NgFor, ColorCircleComponent],
  templateUrl: './colors.component.html',
  styleUrl: './colors.component.css'
})
export class ColorsComponent {
  constructor(private colorsService: ColorsService) {}

  public getColorsNames(): string[] {
    return this.colorsService.getColorsNames();
  }

  public getCurrentColorName(): ColorName {
    return this.colorsService.getCurrentColorName();
  }

  public setColor(colorName: string): void {
    this.colorsService.setColor(colorName as ColorName);
  }
}
