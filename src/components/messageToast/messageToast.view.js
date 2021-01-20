import styles from './messageToast.module.css'
import {Avatar} from "@chakra-ui/react";
const MessageToast = (props) => {
	const {message} = props;
	return (
		<div className={styles.root}>
			<div className={styles.avatar}><Avatar name={message.user.name}/></div>
			<div className={styles.name}>{message.user.name}</div>
		</div>
	)
};

export default MessageToast;
