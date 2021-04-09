import {Avatar, Divider, Drawer, DrawerContent, DrawerOverlay, Heading} from "@chakra-ui/react";
import styles from "./usersDrawer.module.css";
import fetchResource from "../../../api";
import {useChatContext} from "../../../context";

const UsersDrawer = (props) =>{
	const {isOpen, onClose, btnRef, availableUsers} = props;
	const {setActiveChat, setRefreshChats} = useChatContext();

	const handleClickUser = (user) => {

		fetchResource("POST", "chat", {body: {chatMembers: [user._id]}}).then(r => {
			setActiveChat(r);
			setRefreshChats(true);
			onClose()
		})
	}


	return (
		<Drawer
			isOpen={isOpen}
			placement="left"
			onClose={onClose}
			finalFocusRef={btnRef}
		>
			<DrawerOverlay>
				<DrawerContent>

					<div className={styles.drawerRoot}>
						<div className={styles.drawerHeading}>
							<Heading color="white">Start new chat</Heading>
						</div>
						<Divider mb={"8px"}/>
						{availableUsers.map(u => (
							<div className={styles.userOption} onClick={() => handleClickUser(u)}>
								<div className={styles.avatar}><Avatar name={u.name}/></div>
								<div className={styles.name}>{u.name}</div>
							</div>
						))}
						{availableUsers.length === 0 && (
							<Heading size="md" pl="24px" pt="8px" color="white">
								No users left
							</Heading>
						)}
					</div>

				</DrawerContent>
			</DrawerOverlay>
		</Drawer>
	)
};

export default UsersDrawer;
