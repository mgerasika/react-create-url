import { UrlItem } from "./url-item.class";

export function createUrls<T>(routes: T): T {
  return new UrlItem("", undefined, routes, true) as unknown as T;
}
