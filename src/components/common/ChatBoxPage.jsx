// import React, { useEffect, useRef, useState } from 'react'
// import { io } from 'socket.io-client';
// import "../../assets/chatboxpage.css"
// import { FaPaperPlane } from 'react-icons/fa';
// import axios from 'axios';
// import { Navbar } from '../layouts/Navbar';


// const socket = io('http://localhost:8000');
// // export const ChatBoxPage = ({userId})=>{
// // const [chats, setChats] = useState([]); // 🔥 CHANGE: Store list of chat previews
// // const [selectedChat, setSelectedChat] = useState(null); // 🔥 CHANGE: Track selected chat
// // const [messages, setMessages] = useState([]); // 🔥 CHANGE: Store messages of current chat
// // const [newMessage, setNewMessage] = useState('');
// // const messageEndRef = useRef(null);

// // // 🔥 CHANGE: Fetch chat list
// // useEffect(() => {
// //     const fetchChats = async () => {
// //         try {
// //             const res = await axios.get(`/messages/getChats/${userId}`);
// //             setChats(res.data);
// //         } catch (err) {
// //             console.log('Error fetching chats:', err);
// //         }
// //     };

// //     fetchChats();
// // }, [userId]);

// // // 🔥 CHANGE: Fetch messages for selected chat
// // useEffect(() => {
// //     const fetchMessages = async () => {
// //         if (!selectedChat) return;

// //         try {
// //             const res = await axios.get(`/messages/getMessages/${selectedChat.rideId}`);
// //             setMessages(res.data);
// //         } catch (err) {
// //             console.log('Error fetching messages:', err);
// //         }
// //     };

// //     fetchMessages();
// // }, [selectedChat]);

// // // 🔥 CHANGE: Scroll to bottom when new message comes
// // useEffect(() => {
// //     messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
// // }, [messages]);

// // // 🔥 CHANGE: Send a new message
// // const sendMessage = async () => {
// //     if (!newMessage.trim()) return;

// //     const msg = {
// //         senderId: userId,
// //         rideId: selectedChat.rideId,
// //         content: newMessage,
// //     };

// //     try {
// //         await axios.post('/messages/sendMessage', msg);
// //         setMessages((prev) => [...prev, msg]);
// //         setNewMessage('');
// //     } catch (err) {
// //         console.log('Error sending message:', err);
// //     }
// // };

// // return (
// //     <div className="chat-page"> {/* 🔥 CHANGE: Main container */}
// //         <div className="chat-list"> {/* 🔥 CHANGE: List of all chats */}
// //             <h3>Chats</h3>
// //             {chats.map((chat) => (
// //                 <div
// //                     key={chat.rideId}
// //                     className={`chat-item ${selectedChat?.rideId === chat.rideId ? 'active' : ''}`}
// //                     onClick={() => setSelectedChat(chat)}
// //                 >
// //                     <strong>{chat.otherUserName}</strong>
// //                     <p>{chat.lastMessage}</p>
// //                 </div>
// //             ))}
// //         </div>

// //         {/* 🔥 CHANGE: Chat box visible only when selectedChat is chosen */}
// //         {selectedChat && (
// //             <div className="chat-box">
// //                 <h4>Chat with {selectedChat.otherUserName}</h4>
// //                 <div className="messages">
// //                     {messages.map((msg, idx) => (
// //                         <div
// //                             key={idx}
// //                             className={`message ${msg.senderId === userId ? 'sent' : 'received'}`}
// //                         >
// //                             {msg.content}
// //                         </div>
// //                     ))}
// //                     <div ref={messageEndRef} />
// //                 </div>
// //                 <div className="input-area">
// //                     <input
// //                         type="text"
// //                         placeholder="Type a message"
// //                         value={newMessage}
// //                         onChange={(e) => setNewMessage(e.target.value)}
// //                         onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
// //                     />
// //                     <button onClick={sendMessage}>Send</button>
// //                 </div>
// //             </div>
// //         )}
// //     </div>
// // );
// // };


// export const ChatBoxPage = ({ rideId, userId, userRole }) => {
//     const [messages, setMessages] = useState([]);
//     const [newMessage, setNewMessage] = useState("");
//     const [typing, setTyping] = useState(false);
//     const messageEndRef = useRef(null);

//     const currentUser = JSON.parse(localStorage.getItem('user')) || {}
//     console.log(currentUser.id);


//     // Fetch chat history on component mount
//     useEffect(() => {
//         const fetchMessages = async () => {
//             try {
//                 const response = await axios.get(`/messages/readmessage/${rideId}`);
//                 const data = Array.isArray(response.data) ? response.data : [];
//                 setMessages(response.data);
//             } catch (error) {
//                 console.error("Error fetching messages:", error);
//             }
//         };
//         fetchMessages();

//         // Listen for new messages
//         socket.on("newMessage", (message) => {
//             if (message.rideId === rideId) {
//                 setMessages((prevMessages) => [...prevMessages, message]);
//             }
//         });

//         // Typing indicator
//         socket.on("typing", (isTyping) => {
//             setTyping(isTyping);
//         });

//         return () => {
//             socket.off("newMessage");
//             socket.off("typing");
//         };
//     }, [rideId]);

//     const sendMessage = async () => {
//         try {
//             const message = { senderId: currentUser.id, receiverId: rideId, rideId, content: newMessage };
//             console.log(message)
//             await axios.post("/messages/sendmessage", message);
//             socket.emit("newMessage", message);
//             setNewMessage("");
//         } catch (error) {
//             console.error("Error sending message:", error);
//         }
//     };

//     const handleTyping = (e) => {
//         setNewMessage(e.target.value);
//         socket.emit("typing", true);
//         setTimeout(() => {
//             socket.emit("typing", false);
//         }, 1000);
//     };

//     // Scroll to the latest message
//     useEffect(() => {
//         messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
//     }, [messages]);



//     return (
//         <>
//             {/* <Navbar /> */}
//             <div className="chatbox-page">
//                 <div className="chat-header">Chat</div>

//                 <div className="chat-messages">
//                     {messages.map((msg, idx) => {
//                         const isSent = msg.sender?._id === userId;
//                         return (
//                             <div className={`chat-message ${isSent ? "sent" : "received"}`} key={idx}>
//                                 {!isSent && (
//                                     <img src={msg.sender?.profilePicture} alt="avatar" className="chat-avatar" />
//                                 )}
//                                 <div className="message-content">
//                                     {!isSent && (
//                                         <div className="sender-name">
//                                             {msg.sender?.name} ({msg.sender?.role})
//                                         </div>
//                                     )}
//                                     <div className="bubble">{msg.content}</div>
//                                     <div className="timestamp">
//                                         {new Date(msg.createdAt || msg.timestamp).toLocaleTimeString([], {
//                                             hour: '2-digit',
//                                             minute: '2-digit',
//                                         })}
//                                     </div>
//                                 </div>
//                                 {isSent && (
//                                     <img src={msg.sender?.profilePicture} alt="avatar" className="chat-avatar" />
//                                 )}
//                             </div>
//                         );
//                     })}
//                     {typing && <div className="typing-indicator">Typing...</div>}
//                     <div ref={messageEndRef} />
//                 </div>

//                 <div className="chat-input-area">
//                     <input
//                         type="text"
//                         value={newMessage}
//                         onChange={handleTyping}
//                         placeholder="Type your message..."
//                         onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
//                     />
//                     <button onClick={sendMessage}>
//                         <FaPaperPlane />
//                     </button>
//                 </div>
//             </div>
//         </>
//     )
// }

import React, { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import "../../assets/chatboxpage.css";
import axios from 'axios';
import { FaPaperPlane } from 'react-icons/fa';
import { useParams } from 'react-router-dom';

const socket = io('http://localhost:8000');

export const ChatBoxPage = () => {
    const { riderId } = useParams();
    const [chats, setChats] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const messageEndRef = useRef(null);
    const user = JSON.parse(localStorage.getItem("user"));
    const driverId = user?.id;

    // Fetch messages for selected chat
    // useEffect(() => {
    //     const fetchMessages = async () => {
    //         if (!selectedChat) return;
    //         try {
    //             const res = await axios.get(`/messages/readmessage/${selectedChat.otherUserId}?senderId=${riderId}`);
    //             setMessages(res.data.messages);
    //         } catch (err) {
    //             console.log('Error fetching messages:', err);
    //         }
    //     };

    //     fetchMessages();

    //     socket.on("newMessage", (msg) => {
    //         if (msg.receiverId === selectedChat?.otherUserId || msg.senderId === selectedChat?.otherUserId) {
    //             setMessages((prev) => [...prev, msg]);
    //         }
    //     });

    //     return () => {
    //         socket.off("newMessage");
    //     };
    // }, [selectedChat, rider]);

    useEffect(() => {
        if (!selectedChat) return;

        const fetchMessages = async () => {
            try {
                const res = await axios.get(`/messages/readmessage/all/${selectedChat.driverId}?senderId=${riderId}`);
                setMessages(res.data.messages);
            } catch (err) {
                console.log('Error fetching messages:', err);
            }
        };

        fetchMessages();

        const handleIncomingMessage = (msg) => {
            if (
                msg.receiverId === selectedChat.otherUserId ||
                msg.senderId === selectedChat.otherUserId
            ) {
                setMessages((prev) => [...prev, msg]);
            }
        };

        socket.on("newMessage", handleIncomingMessage);

        return () => {
            socket.off("newMessage", handleIncomingMessage);
        };
    }, [selectedChat, riderId]);


    // Scroll to latest message
    useEffect(() => {
        messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const sendMessage = async () => {
        if (!newMessage.trim()) return;

        const msg = {
            senderId: riderId,
            message: newMessage,
        };

        try {
            await axios.post(`/messages/sendmessage/${selectedChat.otherUserId}`, msg);
            socket.emit("newMessage", { ...msg, receiverId: selectedChat.otherUserId });
            setMessages((prev) => [...prev, { ...msg, senderId: riderId }]);
            setNewMessage('');
        } catch (err) {
            console.log('Error sending message:', err);
        }
    };

    return (
        <div className="chat-page">
            <div className="chat-list">
                <h3>Chats</h3>
                {chats.length === 0 ? (
                    <p>No chats yet</p>
                ) : chats.map((chat) => (
                    <div
                        key={chat.otherUserId}
                        className={`chat-item ${selectedChat?.otherUserId === chat.otherUserId ? 'active' : ''}`}
                        onClick={() => setSelectedChat(chat)}
                    >
                        <strong>{chat.otherUserName}</strong>
                        <p>{chat.lastMessage || "No messages yet"}</p>
                    </div>
                ))}
            </div>

            {selectedChat && (
                <div className="chat-box">
                    <h4>Chat with {selectedChat.otherUserName}</h4>
                    <div className="messages">
                        {messages.map((msg, idx) => (
                            <div key={idx} className={`message ${msg.senderId === riderId ? 'sent' : 'received'}`}>
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
                        <button onClick={sendMessage}><FaPaperPlane /></button>
                    </div>
                </div>
            )}
        </div>
    );
};

