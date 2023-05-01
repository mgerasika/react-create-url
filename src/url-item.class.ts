import { IDictionary } from "./dictionary.interface";
import { formatUrlName } from "./format-url-name.utils";
import { IUrlItem } from "./url-item.interface";

export class UrlItem implements IUrlItem {
  public name = "";
  public formattedName = "";
  public parent: UrlItem | undefined = undefined;
  private _canFormatRouteName? = true;

  toJSON(): string {
    return this.toString();
  }

  constructor(
    name: string,
    parent?: UrlItem | undefined,
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    routes?: unknown,
    canFormatRouteName?: boolean
  ) {
    this.name = name;
    this.formattedName = canFormatRouteName ? formatUrlName(name) : name;

    this.parent = parent;
    this._canFormatRouteName = canFormatRouteName;
    if (routes && typeof routes === "object") {
      const keys = Object.keys(routes);
      keys.forEach((key) => {
        const value = (routes as any)[key];
        const self = this as unknown as IDictionary;
        if (typeof value === "function" && key.startsWith("external_")) {
          self[key] = (arg1: string, arg2: string, arg3: string): UrlItem => {
            return value(arg1, arg2, arg3);
          };
        } else if (typeof value === "function") {
          const subRoutes = value();
          self[key] = (arg: string): UrlItem => {
            //if argument not passed into function - then add ':' symbol before key.
            return new UrlItem(arg || ":" + key, this, subRoutes, false);
          };
        } else if (value instanceof UrlItem) {
          self[key] = value.name;
        } else {
          self[key] = new UrlItem(key, this, value, true);
        }
      });
    }
  }

  toString(): string {
    const name = this._canFormatRouteName
      ? formatUrlName(this.name)
      : this.name;
    if (this.parent?.name == "index") {
      return this.parent + name;
    }
    return this.parent ? this.parent + "/" + name : name;
  }
}
