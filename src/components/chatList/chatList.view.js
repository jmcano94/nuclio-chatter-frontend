import styles from './chatList.module.css'
import {AddIcon} from "@chakra-ui/icons";
import Chat from "./chat";
import {Button, useDisclosure} from '@chakra-ui/react';
import {useEffect, useRef, useState} from "react";
import UsersDrawer from "./UsersDrawer";
import {getSessionUser} from "../../api/auth";
import fetchResource from "../../api";
import {useSocket} from "../../api/socket";
import {useChatContext} from '../../context';

const ChatList = () => {
	const [users, setUsers] = useState([]);
	const [chats, setChats] = useState([]);
	const [availableUsers, setAvailableUsers] = useState([]);
	const sessionUser = getSessionUser();
	const { isOpen, onOpen, onClose } = useDisclosure()
	const {subscribeNewChat, subscribeNewUser} = useSocket();
	const btnRef = useRef();
	const [refreshUsers, setRefreshUsers] = useState(true);
	const {refreshChats, setRefreshChats} = useChatContext();
	
	useEffect(() => {
		subscribeNewChat((newChat) => {
			setRefreshChats(true);
		});
	
		subscribeNewUser((newUser) => {
			setRefreshUsers(true);
		})
	})

	useEffect(() => {
		fetchResource("GET", "user").then(res => {
			setUsers(res);
			setRefreshUsers(false);
		});
	},[refreshUsers]);

	useEffect(() => {
		fetchResource("GET", "chat").then(res =>{
			setChats(res);
			setRefreshChats(false);
		});
	}, [refreshChats]);

	useEffect(() => {
		const userExistsInChats = (user,chatsArray) => {
			let exists = false;
			chatsArray.forEach(c => c.users.map(u => u._id).forEach(u => {
				if(u === user.id || u === user._id){
					exists = true;
				}
			}));
			return exists;
		}

		if(users && chats){
			const usersNotInChat = users.filter(user => user._id !== sessionUser.id && !userExistsInChats(user, chats));
			setAvailableUsers(usersNotInChat);
		}else if(!chats && users){
			setAvailableUsers(users.filter(u => u._id !== sessionUser.id));
		}
	},[users, chats])

	

	const onCloseDrawer = () => {
		onClose();
	}
	return (
		<div className={styles.root}>
			<div className={styles.newChat}>
				<Button variant="custom" size="lg" ref={btnRef} onClick={onOpen} width="100%" leftIcon={<AddIcon/>}>New Chat</Button>
			</div>
			<div className={styles.chatList}>
			{chats.map(chat => (
					<Chat chat={chat}/>
			))}
			</div>
			<UsersDrawer isOpen={isOpen} onClose={onCloseDrawer} btnRef={btnRef} availableUsers={availableUsers}/>

		</div>
	)
};

export default ChatList;
