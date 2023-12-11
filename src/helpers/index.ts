import { watch } from 'vue'
import axios from 'axios'

interface NumbersNames {
    [key: string]: string
}

export function startWatch(fields: { [key: string]: string }, code: string) {
    let index: string
    for (index in fields) {
        const fieldItem = index.toString()
        watch(
            () => fields[fieldItem],
            async (val) => {
                try {
                    await axios.post('setting/set', { code: code, key: fieldItem, value: val })
                } catch (error) {
                    console.log(error)
                }
            },
            { deep: true },
        )
    }
}

export function setFields(fields: { [key: string]: any }, obj: { [key: string]: any }) {
    for (let key in obj) {
        fields[key] = obj[key]
    }
}
