declare namespace OutputNodeModuleCssNamespace {
  export interface IOutputNodeModuleCss {
    nodeRefNodeBottomText: string;
    outputNode: string;
  }
}

declare const OutputNodeModuleCssModule: OutputNodeModuleCssNamespace.IOutputNodeModuleCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: OutputNodeModuleCssNamespace.IOutputNodeModuleCss;
};

export = OutputNodeModuleCssModule;
