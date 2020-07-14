/*global chrome*/

const STORAGE_PREFIX = "@CustomChromeStorage";
let dataMemory = {};

class CustomChromeStorage {
    static syncPromise = null;

    static setItem(key, value) {
        chrome.storage.sync.set({ key: JSON.stringify(value) }, () => {
            console.log("item stored");
        });
        dataMemory[key] = value;
        return dataMemory[key];
    }

    static getItem(key) {
        return Object.prototype.hasOwnProperty(dataMemory, key)
            ? dataMemory[key]
            : undefined;
    }

    static removeItem(key, value) {
        chrome.storage.sync.remove(key, () => {
            console.log("item removed");
        });
        return delete dataMemory[key];
    }

    static clear() {
        chrome.storage.sync.clear(() => {
            console.log("storage cleared");
        });
        dataMemory = {};
        return dataMemory;
    }

    static sync() {
        if (!CustomChromeStorage.syncPromise) {
            CustomChromeStorage.syncPromise = new Promise((resolve, reject) => {
                chrome.storage.sync.get(null, (items) => {
                    const keys = Object.keys(items);
                    const memoryKeys = keys.filter((key) =>
                        key.startsWith(STORAGE_PREFIX)
                    );
                    chrome.storage.sync.get(memoryKeys, (stores) => {
                        for (let key in stores) {
                            const value = stores[key];
                            const memoryKey = key.replace(STORAGE_PREFIX, "");
                            dataMemory[memoryKey] = value;
                        }
                        resolve();
                    });
                });
            });
        }
    }
}

export { CustomChromeStorage };
