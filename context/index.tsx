import { Dispatch, ReactNode, createContext, useReducer } from "react";

type InitialState = {
  latLong: string;
  coffeeStores: any[];
};

type Actions = {
  type: "latLong" | "coffeeStores";
  payload: {
    latLong?: string;
    coffeeStores?: any[];
  };
};

type StoreContext = {
  store: InitialState;
  dispatch: Dispatch<Actions>;
};

export const StoreContext = createContext<StoreContext>({} as null);

const initialState: InitialState = {
  latLong: "",
  coffeeStores: [],
};

const reducerHandler = (state: InitialState, { type, payload }: Actions) => {
  if (type === "latLong") return { ...state, latLong: payload.latLong };

  if (type === "coffeeStores") return { ...state, coffeeStores: payload.coffeeStores };

  return state;
};

const StoreProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  const [store, dispatch] = useReducer(reducerHandler, initialState);

  return <StoreContext.Provider value={{ store, dispatch }}>{children}</StoreContext.Provider>;
};

export default StoreProvider;
