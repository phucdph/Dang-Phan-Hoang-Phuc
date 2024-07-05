import {
  UseQueryOptions,
  useMutation,
  useQuery,
  UseMutationOptions,
} from "@tanstack/react-query";
import { getTokens, swapTokens } from "./services/token";
import { SwapToken, Token } from "./services/typings";
import { useCallback, useMemo } from "react";

export function useTokens(
  config: Omit<UseQueryOptions<Token[]>, "queryKey" | "queryFn"> = {}
) {
  return useQuery({
    queryKey: ["tokens"],
    queryFn: getTokens,
    ...config,
  });
}

export const useGetExchangeRate = () => {
  const { data } = useTokens();
  const tokenByCurrency = useMemo(
    () =>
      data?.reduce((acc: Record<string, Token>, token) => {
        acc[token.currency] = token;
        return acc;
      }, {}),
    [data]
  );

  return useCallback(
    (from: string, to: string) => {
      const fromPrice = tokenByCurrency?.[from]?.price || 0;
      const toPrice = tokenByCurrency?.[to]?.price || 0;
      return toPrice / fromPrice;
    },
    [tokenByCurrency]
  );
};

export const useSwap = (
  options: Omit<
    UseMutationOptions<SwapToken, never, SwapToken>,
    "mutationFn"
  > = {}
) => {
  return useMutation({
    mutationFn: swapTokens,
    ...options,
  });
};
