import React, {useEffect, useState} from "react";
import '../App.css';
import axiosInstance from "../utilities/axiosConfig";


function Admin(){   
    const [featureMessage, setFeatureMessage] = useState([]);
    useEffect(() => {
        const fetchMessage = async () =>{
            try {   
                const response = await axiosInstance.get('/api/admin');
                console.log(response.data);
                const modifiedData = response.data.map(item => ({
                    message: item.message
                }));
                setFeatureMessage(modifiedData);

            } catch (error) {
                console.log('Error fetching feature messages:', error);
            }};  

        fetchMessage();

    }, []);

    return (
        <div >
            {featureMessage.map((value) => (
                <li className="display-3">{value.message}</li>
            ))
            }
        </div>
    )
}


export default Admin;
