import { useRef, useState } from 'react';

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
import { SelectCategory } from '../SelectElement/SelectCategory/SelectCategory';
import { useDispatch } from 'react-redux';
import { postTransaction } from '@/store/transaction-slice';

export const AddButtonElement = () => {
    const ref = useRef();
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);

    const handleSubmitForm = (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        dispatch(
            postTransaction({
                title: data.description,
                category: data.category,
                amount: Number(data.summa),
                date: data.date || new Date().toISOString().split('T')[0],
            }),
        );

        setIsOpen(false);
    };

    return (
        <Dialog.Root
            open={isOpen}
            onOpenChange={(e) => setIsOpen(e.open)}
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
            {isOpen && (
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
                                onSubmit={handleSubmitForm}
                            >
                                <Dialog.Body pb="4">
                                    <Stack gap="4">
                                        <Field.Root required>
                                            <Field.Label>Опис</Field.Label>
                                            <Input
                                                name="description"
                                                placeholder="Опис покупки..."
                                            />
                                        </Field.Root>
                                        <Field.Root required>
                                            <Field.Label>Категорія</Field.Label>
                                            <SelectCategory name="category" />
                                        </Field.Root>
                                        <Field.Root required>
                                            <Field.Label>Сума, ₴</Field.Label>
                                            <Input
                                                name="summa"
                                                type="number"
                                                placeholder="0"
                                            />
                                        </Field.Root>
                                        <Field.Root>
                                            <Field.Label>Дата</Field.Label>
                                            <Input name="date" type="date" />
                                        </Field.Root>
                                    </Stack>
                                </Dialog.Body>
                            </form>
                            <Dialog.Footer>
                                <Dialog.ActionTrigger asChild>
                                    <Button variant="outline">Скасувати</Button>
                                </Dialog.ActionTrigger>
                                <Button form="add-operation-form" type="submit">
                                    Зберегти
                                </Button>
                            </Dialog.Footer>
                        </Dialog.Content>
                    </Dialog.Positioner>
                </Portal>
            )}
        </Dialog.Root>
    );
};
