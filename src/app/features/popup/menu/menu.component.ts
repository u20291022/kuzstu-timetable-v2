import { Component } from '@angular/core';
import { GroupSvgComponent } from "../../../shared/components/group-svg/group-svg.component";
import { ColorCircleComponent } from "../../../shared/components/color-circle/color-circle.component";
import { MoonSvgComponent } from "../../../shared/components/moon-svg/moon-svg.component";
import { NgIf } from '@angular/common';
import { SunSvgComponent } from "../../../shared/components/sun-svg/sun-svg.component";
import { ColorsService } from '../../../core/services/colors.service';
import { ThemeService } from '../../../core/services/theme.service';
import { Theme } from '../../../shared/enums/theme.enum';
import { ColorName } from '../../../shared/enums/color-name.enum';
import { PopupService } from '../../../core/services/popup.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [NgIf, GroupSvgComponent, ColorCircleComponent, MoonSvgComponent, SunSvgComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  constructor(
    private colorsService: ColorsService,
    private themeService: ThemeService,
    private popupService: PopupService
  ) {}

  public getCurrentColorName(): ColorName {
    return this.colorsService.getCurrentColorName();
  }

  public isLightTheme(): boolean {
    return this.themeService.getCurrentTheme() === Theme.LIGHT;
  }

  public isDarkTheme(): boolean {
    return this.themeService.getCurrentTheme() === Theme.DARK;
  }

  public switchTheme(): void {
    this.themeService.switchTheme();
  }

  public openGroupOrTeacherSelectionPopup(): void {
    this.popupService.toggleGroupOrTeacherSelectionPopup();
  }

  public openColorsPopup(): void {
    this.popupService.toggleColorsPopup();
  }
}
