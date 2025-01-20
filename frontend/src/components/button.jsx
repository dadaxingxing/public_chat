import '../App.css';


const Button = ({onClick, children}) => {
    return (
        <button className='start_button' onClick={onClick}>start</button>
    );
}


export default Button;