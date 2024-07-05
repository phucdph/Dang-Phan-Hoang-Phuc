import {
  Group,
  Modal,
  Text,
  TextInput,
  Stack,
  Button,
  Menu,
  Box,
} from "@mantine/core";
import { useTokens } from "../hooks";
import { Token } from "../services/typings";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useMemo, useState } from "react";
import { IconChevronDown, IconCheck } from "@tabler/icons-react";
import TokenIcon from "./TokenIcon";

interface TokenSelectProps {
  value?: string;
  onChange?: (value: string) => void;
}

const TokenSelect = (props: TokenSelectProps) => {
  const { value, onChange } = props;
  const [opened, { open, close }] = useDisclosure(false);
  const { data } = useTokens({ enabled: opened });

  const handleSelect = (token: Token) => {
    onChange?.(token.currency);
    close();
  };

  const [searchText, setSearchText] = useState("");

  const filteredData = useMemo(
    () =>
      data?.filter((token) =>
        token.currency.toLowerCase().includes(searchText.toLowerCase())
      ),
    [data, searchText]
  );

  useEffect(() => {
    if (!opened) {
      setSearchText("");
    }
  }, [opened]);

  return (
    <>
      <Button
        w={180}
        size="lg"
        variant="light"
        rightSection={<IconChevronDown size={14} />}
        onClick={open}
      >
        {value ? (
          <Group gap="xs">
            <TokenIcon token={value} radius="xl" size={24} />
            <Text>{value}</Text>
          </Group>
        ) : (
          "Select Token"
        )}
      </Button>
      <Modal opened={opened} onClose={close} title="Select Token">
        <TextInput
          data-autofocus
          placeholder="Search"
          value={searchText}
          onChange={(event) => setSearchText(event.currentTarget.value)}
          mb="xs"
        />
        <Box h="70vh" style={{ overflowY: "auto" }}>
          <Menu>
            {filteredData?.map((option) => (
              <Menu.Item
                key={option.currency}
                onClick={() => handleSelect(option)}
                leftSection={<TokenIcon radius="xl" token={option.currency} />}
                rightSection={
                  value === option.currency ? <IconCheck size={24} /> : null
                }
                pt="xs"
                pb="xs"
                styles={{
                  item: {
                    "&:hover": {
                      backgroundColor: "red",
                    },
                  },
                }}
              >
                <Stack gap={0}>
                  <Text size="sm" fw={500}>
                    {option.currency}
                  </Text>
                  <Text c="dimmed" size="xs">
                    {option.price}
                  </Text>
                </Stack>
              </Menu.Item>
            ))}
          </Menu>
        </Box>
      </Modal>
    </>
  );
};

export default TokenSelect;
