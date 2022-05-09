import HomePage from "./HomePage";
import LoginPage from "./LoginPage";
import UsersList from "./UsersList";
import PageError from "./PageError";
import { Link,Route,withRouter,Switch } from "react-router-dom";
import swal from "sweetalert";
import ReactGA from 'react-ga4';
import {useEffect} from 'react';

const NavBar = (props) => {
    const {
        boolValue,
        handleLoginCallBackFunc
    } = props;

    useEffect(() => {
        ReactGA.initialize([{
            trackingId:'G-J5DKWRZYYW'
        }])
        ReactGA.send({hitType:'pageview',page:window.location.pathname})
    },[]);

    const leftPart = (
        <>
            <li>
                <Link
                    to='/users'
                >
                    Users 
                </Link>
            </li>

            <li>
                <Link
                    to='logout'
                    onClick= {() => {
                        swal('you are logged out successfully');

                        // Invoke callback function
                        handleLoginCallBackFunc();

                        // Remove JWT_TOKEN from localStorage
                        localStorage.removeItem('JWT_TOKEN');

                        // Navigate user to home page
                        props.history.push('/')
                    }}
                >
                    Logout
                </Link>
            </li>            
        </>
    )

    const rightPart = (
        <>
            <li>
                <Link
                    to='/login'
                >
                    Login 
                </Link>
            </li>
        </>
    )

    return(
        <>
            <nav>
                <ul>
                    <li>
                        <Link
                            to='/'
                        >
                            Home 
                        </Link>
                    </li>

                    {/* Conditional rendering - Ternary Operator */}
                    {
                        (boolValue) ? leftPart : rightPart
                    }
                </ul>
            </nav>

            <Switch>
                <Route
                    path='/'
                    component={HomePage}
                    exact
                />
                <Route
                    path='/users'
                    component={UsersList}
                    exact
                />
                <Route
                    path='/login'
                    exact
                    render={(props) => {
                        return(
                            <LoginPage
                                {...props}
                                handleLoginCallBackFunc = {handleLoginCallBackFunc}
                            />
                        )
                    }}
                />
                <Route
                    path='/*'
                    component={PageError}
                    exact
                />
            </Switch>
        </>
    )
}

export default withRouter(NavBar)