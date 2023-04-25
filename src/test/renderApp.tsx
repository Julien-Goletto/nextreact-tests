import type{ RenderOptions } from "@testing-library/react";
import { ThemeContextProvider } from "../components/theme/ThemeProvider";
import { UserContextProvider } from "../components/user/UserProvider";
import { setup } from "./setup";
import type { PropsWithChildren, ReactElement } from "react";

type WrapperProps = {
  test?: 'test';
}

const Wrapper = (props: PropsWithChildren<WrapperProps>) => {
  return (
    <ThemeContextProvider>
      <UserContextProvider>
        {props.children}
      </UserContextProvider>
    </ThemeContextProvider>
  );
};

export const renderApp = (ui: ReactElement, options?: Omit<RenderOptions, 'queries' | 'wrapper'> & { test: 'test'}) => {
  return setup(ui, {wrapper: ({children}) => 
    <Wrapper test={options?.test}>{children}</Wrapper>, 
    ...options,
  });
};