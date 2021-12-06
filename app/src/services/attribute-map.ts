


export enum AttrType {
    STRING = "string",
    NUMBERIC = "numeric",
    DATE = "date",
    LIST = "list" 
}

interface Attr {
    attribute: string // the attribute name in the web service and the input dictionary
    columnName: string // the corresponding column name in the dataframe after processing
    type: AttrType
    weight: number
}

export const attrMap: Attr[] = [
    {
        attribute: "englishName",
        columnName: "englishName",
        type: AttrType.STRING,
        weight: 0.2
    },
    {
        attribute: "moons",
        columnName: "moonsEnglishName",
        type: AttrType.LIST,
        weight: 0.15
    },
    {
        attribute: "perihelion",
        columnName: "perihelion",
        type: AttrType.NUMBERIC,
        weight: 0.05
    },
    {
        attribute: "aphelion",
        columnName: "aphelion",
        type: AttrType.NUMBERIC,
        weight: 0.05
        },
    {
        attribute: "mass",
        columnName: "mass",
        // Expected as a numeric value in the dictionary input.
        // It uses a value and exponent notation in the dataframe
        type: AttrType.NUMBERIC,
        weight: 0.05
    }
]