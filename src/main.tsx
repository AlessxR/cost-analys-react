import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';
import { Provider as ReduxProvider } from 'react-redux';
import { Provider as ChakraProvider } from '@/components/ui/provider';

import store from './store';
import { router } from './router/router';

createRoot(document.getElementById('root')!).render(
    <ChakraProvider>
        <ReduxProvider store={store}>
            <StrictMode>
                <RouterProvider router={router} />
            </StrictMode>
        </ReduxProvider>
    </ChakraProvider>,
);
