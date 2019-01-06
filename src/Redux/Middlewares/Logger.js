export const Logger = (store) => (next) => (action) => {
    let result = next(action);
    console.log('action: ' , action)
    console.log('next state: ', store.getState());
    return result
} 