import React, { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import "../../assets/chatboxpage.css";
import axios from 'axios';
import { FaPaperPlane } from 'react-icons/fa';


// const socket = io('http://localhost:8000');

export const ChatBoxPage = ({ receiverId, receiverName, rideId }) => {
    const [chatSocket, setChatSocket] = useState(null)
    const [selectedChat, setSelectedChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const messageEndRef = useRef(null);
    const user = JSON.parse(localStorage.getItem("user"));
    const senderId = user?.id;


    useEffect(() => {
        if (receiverId && senderId && rideId) {
            setSelectedChat({
                otherUserId: receiverId,
                senderId: senderId,
                receiverId: { name: receiverName },
                rideId: rideId,

            });
        }
    }, [receiverId, senderId, receiverName, rideId]);
    useEffect(() => {
        console.log("SelectedChat is being set:", { receiverId, senderId, receiverName, rideId });
    }, [receiverId, senderId, receiverName, rideId]);


    useEffect(() => {
        const newSocket = io('http://localhost:8000');
        setChatSocket(newSocket);

        return () => {
            newSocket.disconnect();
        };
    }, []);

    // Fetching chat history when a new chat is selected
    useEffect(() => {
        if (!selectedChat) return;

        const fetchMessages = async () => {
            try {
                const res = await axios.get(`/messages/readmessage/all/${selectedChat.senderId}?senderId=${receiverId}&rideId=${selectedChat.rideId}`);
                setMessages(res.data.messages);
            } catch (err) {
                console.error('Error fetching messages:', err);
            }
        };

        fetchMessages();


    }, [selectedChat, receiverId])


    useEffect(() => {
        const handleIncomingMessage = (msg) => {
            if (
                msg.receiverId === selectedChat.otherUserId ||
                msg.senderId === selectedChat.otherUserId
            ) {
                setMessages((prev) => [...prev, msg]);
            }
        };

        // if (!chatSocket) return;
        if (chatSocket) {
            chatSocket.on("newMessage", handleIncomingMessage);
        }

        return () => {
            chatSocket?.off("newMessage", handleIncomingMessage);
        };
    }, [selectedChat, chatSocket]);
    // console.log("selectedchat", selectedChat)

    // Auto-scroll to the latest message
    // useEffect(() => {
    //     messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    // }, [messages]);

    // Sending a new message
    const sendMessage = async () => {
        if (!newMessage.trim()) return;

        const msg = {
            senderId: senderId,
            receiverId: selectedChat.otherUserId,
            rideId: rideId,
            message: newMessage,
        };

        setMessages((prev) => [...prev, { ...msg, senderId: senderId }]);
        try {
            await axios.post(`/messages/sendmessage/${selectedChat.otherUserId}`, msg);
            if (chatSocket) {
                chatSocket.emit("newMessage", { ...msg, receiverId: selectedChat.otherUserId });
            }
            // fetchMessages()
            setNewMessage('');
        } catch (err) {
            console.log('Error sending message:', err);
        }
    };

    return (
        <>
            {/* Chat box for selected chat */}
            {selectedChat && (
                <div className="chat-box">
                    <h4>Chat with {selectedChat?.receiverId?.userName || "Rider"}</h4>
                    <div className="messages">
                        {messages.map((msg, idx) => (
                            <div
                                key={idx}
                                className={`message ${msg.senderId === senderId ? 'sent' : 'received'}`}
                            >
                                {msg.message}
                            </div>
                        ))}
                        <div ref={messageEndRef} />
                    </div>
                    <div className="input-area">
                        <input
                            type="text"
                            placeholder="Type a message"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                        />
                        <button onClick={sendMessage}>
                            <FaPaperPlane />
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};
