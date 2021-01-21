declare namespace DataGraphModuleCssNamespace {
  export interface IDataGraphModuleCss {
    canvasContainer: string;
    container: string;
  }
}

declare const DataGraphModuleCssModule: DataGraphModuleCssNamespace.IDataGraphModuleCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: DataGraphModuleCssNamespace.IDataGraphModuleCss;
};

export = DataGraphModuleCssModule;
