import { Component, Input } from '@angular/core';
import { Color, Colors } from '../../models/colors.model';

@Component({
  selector: 'app-color-circle',
  standalone: true,
  imports: [],
  templateUrl: './color-circle.component.html',
  styles: ``
})
export class ColorCircleComponent {
  private colors: Colors = { // TODO: move to service
    "Голубой": { accent: "#E0EBFF", active: "#9ABDFF" }
  }

  @Input() color: string = 'Голубой';

  public getColor(color: string): Color {
    return this.colors[color];
  }
}
