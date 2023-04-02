export interface IUrlItem {
    toString: () => string;
    formattedName?: string;
}
export declare class UrlItem implements IUrlItem {
    name: string;
    formattedName: string;
    parent: UrlItem | undefined;
    private _canFormatRouteName?;
    toJSON(): string;
    constructor(name: string, parent?: UrlItem | undefined, routes?: unknown, canFormatRouteName?: boolean);
    toString(): string;
}
export declare function createUrl<T>(routes: T): T;
export declare const EMPTY_URL_ITEM: IUrlItem;
