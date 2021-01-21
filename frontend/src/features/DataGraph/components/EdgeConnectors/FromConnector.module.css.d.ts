declare namespace FromConnectorModuleCssNamespace {
  export interface IFromConnectorModuleCss {
    connector: string;
  }
}

declare const FromConnectorModuleCssModule: FromConnectorModuleCssNamespace.IFromConnectorModuleCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: FromConnectorModuleCssNamespace.IFromConnectorModuleCss;
};

export = FromConnectorModuleCssModule;
