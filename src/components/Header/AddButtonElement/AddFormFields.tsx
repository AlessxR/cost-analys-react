import { Field, Input, Stack } from '@chakra-ui/react';
import {
    Control,
    Controller,
    FieldErrors,
    UseFormRegister,
} from 'react-hook-form';
import { SelectCategory } from '../SelectElement/SelectCategory';
import { FormValues } from '@/hooks/useAddButton';

type Props = {
    register: UseFormRegister<FormValues>;
    control: Control<FormValues>;
    errors: FieldErrors<FormValues>;
};

export const AddFormFields = ({ errors, register, control }: Props) => (
    <Stack gap="4">
        <Field.Root required invalid={!!errors.title}>
            <Field.Label>Опис</Field.Label>
            <Input
                placeholder="Опис покупки..."
                {...register('title', {
                    required: 'Вкажіть опис',
                })}
            />
            {errors.title && (
                <Field.ErrorText>{errors.title.message}</Field.ErrorText>
            )}
        </Field.Root>

        <Field.Root required invalid={!!errors.category}>
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
                        value={field.value ? [field.value] : []}
                        onValueChange={(details) =>
                            field.onChange(details.value[0] ?? '')
                        }
                    />
                )}
            />
            {errors.category && (
                <Field.ErrorText>{errors.category.message}</Field.ErrorText>
            )}
        </Field.Root>

        <Field.Root required invalid={!!errors.amount}>
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
                <Field.ErrorText>{errors.amount.message}</Field.ErrorText>
            )}
        </Field.Root>

        <Field.Root>
            <Field.Label>Дата</Field.Label>
            <Input
                type="date"
                {...register('date', {
                    required: 'Укажіть дату',
                })}
            />
            {errors.date && (
                <Field.ErrorText>{errors.date.message}</Field.ErrorText>
            )}
        </Field.Root>
    </Stack>
);
