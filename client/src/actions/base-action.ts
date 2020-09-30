export interface BaseAction<TypeString extends string> {
    type: TypeString;
}

export type AllActions = never;