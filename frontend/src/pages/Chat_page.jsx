import '../App.css';
import InputField from '../components/inputField';
import Header from '../components/Header';
import Message from '../components/Message';
import { useState, useEffect, useRef } from 'react';
import axiosInstance from '../utilities/axiosConfig';
import {io} from 'socket.io-client';

// remember to delete the below line, it's for debugging
// localStorage.clear();
// console.log(localStorage.getItem('userId'));


function Chat(){
    const [inputValue, setInputValue] = useState('');
    const [messages, setMessages] = useState([]);
    const messageBox = useRef(null);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const userId = localStorage.getItem('userId');
    const [loading, setLoading] = useState(false);
    const socket = io('http://127.0.0.1:5000')
    
    
    // get more message history from backend based on page number
    const loadMoreMessagesHistory = async () => {
        if (!hasMore || loading) return;
        
        setLoading(true);
        try {
            const response = await axiosInstance.get('/api/history', {params: {page}});

            if (response.data.length === 0) {
                setHasMore(false);
                return
            }
            
            setMessages(prevMessages => [
                ...response.data.map(newMessage => ({
                    text: newMessage.message,
                    isSender: userId === newMessage.userId
                })),
                
                ...prevMessages
            ]);
            
            setPage(page => page + 1);

        } catch (error) {
            console.error('Error fetching messages:', error);
        } finally {
            setLoading(false);
        }
        
        
    };
    
    // Listens when user scrolls to top
    const handleScroll = (e) => {
        const bottom = e.target.scrollTop === 0;
        if (bottom){
            console.log('trying to load more messages!!')
            loadMoreMessagesHistory();
        }   
    };
    
    
    // handle userInput
    const handleInputChanges = (value) => {
        setInputValue(value);
    };
    
    
    // handle submitting a message
    const handleSubmitClick = async () => {
        if (inputValue.trim() !== ''){

            try {
                await axiosInstance.post('/api/chat', {"Message": inputValue});
                
                socket.emit('new_chat_message', {'message': inputValue, 'userId':userId});

            } catch (error) {
                console.log('Error sending message:', error)
            }           
            
            setInputValue('');
        }
    }; 
    
    
    
    // handle getting inital message history
    useEffect(() => {
        const fetchMessages = async () => {
            await loadMoreMessagesHistory();

            setTimeout(() => {
                messageBox.current.scrollTop = messageBox.current.scrollHeight;
            }, 500);
        };

        fetchMessages();

        
        const handleMessage = (data) => {
            setMessages((prevMessages) => [...prevMessages, { text: data.message, isSender: data.userId === userId}])
            messageBox.current.scrollTop = messageBox.current.scrollHeight;
        };
        
        socket.on('new_chat_message', handleMessage);

        return () => {
            socket.off('new_chat_message', handleMessage);
            socket.disconnect();
        };
    }, []);


    return (
        <div className='container-fluid'>
            <div className='row'>
                <div className='header_container col-12'>
                    <Header/>
                </div>
            </div>

            {/* Displays the message board */}
            <div className='row'>
                <div className='col-12 '>
                    <div className='input_container mx-auto' onScroll={handleScroll} ref={messageBox}>
                        {messages.map((message, index) => (
                            <Message
                                text={message.text}
                                isSender={message.isSender}
                                key={index}
                            />
                        ))}
                    </div>
                </div>
            </div>

            <div className='row justify-content-center'>
                <div className='col-4 '>
                    {/* Displays the input text button */}
                    <InputField 
                        inputValue={inputValue}
                        onInputChange={handleInputChanges}
                        onButtonClick={handleSubmitClick}
                    />
                </div>
            </div>
        </div>
    );
}


export default Chat;