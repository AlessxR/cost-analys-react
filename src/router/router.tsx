import { createBrowserRouter } from 'react-router';

import App from '@/App';

import { MainPage, TransactionsPage } from '@/pages';

import { ErrorElement, NotFound } from '@/components';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                index: true,
                element: <MainPage />,
                errorElement: <ErrorElement />,
            },
            {
                path: 'transactions',
                element: <TransactionsPage />,
                errorElement: <ErrorElement />,
            },
            { path: '*', element: <NotFound /> },
        ],
    },
]);
