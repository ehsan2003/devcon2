declare type KeyValuePair<T = any> = {
    [p: string]: T
};
declare type ArrayType<arr extends unknown[]> = arr extends (infer R)[] ? R : never;