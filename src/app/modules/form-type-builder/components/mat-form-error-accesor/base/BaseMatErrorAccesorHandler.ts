export abstract class BaseMatErrorAccesorHandler<T = any> {

  public __errors: any = {};
  public __contractErrors: any = {};

  setFormErrors(config: any) {
    this.__errors = config;
  }
  setContractErrors<L>(config: { [p in keyof L]: any });
  setContractErrors(config: { [key: string]: any }) {
    this.__contractErrors = config;
  }
}
