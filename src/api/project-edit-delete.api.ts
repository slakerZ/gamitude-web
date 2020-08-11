export const url = (id: number) => {
    return process.env.NODE_ENV === "development"
        ? `http://localhost:5010/api/pro/Projects/${id}`
        : `https://gamitude.rocks/api/pro/Projects/${id}`;
};

export const headers = (token: string) => ({
    headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
    },
});