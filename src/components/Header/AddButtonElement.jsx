import { useRef, useState } from 'react';

import { useDispatch } from 'react-redux';

import { Controller, useForm } from 'react-hook-form';

import { postTransaction } from '@/store/transaction-slice';

import { formatDateToString } from '@/lib/utils';

import {
    Button,
    Dialog,
    Field,
    Input,
    Portal,
    Stack,
    Text,
} from '@chakra-ui/react';

import { FiPlus } from 'react-icons/fi';
import { SelectCategory } from '..';

export const AddButtonElement = () => {
    const ref = useRef();
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);

    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            description: '',
            category: '',
            summa: '',
            date: '',
        },
    });

    const onSubmit = async (data) => {
        await dispatch(
            postTransaction({
                title: data.description,
                category: data.category,
                amount: -Number(data.summa),
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
                                        invalid={!!errors.description}
                                    >
                                        <Field.Label>Опис</Field.Label>
                                        <Input
                                            placeholder="Опис покупки..."
                                            {...register('description', {
                                                required: 'Вкажіть опис',
                                            })}
                                        />
                                        {errors.description && (
                                            <Field.ErrorText>
                                                {errors.description.message}
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
                                        invalid={!!errors.summa}
                                    >
                                        <Field.Label>Сума, ₴</Field.Label>
                                        <Input
                                            type="number"
                                            placeholder="0"
                                            {...register('summa', {
                                                required: 'Вкажіть суму',
                                                valueAsNumber: true,
                                            })}
                                        />
                                        {errors.summa && (
                                            <Field.ErrorText>
                                                {errors.summa.message}
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
                            <Button form="add-operation-form" type="submit">
                                Зберегти
                            </Button>
                        </Dialog.Footer>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    );
};
