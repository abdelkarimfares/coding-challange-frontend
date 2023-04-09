
const store = (key:string, data:any): void => {
    sessionStorage.setItem(key, JSON.stringify(data));
}

const read = (key:string): any => {
    const data = sessionStorage.getItem(key);
    return data ? JSON.parse(data) : null
}

const remove = (key:string):void => {
    sessionStorage.removeItem(key)
}

export const sessionStorageService = {
    store,
    read,
    remove
}