import { useState,useEffect } from 'react';
import './Styling/Main.scss';
import NavBar from './Components/NavBar';

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Pass callback function to child component to update state from child parent.
    const handleLogin = () => {
        setIsLoggedIn(!isLoggedIn);
    }

    // To stop page reloading
    const useFunc = () => {
        if (localStorage.getItem('JWT_Token')) {
            handleLogin();
        }
    }

    // Invoke useEffect hook
    useEffect(useFunc, []);

    return(
        <>
            <h3
                className='text-dark ml-2 display-3 mt-1'
            >
                design , <span className='text-danger'>string</span> 
            </h3>

            <NavBar
                boolValue={isLoggedIn}
                handleLoginCallBackFunc = {handleLogin}
            />
        </>
    )
}

export default App;