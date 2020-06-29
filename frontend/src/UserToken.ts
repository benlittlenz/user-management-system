export let userToken = "";

export const SetAccessToken = (token: string) => {
    userToken = token
}

export const getAccessToken = () => {
    return userToken;
}