import { RefObject, useEffect, useState } from 'react'

interface IArguments extends IntersectionObserverInit {
    isFreezeOnceVisible?: boolean
}
/**
 * This React Hook detects visibility of a component on the viewport using the IntersectionObserver API natively present in the browser.
 * It can be very useful to lazy-loading of images, implementing "infinite scrolling" or starting animations for example.
 * Your must pass the ref element (from useRef()).
 * @see https://usehooks-ts.com/react-hook/use-intersection-observer
 */
function useIntersectionObserver(
    elementReference: RefObject<Element>,
    { threshold = 0, root = null, rootMargin = '0%', isFreezeOnceVisible = false }: IArguments,
): IntersectionObserverEntry | undefined {
    const [entry, setEntry] = useState<IntersectionObserverEntry>()

    const isFrozen = entry?.isIntersecting && isFreezeOnceVisible

    const updateEntry = ([entry]: IntersectionObserverEntry[]): void => {
        setEntry(entry)
    }

    useEffect(() => {
        const node = elementReference?.current // DOM Ref
        const hasIOSupport = !!window.IntersectionObserver

        if (!hasIOSupport || isFrozen || !node) return

        const observerParameters = { threshold, root, rootMargin }
        const observer = new IntersectionObserver(updateEntry, observerParameters)

        observer.observe(node)

        return () => observer.disconnect()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [elementReference, JSON.stringify(threshold), root, rootMargin, isFrozen])

    return entry
}

export default useIntersectionObserver
