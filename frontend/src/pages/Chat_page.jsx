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
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const socket = io('http://127.0.0.1:5000')
    const scrollRef = useRef(null);


    // get more message history from backend based on page number
    const loadMoreMessagesHistory = async () => {
        if (!hasMore) return;

        try {
            const response = await axiosInstance.get('/api/history', {params: {page}});

            if (response.data.length === 0) {
                setHasMore(false);
                return
            }
            
            setMessages(prevMessages => [
                ...response.data.map(newMessage => ({
                    text: newMessage.message,
                    isSender: localStorage.getItem('userId') === newMessage.userId
                })),
                
                ...prevMessages
            ]);
            
            setPage(page => page + 1);

        } catch (error) {
            console.error('Error fetching messages:', error);
        }  
    };
    
    // Listens when user scrolls to top
    const handleScroll = (e) => {
        const top = e.target.scrollTop === 0;
        if (top && !loading){
            console.log('trying to load more messages!!')
            setLoading(true);
        }   
    };
    
    useEffect(() => {
        if (loading){
            loadMoreMessagesHistory();
        }

    }, [loading]);


    // handle userInput
    const handleInputChanges = (value) => {
        setInputValue(value);
    };
    
    
    // handle submitting a message
    const handleSubmitClick = async () => {
        if (inputValue.trim() !== ''){

            try {
                await axiosInstance.post('/api/chat', {"Message": inputValue});
                
                socket.emit('new_chat_message', {'message': inputValue, 'userId':localStorage.getItem('userId')});

            } catch (error) {
                console.log('Error sending message:', error)
            }           
            
            setInputValue('');
        }
    }; 
    

    // handle getting inital message history
    useEffect(() => {
        loadMoreMessagesHistory();

        
        const handleMessage = (data) => {
            setMessages((prevMessages) => [...prevMessages, { text: data.message, isSender: data.userId === localStorage.getItem('userId')}])
        };
        
        socket.on('new_chat_message', handleMessage);

        return () => {
            socket.off('new_chat_message', handleMessage);
            socket.disconnect();
        };
    }, []);


    useEffect(() => {
        if (!loading) {
            scrollRef.current?.scrollIntoView({ behavior: 'smooth'});    
        }
        setLoading(false);
    }, [messages]);

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
                    <div className='input_container mx-auto' onScroll={handleScroll} >
                        {messages.map((message, index) => (
                            <Message
                                text={message.text}
                                isSender={message.isSender}
                                key={index}
                            />
                        ))}
                        <div ref={scrollRef}></div>
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