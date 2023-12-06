export const LocalStorageMiddleware = (store) => (next) => (action) => {
    const result = next(action);


    if (action.type.startsWith('user/login') && action.type.endsWith('/fulfilled')) {
        // Nếu action liên quan đến user và là fulfilled, lưu thông tin vào localStorage
        localStorage.setItem('currentUser', JSON.stringify(store.getState().user.currentUser));
    }

    return result;
};