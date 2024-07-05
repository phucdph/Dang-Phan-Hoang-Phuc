export interface Token {
  currency: string;
  price: number;
  date: string;
}

export interface SwapToken {
  from: string;
  to: string;
  amount: number;
}
