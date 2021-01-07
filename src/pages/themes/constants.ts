export const TiersMapper = (filters: any) => {
    return [
        {
            checked: filters.s,
            name: "checkedS",
            label: "S",
            value: "s",
        },
        {
            checked: filters.a,
            name: "checkedA",
            label: "A",
            value: "a",
        },
        {
            checked: filters.b,
            name: "checkedB",
            label: "B",
            value: "b",
        },
        {
            checked: filters.c,
            name: "checkedC",
            label: "C",
            value: "c",
        },
        {
            checked: filters.d,
            name: "checkedD",
            label: "D",
            value: "d",
        },
        {
            checked: filters.e,
            name: "checkedE",
            label: "E",
            value: "e",
        },
        {
            checked: filters.f,
            name: "checkedF",
            label: "F",
            value: "f",
        },
    ];
};

export const PricesMapper = (filters: any) => {
    return [
        {
            checked: filters.str,
            name: "checkedStr",
            label: "Strength",
            value: "str",
        },
        {
            checked: filters.crt,
            name: "checkedCrt",
            label: "Creativity",
            value: "crt",
        },
        {
            checked: filters.int,
            name: "checkedInt",
            label: "Intelligence",
            value: "int",
        },
        {
            checked: filters.flc,
            name: "checkedFlc",
            label: "Fluency",
            value: "flc",
        },
        {
            checked: filters.cash,
            name: "checkedCash",
            label: "Money",
            value: "cash",
        },
    ];
};
