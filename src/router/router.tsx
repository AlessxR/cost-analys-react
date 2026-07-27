import { createBrowserRouter } from 'react-router';

import App from '@/App';
import { MainPage, TransactionsPage } from '@/pages';
import { NotFound } from '@/components/NotFound';


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
