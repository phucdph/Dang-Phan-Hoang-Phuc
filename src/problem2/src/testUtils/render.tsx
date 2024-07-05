import { render as testingLibraryRender } from "@testing-library/react";
import { MantineProvider } from "@mantine/core";
import theme from "../theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Notifications } from "@mantine/notifications";

function renderWithTheme(
  ui: React.ReactNode
): ReturnType<typeof testingLibraryRender> {
  return testingLibraryRender(<>{ui}</>, {
    wrapper: ({ children }: { children: React.ReactNode }) => (
      <MantineProvider theme={theme}>
        <Notifications />
        {children}
      </MantineProvider>
    ),
  });
}

const client = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

function renderWithReactQuery(
  ui: React.ReactNode,
  rqClient: QueryClient = client
): ReturnType<typeof testingLibraryRender> {
  return testingLibraryRender(<>{ui}</>, {
    wrapper: ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={rqClient}>
        <MantineProvider theme={theme}>
          <Notifications />
          {children}
        </MantineProvider>
      </QueryClientProvider>
    ),
  });
}

export { renderWithTheme, renderWithReactQuery };
