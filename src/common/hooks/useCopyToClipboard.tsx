import { useState } from 'react'

type TCopiedValue = string | null
type TCopyFunction = (text: string) => Promise<boolean> // Return success
/**
 * This React hook provides a copy method to save a string in the clipboard and the copied value (default: null).
 * If anything doesn't work, it prints a warning in the console and the value will be null.
 * @see https://usehooks-ts.com/react-hook/use-copy-to-clipboard
 */
function useCopyToClipboard(): [TCopiedValue, TCopyFunction] {
    const [copiedText, setCopiedText] = useState<TCopiedValue>(null)

    const copy: TCopyFunction = async text => {
        if (!navigator?.clipboard) {
            window.alert('Clipboard not supported by this browser.')
            return false
        }

        // Try to save to clipboard then save it in the state if worked
        try {
            await navigator.clipboard.writeText(text)
            setCopiedText(text)
            return true
        } catch {
            window.alert(`Copy failed`)
            setCopiedText(null)
            return false
        }
    }

    return [copiedText, copy]
}

export default useCopyToClipboard
