export const LocalStorageMiddleware = (store) => (next) => (action) => {
    const result = next(action);


    if (action.type.startsWith('user/login') && action.type.endsWith('/fulfilled')) {
        localStorage.setItem('currentUser', JSON.stringify(store.getState().users.currentUser));
    }
    if (action.type.startsWith('user/update') && action.type.endsWith('/fulfilled')) {
        localStorage.setItem('currentUser', JSON.stringify(store.getState().users.currentUser));
    }

    return result;
};