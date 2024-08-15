import { Injectable } from '@angular/core';
import { Colors, ColorWithThemes } from '../../shared/models/colors.model';
import { ColorName } from '../../shared/enums/color-name.enum';
import { Theme } from '../../shared/enums/theme.enum';

@Injectable({
  providedIn: 'root'
})
export class ColorsService {
  private colors: Colors = {
    "Голубой": {
      "light": { "accent": "#E0EBFF", "active": "#9ABDFF" },
      "dark": { "accent": "#636363", "active": "#89ABEB" }
    },
    "Розовый": {
      "light": { "accent": "#FFE2E9", "active": "#FF9AC6" },
      "dark": { "accent": "#636363", "active": "#DC82A9" }
    },
    "Жёлтый": {
      "light": { "accent": "#FFF5CD", "active": "#FFE786" },
      "dark": { "accent": "#636363", "active": "#E8D175" }
    },
    "Зелёный": {
      "light": { "accent": "#E2FED6", "active": "#BEDC8F" },
      "dark": { "accent": "#636363", "active": "#85C27A" }
    },
  }
  private currentColorName: ColorName = ColorName.BLUE;

  constructor() {
    const currentColor = localStorage.getItem('currentColor') as ColorName || ColorName.BLUE;
    this.setColor(currentColor);
  }

  public getCurrentColorName(): ColorName {
    return this.currentColorName;
  }

  public getColorWithThemes(color: ColorName): ColorWithThemes {
    return this.colors[color];
  }

  public getColorsNames(): string[] {
    return Object.keys(this.colors);
  }

  public setColor(colorName: ColorName): void {
    this.currentColorName = colorName;
    localStorage.setItem('currentColor', colorName);
    this.updateColors();
  }

  public updateColors(): void {
    const root = document.documentElement;
    const currentColor = this.getColorWithThemes(this.currentColorName);
    const currentTheme = root.style.getPropertyValue('--current-theme') as Theme;

    if (currentTheme === Theme.DARK) {
      root.style.setProperty('--accent-color', currentColor.dark.accent);
      root.style.setProperty('--active-color', currentColor.dark.active);
      root.style.setProperty('--background-color', '#303030');
      root.style.setProperty('--text-color', '#FFF');
    }
    else {
      root.style.setProperty('--accent-color', currentColor.light.accent);
      root.style.setProperty('--active-color', currentColor.light.active);
      root.style.setProperty('--background-color', '#FFF');
      root.style.setProperty('--text-color', '#000');
    }
  }
}
