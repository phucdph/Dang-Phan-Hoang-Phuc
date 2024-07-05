import {
  Center,
  Group,
  Space,
  NumberInput,
  Button,
  Paper,
  Stack,
  ActionIcon,
} from "@mantine/core";
import TokenSelect from "../../components/TokenSelect";
import { useState } from "react";
import { useGetExchangeRate, useSwap } from "../../hooks";
import { IconExchange } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";

const Home = () => {
  const [tokenFrom, setTokenFrom] = useState<string>("ETH");
  const [valueFrom, setValueFrom] = useState<number>(0);

  const [tokenTo, setTokenTo] = useState<string>("USD");
  const [valueTo, setValueTo] = useState<number>(0);

  const getExchangeRate = useGetExchangeRate();

  const handleValueFromChange = (value: number) => {
    const exchangeRate = getExchangeRate(tokenTo, tokenFrom);
    setValueFrom(value);
    setValueTo(value * exchangeRate);
  };

  const handleValueToChange = (value: number) => {
    const exchangeRate = getExchangeRate(tokenTo, tokenFrom);
    setValueTo(value);
    setValueFrom(value / exchangeRate);
  };

  const handleTokenFromChange = (token: string) => {
    setTokenFrom(token);
    const exchangeRate = getExchangeRate(tokenTo, token);
    setValueTo(valueFrom * exchangeRate);
  };

  const handleTokenToChange = (token: string) => {
    setTokenTo(token);
    const exchangeRate = getExchangeRate(token, tokenFrom);
    setValueFrom(valueTo / exchangeRate);
  };

  const handleExchange = () => {
    setValueFrom(valueTo);
    setValueTo(valueFrom);
    setTokenFrom(tokenTo);
    setTokenTo(tokenFrom);
  };

  const { mutate, isPending: isSwapping } = useSwap({
    onSuccess: () => {
      notifications.show({
        title: "Swap successful",
        message: "Tokens swapped successfully",
        variant: "light",
      });
    },
  });

  const handleSwap = () => {
    if (!tokenFrom || !tokenTo || !valueFrom || !valueTo) {
      notifications.show({
        title: "Error",
        message: "Please select tokens and enter amounts to swap",
        variant: "light",
        color: "red",
      });
      return;
    }
    mutate({ from: tokenFrom, to: tokenTo, amount: Number(valueFrom) });
  };

  return (
    <Center w="100vw" h="100vh">
      <Paper p="lg" bg="dark.6" shadow="md">
        <Group gap="sm">
          <Stack>
            <Group gap="sm">
              <TokenSelect value={tokenFrom} onChange={handleTokenFromChange} />
              <NumberInput
                size="lg"
                w={400}
                value={valueFrom}
                onChange={(value: string | number) =>
                  handleValueFromChange(value as number)
                }
                placeholder="Amount"
                min={0}
                thousandSeparator=","
              />
            </Group>
            <Group gap="sm">
              <TokenSelect value={tokenTo} onChange={handleTokenToChange} />
              <NumberInput
                size="lg"
                w={400}
                value={valueTo}
                onChange={(value: string | number) =>
                  handleValueToChange(value as number)
                }
                placeholder="Amount"
                min={0}
                thousandSeparator=","
              />
            </Group>
          </Stack>
          <ActionIcon
            variant="light"
            radius="xl"
            size="xl"
            aria-label="Exchange tokens"
            onClick={handleExchange}
            data-testid="exchange-btn"
          >
            <IconExchange style={{ width: "70%", height: "70%" }} />
          </ActionIcon>
        </Group>
        <Space h="sm" />
        <Button
          size="lg"
          fullWidth
          onClick={handleSwap}
          loading={isSwapping}
          disabled={isSwapping}
        >
          Swap
        </Button>
      </Paper>
    </Center>
  );
};

export default Home;
