declare namespace InputNodeModuleCssNamespace {
  export interface IInputNodeModuleCss {
    inputNode: string;
  }
}

declare const InputNodeModuleCssModule: InputNodeModuleCssNamespace.IInputNodeModuleCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: InputNodeModuleCssNamespace.IInputNodeModuleCss;
};

export = InputNodeModuleCssModule;
