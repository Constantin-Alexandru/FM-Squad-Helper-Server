// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export default class Logging {
  public static log = (args: any): void => this.info(args);

  public static info = (args: any): void => {
    console.log(
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      `\x1b[38;5;20m[${new Date().toLocaleString()}] [INFO]: \x1b[0m${args}`
    );
  };

  public static success = (args: any): void => {
    console.log(
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      `\x1b[38;5;46m[${new Date().toLocaleString()}] [WARN]: \x1b[38;5;46m${args}\x1b[0m`
    );
  };

  public static warn = (args: any): void => {
    console.log(
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      `\x1b[38;5;226m[${new Date().toLocaleString()}] [WARN]: \x1b[38;5;11m${args}\x1b[0m`
    );
  };

  public static error = (args: any): void => {
    console.log(
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      `\x1b[38;5;124m[${new Date().toLocaleString()}] [ERROR]: \x1b[38;5;196m${args}\x1b[0m`
    );
  };
}
