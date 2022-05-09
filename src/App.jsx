import { useState,useEffect } from 'react';
import NavBar from './Components/NavBar';
import './Styling/Main.scss';
import { Link} from 'react-router-dom';

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Pass callback function to child component to update state from child parent.
    const handleLogin = () => {
        setIsLoggedIn(!isLoggedIn);
    }

    // To stop page reloading
    // Invoke useEffect hook
    useEffect(() => {
        if (localStorage.getItem('JWT_Token')) {
            handleLogin();
        }
    });

    const removeUnderline = {
        textDecoration : 'none'
    }

    return(
        <>
            <Link
                to='/'
                style={removeUnderline}
            >
                <h3
                    className='text-dark ml-2 display-3 mt-1'
                >
                    design, <span className='text-danger'>string</span> 
                </h3>
            </Link>

            {/* <Switch>
                <Route
                    path='/'
                    component={HomePage}
                    exact
                />
            </Switch> */}

            <NavBar
                boolValue={isLoggedIn}
                handleLoginCallBackFunc = {handleLogin}
            />
        </>
    )
}

export default App;