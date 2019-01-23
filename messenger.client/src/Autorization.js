export const isUserLoggedIn = () => {
    if (localStorage.getItem('username')) {
        return true;
    }

    return false;
}