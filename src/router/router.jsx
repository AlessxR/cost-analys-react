import App from '@/App';
import { NotFound } from '@/components/NotFound/NotFound';
import { MainPage } from '@/pages/MainPage/MainPage';
import { TransactionsPage } from '@/pages/TransactionsPage/TransactionsPage';

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
