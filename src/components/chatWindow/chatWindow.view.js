import styles from './chatWindow.module.css';
import AutoTextArea from "./AutoTextArea";
import {Avatar, Button} from "@chakra-ui/react";
import ChatMessage from "./chatMessage";
import {getSessionUser, removeSession} from "../../api/auth";
import {useHistory} from 'react-router-dom';
import {useEffect, useRef, useState} from "react";
import {useChatContext} from "../../context";
import fetchResource from "../../api";
import {handleIncomingChatMessages, joinChat} from "../../api/socket";
import {act} from "@testing-library/react";

const ChatWindow = (props) => {
	const user = getSessionUser();
	const history = useHistory();
	const {activeChat} = useChatContext();
	const [messageBody, setMessageBody] = useState('');
	const [messages, setMessages] = useState([]);
	useEffect(() => {
		if(activeChat){
			fetchResource("GET", `message/${activeChat._id}` ).then(res => {
				setMessages(res);
			})
			joinChat(activeChat._id);
		}

	},[activeChat]);

	const addMessage = (newMessage) => {
		if(newMessage.chat === activeChat._id){
			setMessages([...messages, newMessage]);
		}
	}
	if(activeChat){
		handleIncomingChatMessages(addMessage);
	}
	let userName = '';
	if(activeChat){
		userName = activeChat.users.filter(u => u._id !== user.id)[0].name;
	}

	const logout = () => {
		removeSession();
		history.push('/login');
	}

	const messagesEndRef = useRef(null)

	const scrollToBottom = () => {
		if(messagesEndRef !== null && messagesEndRef.current !== undefined){
			messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight ;
		}
	}

	useEffect(scrollToBottom, [messages]);

	const handleMessageBody = (e) => {
		setMessageBody(e.target.value);
	}

	const handleSendMessage = (evt) => {
		if (evt.keyCode === 13 && !evt.shiftKey) {
			evt.preventDefault();
			fetchResource("POST",  `message/${activeChat._id}`, {body: {body: messageBody}}).then(() => {
				setMessageBody('');
			});
		}
	}
	return (
		<div className={styles.root}>
			<div className={styles.header}>
				<div className={styles.name}><b>{userName}</b></div>
				<div className={styles.user}>
					<Avatar name={user.name}/>
					<div className={styles.logout}>
						{user.name}
						<Button size="sm" variant="custom" onClick={logout}>Logout</Button>
					</div>

				</div>
			</div>
			<div className={styles.wrapper}>
				<div className={styles.messages} ref={messagesEndRef}>
					{messages.map(mess => (<ChatMessage message={mess}/>))}
				</div>
				<div className={styles.footer} >
					<AutoTextArea placeholder="Write a message..." value={messageBody} onChange={handleMessageBody} onKeyDown={handleSendMessage}/>
				</div>
			</div>
		</div>
	)
};

export default ChatWindow;