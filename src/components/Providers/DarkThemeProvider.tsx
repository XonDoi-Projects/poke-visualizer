import React, {
    createContext,
    FunctionComponent,
    ReactNode,
    useContext,
    useEffect,
    useState
} from 'react'

export interface IDarkThemeContext {
    light: boolean | undefined
    setLight: (value: boolean) => void
}

export const DarkThemeContext = createContext<IDarkThemeContext | undefined>(undefined)

export interface IDarkThemeProviderProps {
    children: ReactNode
}

export const DarkThemeProvider: FunctionComponent<IDarkThemeProviderProps> = (props) => {
    const [light, setLight] = useState<boolean>()

    useEffect(() => {
        const darkTheme = window.matchMedia('(prefers-color-scheme: dark)')
        if (darkTheme.matches) {
            setLight(false)
        } else {
            setLight(true)
        }
    }, [])

    return (
        <DarkThemeContext.Provider value={{ light, setLight }}>
            {props.children}
        </DarkThemeContext.Provider>
    )
}

export const useDarkTheme = () => {
    const ctx = useContext(DarkThemeContext)

    if (!ctx) {
        throw new Error('DarkTheme context not found! Check your AppProvider')
    }

    return ctx
}
