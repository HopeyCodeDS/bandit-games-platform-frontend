import { useContext, useState, useEffect } from "react";
import {
    Box,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Paper,
    TextField,
    Typography,
    CircularProgress,
} from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import { useChatBot } from "../hooks/useChatBot.ts";
import SecurityContext from "../context/SecurityContext.ts";
import { useStompContext } from "../context/StompContext.tsx";
import useReceiveMessageFromChatbot from "../hooks/useReceiveMessageFromChatbot.ts";

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<string[]>([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);

    const { loggedInUser } = useContext(SecurityContext);
    const { client, isConnected } = useStompContext();

    const { sendMessage, error } = useChatBot(client, isConnected, input, loggedInUser?.userId);
    const chatbotResponse = useReceiveMessageFromChatbot(client, isConnected, loggedInUser?.userId);

    const toggleChat = () => {
        setIsOpen(!isOpen);
    };

    const handleSendMessage = async () => {
        if (input.trim()) {
            setMessages((prevMessages) => [...prevMessages, `You: ${input}`]);
            setInput("");
            setLoading(true); // Set loading state to true when message is sent
            await sendMessage();
        }
    };

    useEffect(() => {
        if (chatbotResponse) {
            setMessages((prevMessages) => [...prevMessages, `Chatbot: ${chatbotResponse}`]);
            setLoading(false);
        }
    }, [chatbotResponse]);

    return (
        <>
            <IconButton
                onClick={toggleChat}
                style={{
                    position: "fixed",
                    bottom: "40px",
                    right: "30px",
                    background: "linear-gradient(135deg, #6a11cb, #2575fc)",
                    color: "white",
                    zIndex: 1000,
                    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.3)",
                    borderRadius: "50%",
                    width: "60px",
                    height: "60px",
                }}
            >
                <ChatIcon style={{ fontSize: "30px" }} />
            </IconButton>

            <Drawer
                anchor="right"
                open={isOpen}
                onClose={toggleChat}
                PaperProps={{
                    style: {
                        width: "500px",
                        borderRadius: "10px 0 0 10px",
                        boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
                        overflow: "hidden",
                        background: "linear-gradient(135deg, #f3f4f6, #fdfbfb)",
                    },
                }}
            >
                {/* Header */}
                <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    p={2}
                    style={{
                        background: "linear-gradient(135deg, #6a11cb, #2575fc)",
                        color: "white",
                        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                    }}
                >
                    <Typography variant="h6" style={{ fontWeight: "bold" }}>
                        Chatbot
                    </Typography>
                    <IconButton onClick={toggleChat} style={{ color: "white" }}>
                        <CloseIcon />
                    </IconButton>
                </Box>

                {/* Messages */}
                <Box
                    p={2}
                    flexGrow={1}
                    overflow="auto"
                    style={{
                        backgroundColor: "#f3f4f6",
                        height: "calc(100vh - 140px)",
                    }}
                >
                    <List>
                        {messages.map((message, index) => {
                            const isUserMessage = message.startsWith("You:");
                            return (
                                <ListItem
                                    key={index}
                                    style={{
                                        justifyContent: isUserMessage ? "flex-end" : "flex-start",
                                    }}
                                >
                                    <Paper
                                        style={{
                                            padding: "10px 15px",
                                            borderRadius: "20px",
                                            backgroundColor: isUserMessage ? "#d6eaff" : "#f5f5f5",
                                            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                                            maxWidth: "70%",
                                        }}
                                    >
                                        <ListItemText
                                            primary={
                                                <Typography
                                                    variant="body2"
                                                    style={{
                                                        color: isUserMessage ? "#0d47a1" : "#424242",
                                                    }}
                                                >
                                                    {message}
                                                </Typography>
                                            }
                                        />
                                    </Paper>
                                </ListItem>
                            );
                        })}

                        {loading && (
                            <ListItem style={{ justifyContent: "flex-start" }}>
                                <CircularProgress size={24} style={{ color: "#6a11cb" }} />
                            </ListItem>
                        )}
                    </List>

                    {error && (
                        <Typography color="error" variant="body2" align="center">
                            {error}
                        </Typography>
                    )}
                </Box>

                {/* Input Field */}
                <Box
                    p={2}
                    display="flex"
                    alignItems="center"
                    borderTop="1px solid #ddd"
                    style={{
                        background: "linear-gradient(135deg, #eef2f3, #f9f9f9)",
                        boxShadow: "0 -2px 10px rgba(0, 0, 0, 0.1)",
                    }}
                >
                    <TextField
                        variant="outlined"
                        size="small"
                        placeholder="Type a message..."
                        fullWidth
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        style={{
                            backgroundColor: "white",
                            borderRadius: "8px",
                        }}
                    />
                    <IconButton
                        onClick={handleSendMessage}
                        style={{
                            marginLeft: "10px",
                            background: "linear-gradient(135deg, #6a11cb, #2575fc)",
                            color: "white",
                            borderRadius: "50%",
                            width: "45px",
                            height: "45px",
                            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                        }}
                    >
                        <SendIcon />
                    </IconButton>
                </Box>
            </Drawer>
        </>
    );
};

export default Chatbot;
