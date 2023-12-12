import { watch } from 'vue'
import axios from 'axios'
import debounce from 'lodash.debounce'

interface NumbersNames {
    [key: string]: string
}


export function startWatch(fields: { [key: string]: string }, code: string) {
    let index: string
    for (index in fields) {
        const fieldItem = index.toString()
        watch(
            () => fields[fieldItem],
            debounce(async (val: any) => {
                try {
                    await axios.post('setting/set', { code: code, key: fieldItem, value: val })
                } catch (error) {
                    console.log(error)
                }
            }, 500 ),
            { deep: true },
        )
    }
}

export function setFields(fields: { [key: string]: any }, obj: { [key: string]: any }) {
    for (let key in obj) {
        fields[key] = obj[key]
    }
}
