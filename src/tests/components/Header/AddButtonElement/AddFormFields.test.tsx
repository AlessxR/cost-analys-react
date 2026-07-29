import { describe, it, expect } from 'vitest';
import { Provider } from 'react-redux';
import store from '@/store';
import { useForm } from 'react-hook-form';

import { render } from '@testing-library/react';

import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { FormValues } from '@/hooks/useAddButton';

import { AddFormFields } from '@/components/Header/AddButtonElement/AddFormFields';

const TestWrapper = () => {
    const {
        register,
        control,
        formState: { errors },
    } = useForm<FormValues>({
        defaultValues: { title: '', category: '', amount: '', date: '' },
    });

    return (
        <Provider store={store}>
            <ChakraProvider value={defaultSystem}>
                <AddFormFields
                    register={register}
                    control={control}
                    errors={errors}
                />
            </ChakraProvider>
        </Provider>
    );
};

describe('AddFormFields', () => {
    it('should match snapshot', () => {
        const { asFragment } = render(<TestWrapper />);
        expect(asFragment()).toMatchSnapshot();
    });
});
