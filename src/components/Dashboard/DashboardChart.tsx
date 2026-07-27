import {
    Bar,
    BarChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
} from 'recharts';

import { Box } from '@chakra-ui/react';

import { formatCurrency, getMonthlyData } from '@/lib/utils';
import { ITransaction } from '@/types';

type Props = {
    transactions: ITransaction[];
};

export const DashboardChart = ({ transactions }: Props) => {
    const data = getMonthlyData(transactions);

    return (
        <Box h="sm">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                    <CartesianGrid stroke="#E2E8F0" vertical={false} />
                    <XAxis axisLine={false} tickLine={false} dataKey="label" />
                    <Tooltip
                        cursor={{ fill: '#F7FAFC' }}
                        animationDuration={0}
                        formatter={(value) => [
                            formatCurrency(value),
                            'Витрачено',
                        ]}
                    />
                    <Bar
                        dataKey="value"
                        fill="#319795"
                        radius={[4, 4, 0, 0]}
                        isAnimationActive={false}
                    />
                </BarChart>
            </ResponsiveContainer>
        </Box>
    );
};
