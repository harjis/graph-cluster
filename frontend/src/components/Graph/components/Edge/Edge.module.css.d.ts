declare namespace EdgeModuleCssNamespace {
  export interface IEdgeModuleCss {
    default: string;
  }
}

declare const EdgeModuleCssModule: EdgeModuleCssNamespace.IEdgeModuleCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: EdgeModuleCssNamespace.IEdgeModuleCss;
};

export = EdgeModuleCssModule;
