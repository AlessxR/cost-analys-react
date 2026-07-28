import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { ColorModeProvider } from './color-mode';

interface ProviderProps {
    children: React.ReactNode;
}

export const Provider = (props: ProviderProps) => (
    <ChakraProvider value={defaultSystem}>
        <ColorModeProvider {...props} />
    </ChakraProvider>
);
