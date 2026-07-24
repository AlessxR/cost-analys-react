import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { ColorModeProvider } from './color-mode';

export const Provider = (props: any) => (
    <ChakraProvider value={defaultSystem}>
        <ColorModeProvider {...props} />
    </ChakraProvider>
);
