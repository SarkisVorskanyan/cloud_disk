export interface FilterForFileType {
    name: string,
    options: FilterForFileOptionsType[]
}

interface FilterForFileOptionsType {
    name: string,
    value: string
}

export const FilterForFile: FilterForFileType = {
    name: 'Филтровать',
    options: [
        {
            name: 'По имени',
            value: 'name'
        },
        {
            name: 'По типу',
            value: 'type'
        },
        {
            name: 'по дату',
            value: 'date'
        }
    ]
}

