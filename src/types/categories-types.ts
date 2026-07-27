import { Status } from '.';

export interface ICategory {
    label: string;
    value: string;
}

export interface IInitialCategories {
    categories: ICategory[];
    status: Status;
    error: null | string;
}

export interface ICategoryBreakdown {
    label: string;
    sum: number;
    percent: number;
}
