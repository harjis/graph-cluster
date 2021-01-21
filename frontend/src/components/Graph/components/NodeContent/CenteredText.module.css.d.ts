declare namespace CenteredTextModuleCssNamespace {
  export interface ICenteredTextModuleCss {
    text: string;
  }
}

declare const CenteredTextModuleCssModule: CenteredTextModuleCssNamespace.ICenteredTextModuleCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: CenteredTextModuleCssNamespace.ICenteredTextModuleCss;
};

export = CenteredTextModuleCssModule;
