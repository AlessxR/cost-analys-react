import { Progress } from '@chakra-ui/react';

export const Preloader = () => (
    <Progress.Root maxW="240px" value={null}>
        <Progress.Track>
            <Progress.Range />
        </Progress.Track>
    </Progress.Root>
);
