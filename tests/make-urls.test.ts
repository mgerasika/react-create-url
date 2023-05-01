import { expect } from "@jest/globals";
import { createUrls } from "../src/create-urls.util";
import { EMPTY_URL_ITEM } from "../src/empty-url-item.constant";
import { IUrlItem } from "../src/url-item.interface";

interface IAppRoute {
  index: {
    id1: (id?: string) => {
      id2: (id?: string) => IUrlItem;
    };
  };
  auth: {
    account: {
      id: (id?: string) => IUrlItem;
    };
    login: IUrlItem;
  };
}

const appRoutes = createUrls<IAppRoute>({
  index: {
    id1: (id?: string) => ({
      id2: (id?: string) => EMPTY_URL_ITEM,
    }),
  },
  auth: {
    login: EMPTY_URL_ITEM,
    account: {
      id: (id?: string) => EMPTY_URL_ITEM,
    },
  },
});
describe("make-urls", () => {
  it("my-test", () => {
    expect(appRoutes.index.toString()).toEqual("/");
    expect(appRoutes.index.id1().toString()).toEqual("/:id1");
    expect(appRoutes.index.id1().id2().toString()).toEqual("/:id1/:id2");
    expect(appRoutes.auth.toString()).toEqual("/auth");
    expect(appRoutes.auth.toString()).toEqual("/auth");
    expect(appRoutes.auth.login.toString()).toEqual("/auth/login");
    expect(appRoutes.auth.account.id().toString()).toEqual("/auth/account/:id");
    expect(
      appRoutes.auth.account
        .id("e87a8340-1a81-4013-a8c8-c5ab8ec205ea")
        .toString()
    ).toEqual("/auth/account/e87a8340-1a81-4013-a8c8-c5ab8ec205ea");
  });
});
