declare global {
    type KeysTo<T, T2> = {
        [P in keyof T]: T[P] extends object ? KeysTo<T[P], any> : T2;
    };
    type DeepPartial<T> = {
        [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
    };
}
export { };
