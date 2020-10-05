import {MapDispatchToProps} from "react-redux";

export type dispatchType<T extends MapDispatchToProps<any, any>> = T extends MapDispatchToProps<infer TDispatchProps, any> ? TDispatchProps : never;
