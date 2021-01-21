declare namespace DataEdgeInProgressModuleCssNamespace {
  export interface IDataEdgeInProgressModuleCss {
    container: string;
    line: string;
    triangle: string;
  }
}

declare const DataEdgeInProgressModuleCssModule: DataEdgeInProgressModuleCssNamespace.IDataEdgeInProgressModuleCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: DataEdgeInProgressModuleCssNamespace.IDataEdgeInProgressModuleCss;
};

export = DataEdgeInProgressModuleCssModule;
