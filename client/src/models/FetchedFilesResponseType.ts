import { FilterType } from './Types';

export interface FetchedFilesResponseType {
    currentDir: String | null
    selectedFilter: FilterType | null
}