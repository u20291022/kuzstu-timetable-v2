import { Component } from '@angular/core';
import { GroupSvgComponent } from "../../../shared/components/group-svg/group-svg.component";
import { ColorCircleComponent } from "../../../shared/components/color-circle/color-circle.component";
import { MoonSvgComponent } from "../../../shared/components/moon-svg/moon-svg.component";
import { NgIf } from '@angular/common';
import { SunSvgComponent } from "../../../shared/components/sun-svg/sun-svg.component";

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [NgIf, GroupSvgComponent, ColorCircleComponent, MoonSvgComponent, SunSvgComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  public currentColor = 'Голубой'; // TODO: put this to enum
  public currentTheme = 'light';
}
