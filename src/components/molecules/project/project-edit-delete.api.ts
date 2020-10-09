export const url = (id: number) => {
    return process.env.NODE_ENV === "development"
        ? `http://localhost:5010/api/pro/Projects/${id}`
        : `http://gamitude.rocks:31778/api/pro/Projects/${id}`;
};

export const headers = (token: string) => ({
    headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
    },
});
