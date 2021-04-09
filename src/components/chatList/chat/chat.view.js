import styles from "./chat.module.css";
import {getSessionUser} from "../../../api/auth";
import {Avatar} from '@chakra-ui/react';
import {useChatContext} from "../../../context";

const Chat = (props) => {
	const {chat} = props;
	const user = getSessionUser();
	const userName = chat.users.filter(u=> u._id !== user.id).map(u=> u.name).join(',');
	const {activeChat, setActiveChat, setRefresh} = useChatContext();

	const rootStyle = {}
	if(activeChat && activeChat._id === chat._id){
		rootStyle["backgroundColor"] = "#35518A"
	}

	const handleClickChat = () => {
		setActiveChat(chat);
		setRefresh(true);
	}
	return (
		<div className={styles.root} style={rootStyle} onClick={handleClickChat}>
			<div className={styles.avatar}><Avatar name={userName}/></div>
			<div className={styles.name}>{userName}</div>
		</div>
	)
};

export default Chat;
