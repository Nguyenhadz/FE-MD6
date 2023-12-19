
const RemoveFromLocalStorageMiddleware = (store) => (next) => (action) => {
    console.log(action.type)
    if (action.type.startsWith('user/logout')) {
        localStorage.clear();
    }
    return next(action);
};
export default RemoveFromLocalStorageMiddleware;