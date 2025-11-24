import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      refetchOnMount: true,
    },
    mutations: {
      retry: false,
      onError: (error, variables, context) => {
        console.log(
          `error on : ${error} with variables: ${variables} and context: ${context}`
        );
      },
    },
  },
});
