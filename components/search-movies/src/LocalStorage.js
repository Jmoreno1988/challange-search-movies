
export class LocalStorage {

    constructor(item) {
        if (typeof(Storage) === 'undefined') {
            console.log('');
            return;
        }

        this.ls = localStorage;
        this.actualItem = item;
        
        if(this.ls && !this.exist(item))
            this.ls.setItem(this.actualItem, "{}");
    }

    set(key, value) {
        const item = JSON.parse(this.ls.getItem(this.actualItem));

        item[key] = value;
        this.ls.setItem(this.actualItem, JSON.stringify(item));
    }
    
    setItem(nameItem, item) {
        this.ls.setItem(nameItem, JSON.stringify(item));
    }

    get(i) {
        const item = i || this.actualItem;
        return JSON.parse(this.ls.getItem(this.actualItem));
    }

    remove(item) {
        this.ls.remove(this.actualItem);
    }

    exist(item) {
        if (this.ls.getItem(this.actualItem))
            return true;
        return false;
    }

    clearLocalStorage() {
        this.ls.clear();
    }
}