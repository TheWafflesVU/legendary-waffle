import { TagContext } from "../context/TagContext";
import { useContext } from "react"

export const useTagContext = () => {
    const context = useContext(TagContext);

    if(!context) {
        throw Error('useTagContext must be used inside an TagContextProvider')
    }

    return context
}
