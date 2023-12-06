const RemoveFromLocalStorageMiddleware = (store) => (next) => (action) => {
    console.log(action.type)
    if (action.type.startsWith('user/logout')) {
        // Xoá thông tin khỏi localStorage khi có action LOGOUT
        localStorage.clear();
    }
    return next(action);
};
export default RemoveFromLocalStorageMiddleware;