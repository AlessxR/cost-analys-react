import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { ColorModeProvider } from './color-mode';

export const Provider = (props) => (
    <ChakraProvider value={defaultSystem}>
        <ColorModeProvider {...props} />
    </ChakraProvider>
);
