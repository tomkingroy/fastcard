// import { createDiscreteApi, darkTheme } from "naive-ui"
// import type { ConfigProviderProps } from 'naive-ui'
import { useMessage } from "naive-ui"


const useClipboard = () => {
    const message = useMessage()

    /**
     * Attempts a synchronous version of copying text to the clipboard, calling a callback function when complete.
     * If the modern Clipboard API is not available, a fallback is used.
     *
     * @param {string} text The text to copy.
     * @param {Function} callback Callback function, the parameter is the error message of copy success or failure.
     */
    const copyToClipboardSync = (text: string, callback: Function = () => {}) => {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(() => {
                message.success('Copy successful')
                callback(null)
            }).catch((err) => {
                console.error("Failed to copy text to clipboard。", err)
                callback(err)
            })
        }
        else {
            // Fallback plan
            let textarea = document.createElement("textarea")
            textarea.value = text
            document.body.appendChild(textarea)
            textarea.select()
            try {
                let successful = document.execCommand("copy")
                document.body.removeChild(textarea)
                if (successful) {
                    message.success('Copy successful')
                    callback(null)
                }
                else {
                    message.error('Copy failed, please copy manually')
                    callback(new Error("Fallback: The copy text command fails."))
                }
            }
            catch (err) {
                message.error('Copy failed, please copy manually')
                document.body.removeChild(textarea)
                callback(err)
            }
        }
    }

    /**
     * Copy text to clipboard。
     * @param {string} text - The text to copy.
     * @returns {Promise<void>} - Returns a Promise indicating whether the operation was successful.
     */
    const copyToClipboard = async (text: string): Promise<void> => {
        try {
            if (navigator.clipboard) {
                // Using the Clipboard API (modern browsers)
                await navigator.clipboard.writeText(text)
            }
            else if (document.execCommand) {
                // Use document.execCommand() (deprecated method, but still compatible with some browsers)
                const dummy = document.createElement("textarea")
                dummy.value = text
                document.body.appendChild(dummy)
                dummy.select()
                document.execCommand("copy")
                document.body.removeChild(dummy)
            }

            message.success('Copy successful')
        }
        catch (error) {
            message.error('Copy failed, please copy manually')
            throw new Error("Copy to clipboard failed")
        }
    }

    return {
        copyToClipboardSync,
        copyToClipboard
    }

    /*async (text: any) => {
     const praseText = typeof text === 'string' ? text : text.toString()
     const [ err ] = await to(toClipboard(praseText))

     if (err) {
     message.error(t('common.copyFailed'))
     console.error(err)
     return
     }

     message.success(t('common.copySucceeded'))
     }*/
}

export default useClipboard
