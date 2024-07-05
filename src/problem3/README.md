# Messy React

## Issues

- Interfaces 'WalletBalance' and `FormattedWalletBalance` was duplicated and also missing `blockchain` field.
- `getPriority` does not using any React Feature. So it should be place outside component.
- Missing case `return 0;` on `sort` function.
- `index` should not be the key of `WalletRow`.
- `children` props was not used. So the type of component should not be `React.FC`.
- Assume `balances` and `prices` was received from API. Not sure about the availablity of it. So should use optional chaining.


## Original Code

```tsx
interface WalletBalance {
  currency: string;
  amount: number;
}
interface FormattedWalletBalance {
  currency: string;
  amount: number;
  formatted: string;
}

interface Props extends BoxProps {}
const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

  const getPriority = (blockchain: any): number => {
    switch (blockchain) {
      case "Osmosis":
        return 100;
      case "Ethereum":
        return 50;
      case "Arbitrum":
        return 30;
      case "Zilliqa":
        return 20;
      case "Neo":
        return 20;
      default:
        return -99;
    }
  };

  const sortedBalances = useMemo(() => {
    return balances
      .filter((balance: WalletBalance) => {
        const balancePriority = getPriority(balance.blockchain);
        if (lhsPriority > -99) {
          if (balance.amount <= 0) {
            return true;
          }
        }
        return false;
      })
      .sort((lhs: WalletBalance, rhs: WalletBalance) => {
        const leftPriority = getPriority(lhs.blockchain);
        const rightPriority = getPriority(rhs.blockchain);
        if (leftPriority > rightPriority) {
          return -1;
        } else if (rightPriority > leftPriority) {
          return 1;
        }
      });
  }, [balances, prices]);

  const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
    return {
      ...balance,
      formatted: balance.amount.toFixed(),
    };
  });

  const rows = sortedBalances.map(
    (balance: FormattedWalletBalance, index: number) => {
      const usdValue = prices[balance.currency] * balance.amount;
      return (
        <WalletRow
          className={classes.row}
          key={index}
          amount={balance.amount}
          usdValue={usdValue}
          formattedAmount={balance.formatted}
        />
      );
    }
  );

  return <div {...rest}>{rows}</div>;
};
```

## Refactored code

```tsx
interface WalletBalance {
  currency: string;
  amount: number;
  // add blockchain field
  blockchain: string;
}

// Define a type for `usePrices`
type PriceMap = Record<string, number>;

// Define the blockchain priority map.
const blockchainPriorityMap = {
  Osmosis: 100,
  Ethereum: 50,
  Arbitrum: 30,
  Zilliqa: 20,
  Neo: 20,
};

// Move getPriority to outside the component
const getPriority = (blockchain: string) => {
  return blockchainPriority[blockchain] || -99;
};

const WalletPage = (props: BoxProps) => {
  const balances = useWalletBalances(); // assume that useWalletBalances already return correct type: WalletBalance[]
  const prices = usePrices(); // assume that useWalletBalances already return correct type: PriceMap

  const sortedBalances = useMemo(
    () =>
      // Using optional chaining because not sure balances is ready or not.
      balances
        // No need to define a type for balance here because TS already infer it
        ?.filter(
          (balance) =>
            getPriority(balance.blockchain) > -99 && balance.amount > 0
        )
        ?.sort(
          // No need to define types for args here because TS already infer it
          (first, second) =>
            getPriority(first.blockchain) - getPriority(second.blockchain)
        ),
    [balances]
  );

  // No need to define types for balance here because TS already infer it
  const rows = sortedBalances?.map((balance) => {
    // These calulcate is lightweight so it can be place here. If it is heavy, move it to WalletRow and memorize it
    // Not sure prices have that currency or not so should have fallback value here.
    const usdValue = (prices?.[balance.currency] ?? 0) * balance.amount;
    const formattedAmount = balance.amount.toFixed();
    return (
      // WalletRow should be a pure component and memorized.
      <WalletRow
        // Combine blockchain and currency to create a key. Because there might be duplicated.
        key={`${balance.blockchain} - ${balance.currency}`}
        className={classes.row}
        amount={balance.amount}
        usdValue={usdValue}
        formattedAmount={formattedAmount}
      />
    );
  });

  return <div {...props}>{rows}</div>;
};
```
