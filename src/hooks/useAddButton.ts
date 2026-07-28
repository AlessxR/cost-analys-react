import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { formatDateToString } from '@/lib/utils';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { postTransaction } from '@/store/transaction-slice';
import { toaster } from '@/components/ui/toaster';

export type FormValues = {
    title: string;
    category: string;
    amount: string;
    date: string;
};

export const useAddButton = () => {
    const dispatch = useAppDispatch();
    const { postStatus } = useAppSelector((state) => state.transactions);

    const [isOpen, setIsOpen] = useState(false);

    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm<FormValues>({
        defaultValues: {
            title: '',
            category: '',
            amount: '',
            date: '',
        },
    });

    const onSubmit = async (data: FormValues) => {
        try {
            await dispatch(
                postTransaction({
                    title: data.title,
                    category: data.category,
                    amount: -Number(data.amount),
                    date: formatDateToString(data.date),
                }),
            ).unwrap();

            reset();
            setIsOpen(false);
        } catch (e) {
            const message =
                e instanceof Error ? e.message : 'Не вдалося додати транзакцію';

            toaster.create({
                title: 'Помилка',
                description: message,
                closable: true,
            });

            console.error('Не вдалося додати транзакцію:', e);
        }
    };

    return {
        register,
        handleSubmit,
        reset,
        onSubmit,
        setIsOpen,
        postStatus,
        isOpen,
        errors,
        control,
    };
};
