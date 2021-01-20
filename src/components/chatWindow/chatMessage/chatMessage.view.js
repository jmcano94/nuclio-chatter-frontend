import styles from "./chatMessage.module.css";
import {Avatar} from "@chakra-ui/react";
import {getSessionUser} from "../../../api/auth";
import {format} from 'date-fns';

const ChatMessage = (props) =>{
	const { message} = props;
	const sessionUser = getSessionUser();
	const direction = message.user._id === sessionUser.id ? "right" : "left";
	const chatStyle = {
		flexDirection: "row"
	}
	if(direction=== 'right'){
		chatStyle['flexDirection'] = 'row-reverse';
		chatStyle['justifyContent'] = "right";
	}
	return (
		<div className={styles.message} style={chatStyle}>
			<div className={styles.messageAvatar}>
				<Avatar name={message.user.name} size="md" />
			</div>
			<div className={styles.messageText}>
				{message.body}
			</div>
			<div className={styles.messageTime}>
				{format(new Date(message.createdAt), 'HH:mm')}
			</div>
		</div>
	)
};

ChatMessage.defaultProps = {
	direction: "right"
}


export default ChatMessage
