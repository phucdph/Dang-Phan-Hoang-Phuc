import { SwapToken, Token } from "./typings";

export const getTokens = async (): Promise<Token[]> => {
  const res = await fetch("https://interview.switcheo.com/prices.json");
  const data: Token[] = await res.json();
  return Array.from(new Set(data?.map((item) => item.currency))).map(
    (currency) => data.find((item) => item.currency === currency) as Token
  );
};

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const swapTokens = async (req: SwapToken) => {
  await wait(1000);
  return Promise.resolve(req);
};
