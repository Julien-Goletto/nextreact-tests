import { ThemeContextProvider } from "../components/theme/ThemeProvider";
import { UserContextProvider } from "../components/user/UserProvider";
import { setup } from "./setup";
import type { PropsWithChildren, ReactElement } from "react";

const Wrapper = (props: PropsWithChildren) => {
  return (
    <ThemeContextProvider>
      <UserContextProvider>
        {props.children}
      </UserContextProvider>
    </ThemeContextProvider>
  );
};

export const renderApp = (ui: ReactElement, options?: any) => {
  return setup(ui, {wrapper: Wrapper, ...options});
};