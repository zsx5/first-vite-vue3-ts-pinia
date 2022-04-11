import { defineStore } from 'pinia'
export const useSystemStore = defineStore('system', {
    state: () => {
        return {
            dictionary: [],
        }
    },
    getters: {

    },
    actions: {
        setDictionary(dictionaryList){
            let dictionary = {
                list: [],
                codeObj: {},
                valueObj: {}
            };
            dictionaryList?.forEach(item => {
                dictionary.list = item.dictionaries;
                item.dictionaries?.forEach(v => {
                    dictionary.codeObj[v.code] = v;
                    dictionary.valueObj[v.value] = v;
                });
            });
            this.dictionary = dictionary;
            console.log(dictionary)
        },
    }
})