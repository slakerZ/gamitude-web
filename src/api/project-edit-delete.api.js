export const url = id => {
    return process.env.NODE_ENV === "development"
        ? `http://localhost:5010/api/pro/Projects/${id}`
        : `gamitude.rocks/api/pro/Projects/${id}`;
};

export const headers = token => ({
    headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
    },
});
