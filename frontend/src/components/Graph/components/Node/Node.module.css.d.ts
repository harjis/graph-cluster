declare namespace NodeModuleCssNamespace {
  export interface INodeModuleCss {
    container: string;
  }
}

declare const NodeModuleCssModule: NodeModuleCssNamespace.INodeModuleCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: NodeModuleCssNamespace.INodeModuleCss;
};

export = NodeModuleCssModule;
