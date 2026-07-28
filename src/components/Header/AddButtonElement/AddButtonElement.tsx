import { useRef } from 'react';

import { FiPlus } from 'react-icons/fi';

import { Button, Dialog, Portal, Text } from '@chakra-ui/react';

import { useAddButton } from '@/hooks/useAddButton';
import { AddFormFields } from './AddFormFields';
import { Toaster } from '@/components/ui/toaster';

export const AddButtonElement = () => {
    const ref = useRef<HTMLInputElement | null>(null);

    const {
        reset,
        register,
        handleSubmit,
        errors,
        control,
        isOpen,
        setIsOpen,
        onSubmit,
        postStatus,
    } = useAddButton();

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
                    <Toaster />
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
                                <AddFormFields
                                    register={register}
                                    errors={errors}
                                    control={control}
                                />
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
