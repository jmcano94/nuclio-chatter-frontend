import {io} from 'socket.io-client';
import {getUserToken} from "../auth";
const API_URL = 'http://localhost:3001';
const token = getUserToken();
const socket = io(API_URL, {
	auth: {
		token
	}
});

socket.on("connection", (data) => {
	console.log("Connected");
});

socket.on("chat-joined", (data) => {
	console.log(`Joined chat: ${data}`);
});

export const joinChat = (chatId) => {
	socket.emit("join-chat", chatId);
};

export const handleIncomingChatMessages = (callback) => {
	socket.on("new-message", callback);
}

export const handleNewChat = (callback) => {
	socket.on("new-chat", callback);
}

export const handleNewUser = (callback) => {
	socket.on("new-user", callback);
}

export const handleNewChatMessage = (callback) => {
	socket.on("new-chat-message", callback);
}

export default socket;
