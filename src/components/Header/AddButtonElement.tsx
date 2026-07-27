import { useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { postTransaction } from '@/store/transaction-slice';

import { formatDateToString } from '@/lib/utils';

import { FiPlus } from 'react-icons/fi';

import {
    Button,
    Dialog,
    Field,
    Input,
    Portal,
    Stack,
    Text,
} from '@chakra-ui/react';

import { SelectCategory } from '..';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

type FormValues = {
    id: number;
    title: string;
    category: string;
    amount: string | number;
    date: string;
};

export const AddButtonElement = () => {
    const dispatch = useAppDispatch();
    const { postStatus } = useAppSelector((state) => state.transactions);
    const ref = useRef<HTMLInputElement | null>(null);
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
    };

    return (
        <Dialog.Root
            open={isOpen}
            onOpenChange={(e) => {
                setIsOpen(e.open);
                if (!e.open) reset();
            }}
            initialFocusEl={() => ref.current}
        >
            <Dialog.Trigger bgColor="white" asChild>
                <Button color="black" variant="outline" whiteSpace="nowrap">
                    <FiPlus />
                    <Text display={{ base: 'none', md: 'inline' }}>
                        Додати операцію
                    </Text>
                    <Text display={{ base: 'inline', md: 'none' }}>Додати</Text>
                </Button>
            </Dialog.Trigger>

            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content
                        maxW={{ base: 'calc(100vw - 32px)', md: 'md' }}
                    >
                        <Dialog.Header>
                            <Dialog.Title>Нова операція</Dialog.Title>
                        </Dialog.Header>
                        <form
                            id="add-operation-form"
                            onSubmit={handleSubmit(onSubmit)}
                            noValidate
                        >
                            <Dialog.Body pb="4">
                                <Stack gap="4">
                                    <Field.Root
                                        required
                                        invalid={!!errors.title}
                                    >
                                        <Field.Label>Опис</Field.Label>
                                        <Input
                                            placeholder="Опис покупки..."
                                            {...register('title', {
                                                required: 'Вкажіть опис',
                                            })}
                                        />
                                        {errors.title && (
                                            <Field.ErrorText>
                                                {errors.title.message}
                                            </Field.ErrorText>
                                        )}
                                    </Field.Root>

                                    <Field.Root
                                        required
                                        invalid={!!errors.category}
                                    >
                                        <Field.Label>Категорія</Field.Label>
                                        <Controller
                                            name="category"
                                            control={control}
                                            rules={{
                                                required: 'Виберіть категорію',
                                            }}
                                            render={({ field }) => (
                                                <SelectCategory
                                                    name={field.name}
                                                    value={
                                                        field.value
                                                            ? [field.value]
                                                            : []
                                                    }
                                                    onValueChange={(details) =>
                                                        field.onChange(
                                                            details.value[0] ??
                                                                '',
                                                        )
                                                    }
                                                />
                                            )}
                                        />
                                        {errors.category && (
                                            <Field.ErrorText>
                                                {errors.category.message}
                                            </Field.ErrorText>
                                        )}
                                    </Field.Root>

                                    <Field.Root
                                        required
                                        invalid={!!errors.amount}
                                    >
                                        <Field.Label>Сума, ₴</Field.Label>
                                        <Input
                                            type="number"
                                            placeholder="0"
                                            {...register('amount', {
                                                required: 'Вкажіть суму',
                                                valueAsNumber: true,
                                            })}
                                        />
                                        {errors.amount && (
                                            <Field.ErrorText>
                                                {errors.amount.message}
                                            </Field.ErrorText>
                                        )}
                                    </Field.Root>

                                    <Field.Root>
                                        <Field.Label>Дата</Field.Label>
                                        <Input
                                            type="date"
                                            {...register('date')}
                                        />
                                    </Field.Root>
                                </Stack>
                            </Dialog.Body>
                        </form>
                        <Dialog.Footer>
                            <Dialog.ActionTrigger asChild>
                                <Button
                                    variant="outline"
                                    onClick={() => reset()}
                                >
                                    Скасувати
                                </Button>
                            </Dialog.ActionTrigger>
                            <Button
                                form="add-operation-form"
                                type="submit"
                                disabled={postStatus === 'loading'}
                            >
                                Зберегти
                            </Button>
                        </Dialog.Footer>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    );
};
