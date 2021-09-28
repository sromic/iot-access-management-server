export type Maybe<T> = T | undefined;

export type ValueOf<T> = T extends any[] ? T[number] : T[keyof T];
