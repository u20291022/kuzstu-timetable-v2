import { Injectable } from '@angular/core';
import { ColorsService } from './colors.service';
import { Theme } from '../../shared/enums/theme.enum';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private currentTheme: Theme = Theme.LIGHT;

  constructor(private colorsService: ColorsService) {
    const deviceUsingDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const localTheme = localStorage.getItem('currentTheme') as Theme || (deviceUsingDarkMode ? Theme.DARK : Theme.LIGHT);
    this.setTheme(localTheme);
    this.colorsService.updateColors();
  }

  public getCurrentTheme(): Theme {
    return this.currentTheme;
  }

  public switchTheme(): void {
    const switchedTheme = this.currentTheme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT;
    this.setTheme(switchedTheme);
    this.colorsService.updateColors();
  }

  private setTheme(theme: Theme): void {
    localStorage.setItem('currentTheme', theme);
    this.currentTheme = theme;
    document.documentElement.style.setProperty('--current-theme', theme);
  }
}
