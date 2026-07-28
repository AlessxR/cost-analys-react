import { Center, Progress } from '@chakra-ui/react';

export const Preloader = () => (
    <Center h="100vh">
        <Progress.Root maxW="240px" value={null} w="100%">
            <Progress.Track>
                <Progress.Range />
            </Progress.Track>
        </Progress.Root>
    </Center>
);
