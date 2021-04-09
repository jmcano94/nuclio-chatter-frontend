import {createContext, useContext, useEffect, useState} from "react";
import {getStorageObject, setStorageObject} from "../api/storage";

const ChatContext = createContext();

export const ChatContextProvider = (props) => {
	const {children} = props;
	const storageChat = getStorageObject("active-chat");
	const [activeChat, setActiveChat] = useState(storageChat);
	const [refresh, setRefresh] = useState(true);
	useEffect(() => {
		if(activeChat !== undefined){
			setStorageObject("active-chat", activeChat);
		}
	}, [activeChat])

	return (
		<ChatContext.Provider value={{activeChat, setActiveChat, refresh, setRefresh}}>
			{children}
		</ChatContext.Provider>
	);
}


export const useChatContext = () => {
	const {activeChat, setActiveChat, refresh, setRefresh} = useContext(ChatContext);
	return {activeChat, setActiveChat, refresh, setRefresh};
}
