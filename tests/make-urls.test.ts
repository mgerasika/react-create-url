import { expect } from "@jest/globals";
import { createUrls } from "../src/create-urls.util";
import { EMPTY_URL_ITEM } from "../src/empty-url-item.constant";
import { IUrlItem } from "../src/url-item.interface";

interface IAppRoute {
  auth: {
    account: {
      id: (id?: string) => IUrlItem;
    };
    login: IUrlItem;
  };
}

const appRoutes = createUrls<IAppRoute>({
  auth: {
    login: EMPTY_URL_ITEM,
    account: {
      id: (id?: string) => EMPTY_URL_ITEM,
    },
  },
});
describe("make-urls", () => {
  it("my-test", () => {
    expect(appRoutes.auth.toString()).toEqual("/auth");
    expect(appRoutes.auth.login.toString()).toEqual("/auth/login");
    expect(appRoutes.auth.account.id().toString()).toEqual("/auth/check/:id");
    expect(
      appRoutes.auth.account
        .id("e87a8340-1a81-4013-a8c8-c5ab8ec205ea")
        .toString()
    ).toEqual("/auth/check/e87a8340-1a81-4013-a8c8-c5ab8ec205ea");
  });
});
