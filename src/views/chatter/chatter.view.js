import styles from './chatter.module.css';
import ChatList from "../../components/chatList";
import ChatWindow from "../../components/chatWindow";
import {useSocket, withSocket} from "../../api/socket";
import MessageToast from "../../components/messageToast";
import {useToast} from "@chakra-ui/react";
import {useChatContext} from "../../context";
import {useEffect} from "react";

const Chatter = () => {

	const toast = useToast();
	const {subscribeNewChatMessage} = useSocket();
	const {activeChat} = useChatContext();
	useEffect(() => {
		if(activeChat) {
			subscribeNewChatMessage((message) => {
				if(message.chat !== activeChat._id){
					toast({
						position: "top-right",
						render: () => (
							<MessageToast message={message} />
						),
					})
				}
			});
		};
	}, [activeChat, toast]);


	return (
		<div className={styles.root}>
				<div className={styles.grid}>
					<div className={styles.sideNav}>
						<ChatList/>
					</div>
					<div className={styles.chat}>
						<ChatWindow/>
					</div>
				</div>
		</div>
	)
};
export default withSocket(Chatter);
