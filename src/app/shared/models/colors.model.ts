import { ColorName } from "../enums/color-name.enum";
import { Theme } from "../enums/theme.enum";

export type Color = { accent: string; active: string; };

export type ColorWithThemes = {
  [theme in Theme]: Color;
}

export type Colors = {
  [colorName in ColorName]: ColorWithThemes;
};