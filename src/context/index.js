import {createContext, useContext, useState} from "react";

const ChatContext = createContext();

export const ChatContextProvider = (props) => {
	const {children} = props;
	const [activeChat, setActiveChat] = useState(undefined);

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
