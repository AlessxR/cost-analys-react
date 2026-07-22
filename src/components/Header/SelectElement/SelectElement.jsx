import { Portal, Select } from '@chakra-ui/react';

export const SelectElement = ({ data, selectPlaceholder, name }) => {
    return (
        <Select.Root collection={data} size="sm" width="320px">
            <Select.HiddenSelect name={name} />
            <Select.Control>
                <Select.Trigger>
                    <Select.ValueText placeholder={selectPlaceholder} />
                </Select.Trigger>
                <Select.IndicatorGroup>
                    <Select.Indicator />
                </Select.IndicatorGroup>
            </Select.Control>
            <Portal>
                <Select.Positioner>
                    <Select.Content>
                        {data.items.map((data) => (
                            <Select.Item item={data} key={data.value}>
                                {data.label}
                                <Select.ItemIndicator />
                            </Select.Item>
                        ))}
                    </Select.Content>
                </Select.Positioner>
            </Portal>
        </Select.Root>
    );
};
