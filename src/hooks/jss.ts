import React from 'react';
import { createTheming, createUseStyles as reactJssCreateUseStyles, Theming } from 'react-jss';
import { Classes, Styles, StyleSheetFactoryOptions } from 'jss';
import { Theme } from '../theme';

interface CreateUseStylesOptions extends StyleSheetFactoryOptions {
  name?: string;
  index?: number;
  theming?: Theming<Theme>;
}

/**
 * Use namespaced themes so that a set of UI components gets no conflicts with another set of UI
 * components from a different library also using react-jss or in case you want to use
 * the same theme from another context that is already used in your app.
 *
 * @see https://cssinjs.org/react-jss?v=v10.5.1#using-custom-theming-context
 */
const ThemeContext = React.createContext({} as Theme);

/**
 * Creating a namespaced theming object.
 *
 */
export const theming = createTheming<Theme>(ThemeContext);

/**
 * Context theme providers and hook
 */
export const ThemeProvider = theming.ThemeProvider;
export const useTheme = theming.useTheme;

/**
 * create custom createUseStyles that auto inject the theme context
 *
 * @param {Styles} style object of styles
 * @param {CreateUseStylesOptions} options options for creating styles
 *
 * @returns {Record<string, string>} returns object of class names
 */
export function createUseStyles<
  TStyle extends Styles<C, Props, Theme>,
  Props = unknown,
  C extends string = Extract<keyof TStyle, string>
>(
  style: (TStyle & Styles<C, Props, Theme>) | ((theme: Theme) => TStyle & Styles<C, Props, Theme>),
  options?: CreateUseStylesOptions
): (data?: Props & { theme?: Theme }) => Classes<C> {
  return reactJssCreateUseStyles<string, Props, Theme>((style as unknown) as Styles, {
    theming,
    ...options
  }) as (data?: Props & { theme?: Theme }) => Classes<C>;
}
