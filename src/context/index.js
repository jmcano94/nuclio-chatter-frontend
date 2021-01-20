import {createContext, useContext, useEffect, useState} from "react";
import {getStorageObject, setStorageObject} from "../api/storage";

const ChatContext = createContext();

export const ChatContextProvider = (props) => {
	const {children} = props;
	const storageChat = getStorageObject("active-chat");
	const [activeChat, setActiveChat] = useState(storageChat);

	useEffect(() => {
		if(activeChat !== undefined){
			setStorageObject("active-chat", activeChat);
		}
	}, [activeChat])

	return (
		<ChatContext.Provider value={{activeChat, setActiveChat}}>
			{children}
		</ChatContext.Provider>
	);
}


export const useChatContext = () => {
	const {activeChat, setActiveChat} = useContext(ChatContext);
	return {activeChat, setActiveChat};
}
