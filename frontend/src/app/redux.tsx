import { ReactNode, useRef } from "react";
import { setupListeners } from "@reduxjs/toolkit/query";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  Provider,
  useSelector,
  useDispatch,
  TypedUseSelectorHook,
} from "react-redux";
import {
  persistReducer,
  persistStore,
  REGISTER,
  PERSIST,
  PURGE,
  PAUSE,
  FLUSH,
  REHYDRATE,
} from "redux-persist";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import { PersistGate } from "redux-persist/integration/react";
import globalReducer from "@/state";
import { api } from "@/state/api";

//used to prevent the app from trying to access something like localstorage while in ssr
const createNoOpStorage = () => {
    return {
      getItem: (_: any) => Promise.resolve(null),
      setItem: (_: any) => Promise.resolve(),
      removeItem: (_: any) => Promise.resolve(),
    };
  };
  

const storage =
  typeof window === "undefined" //only undefined when in ssr because there is no window object
    ? createNoOpStorage()
    : createWebStorage("local");

const persistConfig = {
  timeout:10,
  key: "root",
  storage,
  whitelist: ["global"], //only global reducer is persisted
};

const rootReducer = combineReducers({
  global: globalReducer,
  [api.reducerPath]: api.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const makeStore = () => {
  return configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(api.middleware),
  });
};

//redux types
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default function StoreProvider({ children }: { children: ReactNode }) {
  const storeRef = useRef<AppStore>(); //to make sure store is created  only once
  if (!storeRef.current) {
    storeRef.current = makeStore();
    setupListeners(storeRef.current.dispatch);
  }
  const persistor = persistStore(storeRef.current);
  //PersistGate prevents children from being rendered until the persisted state is rehydrated
  return (
    <Provider store={storeRef.current}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
