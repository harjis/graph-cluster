declare namespace ToConnectorModuleCssNamespace {
  export interface IToConnectorModuleCss {
    canConnect: string;
    connectedConnector: string;
    connector: string;
  }
}

declare const ToConnectorModuleCssModule: ToConnectorModuleCssNamespace.IToConnectorModuleCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: ToConnectorModuleCssNamespace.IToConnectorModuleCss;
};

export = ToConnectorModuleCssModule;
