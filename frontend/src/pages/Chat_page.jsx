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
// console.log(process.env.REACT_APP_BASE_BACKEND_URL)


function Chat(){
    const [inputValue, setInputValue] = useState('');
    const [messages, setMessages] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const scrollRef = useRef(null);
    const [messageSendStatus, setMessageSendStatus] = useState(true);
    const [showLoading, setShowLoading] = useState(false);

    const socket = io(import.meta.env.VITE_BASE_BACKEND_URL, {
        transports: ['websocket'],
        secure: true,
        query: {
            token: localStorage.getItem('Token')
        }
    });


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
                ...response.data.map(data => ({
                    text: data.message,
                    isSender: localStorage.getItem('userId') === data.userId,
                    user: data.userId
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
        if (inputValue.trim() !== '' && messageSendStatus){
            setShowLoading(true);
            setMessageSendStatus(false);

            try {
                await axiosInstance.post('/api/chat', {"Message": inputValue});
                
               socket .emit('new_chat_message', {'message': inputValue, 'userId':localStorage.getItem('userId')});
                console.log('emit sent correctly!!');

            } catch (error) {
                console.log('Error sending message:', error)
            } finally {
                setMessageSendStatus(true);
                setShowLoading(false);
            }       

            setInputValue('');
        }
    }; 
    

    // handle getting inital message history
    useEffect(() => {
        loadMoreMessagesHistory();

        const handleMessage = (data) => {
            console.log('Receive new message')
            setMessages((prevMessages) => [...prevMessages, { 
                user: data.userId, 
                text: data.message, 
                isSender: data.userId === localStorage.getItem('userId')}])
        };
        
        socket.on('new_chat_message', handleMessage);
        socket.on('connect_error', (err) => {
            console.log(`Connection failed, ${err}`);
        });


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
                {showLoading && (
                    <div className='col-12 d-flex justify-content-center position-absolute'>
                        <div className='spinner-border' role='status' style={{ zIndex: 1000 }} />
                    </div>
                )}


                <div className='col-12'>
                    <div className='input_container  mx-auto' onScroll={handleScroll} >
                        {messages.map((message, index) => (
                            <Message
                                text={message.text}
                                isSender={message.isSender}
                                key={index}
                                user={message.user}
                            />
                        ))}
                        
                        <div ref={scrollRef}></div>
                    </div>
                </div>
            </div>

            <div className='row justify-content-center pt-4'>
                <div className='col-8 col-md-4'>
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