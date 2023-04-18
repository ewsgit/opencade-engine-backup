interface OCObject {
  position: {
    x: number;
    y: number;
  };
  size: {
    width: number;
    height: number;
  };
  hooks: {
    [hookName: string]: (args: any[]) => void;
  };
  parameters: {
    // TODO: add some default parameters here

    // allows custom later-defined parameters
    [name: string]: unknown;
  };
}

export { type OCObject };
