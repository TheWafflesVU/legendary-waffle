import { ChatContext } from "../context/ChatContext";
import { useContext } from "react"

export const useChatContext = () => {
    const context = useContext(ChatContext)

    if(!context) {
        throw Error('useAuthContext must be used inside an AuthContextProvider')
    }

    return context
}
