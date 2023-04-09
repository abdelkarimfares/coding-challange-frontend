
const store = (key:string, data:any): void => {
    localStorage.setItem(key, JSON.stringify(data));
}

const read = (key:string): any => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null
}

const remove = (key:string):void => {
    localStorage.removeItem(key)
}

export const localStorageService = {
    store,
    read,
    remove
}