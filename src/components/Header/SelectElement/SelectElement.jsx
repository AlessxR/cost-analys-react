import { Portal, Select } from '@chakra-ui/react';

export const SelectElement = ({ data, selectPlaceholder, name }) => {
    return (
        <Select.Root collection={data} size="sm" width={{ base: '100%', md: '320px' }}>
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
                        {data.items.map((item) => (
                            <Select.Item item={item} key={item.value}>
                                {item.label}
                                <Select.ItemIndicator />
                            </Select.Item>
                        ))}
                    </Select.Content>
                </Select.Positioner>
            </Portal>
        </Select.Root>
    );
};
