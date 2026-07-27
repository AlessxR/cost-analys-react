import { Status } from '@/types';

export interface ICategory {
    label: string;
    value: string;
}

export interface IInitialCategories {
    categories: ICategory[];
    status: Status;
    error: string | null;
}
