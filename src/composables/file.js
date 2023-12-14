import axios from 'axios'
import { ref } from 'vue'

export function useFile() {
    const downloadFile = async (fileName, options) => {
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

    const inputFile = ref()
    const uploadingProgress = ref(0)
    const loading = ref(false)
    const uploadFile = async (url, options) => {
        const formData = new FormData()

        formData.append('file', options.file)

        axios.post(url, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
            onUploadProgress: progressEvent => {
                const { loaded, total } = progressEvent
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
