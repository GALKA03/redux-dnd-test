/**
 * It gets the items from local storage by key, and if there are no items, it returns an empty array.
 * @param key - The key of the item you want to get from localStorage.
 * @returns An array of objects.
 */
export const getItemsByKey = (key) => {
    let items = [];
    const localItems = localStorage.getItem(key);
    if(localItems) {
        items = JSON.parse(localItems)
    }
    return items;
}

/**
 * This function takes a key and an array of items, and then it stores the array of items in local
 * storage using the key.
 * @param key - The key to store the items under.
 * @param items - The items you want to store in localStorage.
 */
export const setItemsByKey = (key, items) => {
    const localItems = JSON.stringify(items);
    localStorage.setItem(key, localItems);
}