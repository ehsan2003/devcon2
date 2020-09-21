export interface BaseAction<TypeName extends string> {
    type: TypeName;
}