import React, {
    createContext,
    FunctionComponent,
    ReactNode,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState
} from 'react'

export interface Size {
    width: number
    height: number
}

export const mobileWidth = 768

export interface ISizeContext {
    mobile: boolean
    size?: Size
}

export const SizeContext = createContext<ISizeContext | undefined>(undefined)

export interface ISizeConfig {
    mobileWidth?: number
}

export interface ISizeProviderProps extends ISizeConfig {
    children: ReactNode
}

export const SizeProvider: FunctionComponent<ISizeProviderProps> = (props) => {
    const isClient = typeof window === 'object'

    const [mobile, setMobile] = useState(false)
    const [size, setSize] = useState<Size>()

    const finalMobileWidth = useMemo(() => props.mobileWidth || mobileWidth, [props.mobileWidth])

    const updateMobileState = useCallback(() => {
        const currentSize = getSize()
        if (currentSize.width <= finalMobileWidth && !mobile) {
            setMobile(true)
        } else if (currentSize.width > finalMobileWidth && mobile) {
            setMobile(false)
        }
    }, [finalMobileWidth, mobile])

    const getSize = () => {
        const currentSize = {
            width: window.innerWidth,
            height: window.innerHeight
        }
        setSize(currentSize)
        return currentSize
    }

    useEffect(() => {
        getSize()
        updateMobileState()
    }, [updateMobileState])

    useEffect(() => {
        if (!isClient) {
            return
        }
        window.removeEventListener('resize', updateMobileState)
        window.addEventListener('resize', updateMobileState)
        return () => window.removeEventListener('resize', updateMobileState)
    }, [updateMobileState, isClient])

    return (
        <SizeContext.Provider
            value={{
                mobile,
                size
            }}
        >
            {props.children}
        </SizeContext.Provider>
    )
}

export const useSize = () => {
    const ctx = useContext(SizeContext)

    if (!ctx) {
        throw new Error('Size context not found! Check your AppProvider')
    }

    return ctx
}
