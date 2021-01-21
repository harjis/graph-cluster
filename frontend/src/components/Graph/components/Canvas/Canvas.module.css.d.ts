declare namespace CanvasModuleCssNamespace {
  export interface ICanvasModuleCss {
    container: string;
  }
}

declare const CanvasModuleCssModule: CanvasModuleCssNamespace.ICanvasModuleCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: CanvasModuleCssNamespace.ICanvasModuleCss;
};

export = CanvasModuleCssModule;
