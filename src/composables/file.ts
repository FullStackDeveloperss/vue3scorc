import axios from 'axios'
import { ref } from 'vue'

export function useFile() {
    const downloadFile = async (fileName: string, options: any) => {
        await axios.post(options.url, options.data, {
            responseType: 'blob',
        }).then((response) => {
            const fileURL = window.URL.createObjectURL(new Blob([response.data]))
            const fileLink = document.createElement('a')
            fileLink.href = fileURL
            fileLink.setAttribute('download', fileName)
            document.body.appendChild(fileLink)
            fileLink.click()

            if (options.onSuccess) {
                options.onSuccess()
            }
        }).catch((error) => {
            if (options.onError) {
                options.onError(error)
            }
        }).finally(() => {
            if (options.callback) {
                options.callback()
            }
        });


    }

    const inputFile = ref<HTMLInputElement>()
    const uploadingProgress = ref(0)
    const loading = ref(false)
    const uploadFile = async (url: string, options: any) => {
        const formData = new FormData()

        formData.append('file', options.file)

        if (options.formDataAdditional) {
            options.formDataAdditional.forEach((item: any[]) => {
                formData.append(item[0], item[1])
            })
        }


        axios.post(url, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
            onUploadProgress: progressEvent => {
                const { loaded, total = 1 } = progressEvent
                uploadingProgress.value = Math.round((loaded / total) * 100)
            },
        }).then((response) => {
            if (options.onSuccess) {
                options.onSuccess(response)
            }
        }).catch((error) => {
            if (options.onError) {
                options.onError(error)
            }
        }).finally(() => {
            if (options.callback) {
                options.callback()
            }

            uploadingProgress.value = 0
            loading.value = false

        });
    }


    return {
        downloadFile,
        inputFile,
        uploadingProgress,
        loading,
        uploadFile
    }
}
