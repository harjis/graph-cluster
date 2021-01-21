declare namespace NodeActionBarModuleCssNamespace {
  export interface INodeActionBarModuleCss {
    container: string;
    leftContainer: string;
  }
}

declare const NodeActionBarModuleCssModule: NodeActionBarModuleCssNamespace.INodeActionBarModuleCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: NodeActionBarModuleCssNamespace.INodeActionBarModuleCss;
};

export = NodeActionBarModuleCssModule;
