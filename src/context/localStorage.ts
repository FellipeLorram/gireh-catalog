export function saveDataToLocalStorage(key: string, data: any) {
    localStorage.setItem(key, JSON.stringify(data));
}

export function getDataFromLocalStorage(key: string) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
}