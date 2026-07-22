import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';
import { Provider as ReduxProvider } from 'react-redux';
import { Provider as ChakraProvider } from '@/components/ui/provider';

import { router } from './router/router.jsx';
import store from './store';

createRoot(document.getElementById('root')).render(
    <ReduxProvider store={store}>
        <StrictMode>
            <ChakraProvider>
                <RouterProvider router={router} />
            </ChakraProvider>
        </StrictMode>
    </ReduxProvider>,
);
