declare namespace DataEdgeModuleCssNamespace {
  export interface IDataEdgeModuleCss {
    line: string;
    triangle: string;
  }
}

declare const DataEdgeModuleCssModule: DataEdgeModuleCssNamespace.IDataEdgeModuleCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: DataEdgeModuleCssNamespace.IDataEdgeModuleCss;
};

export = DataEdgeModuleCssModule;
