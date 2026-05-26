export interface PageResponse<T> {
    content: T[];
    empty: boolean;
    first: boolean;
    last: boolean;
    number: number; // page index
    number_of_elements: number;
    size: number;
    total_elements: number;
    total_pages: number;
}
