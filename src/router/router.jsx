import App from '@/App';

import { MainPage, TransactionsPage } from '@/pages';

import { NotFound } from '@/components/NotFound';

import { createBrowserRouter } from 'react-router';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            { index: true, element: <MainPage /> },
            { path: 'transactions', element: <TransactionsPage /> },
            { path: '*', element: <NotFound /> },
        ],
    },
]);
