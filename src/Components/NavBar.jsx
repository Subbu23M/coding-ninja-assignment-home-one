import HomePage from "./HomePage";
import LoginPage from "./LoginPage";
import UsersList from "./UsersList";
import { Link,Route,withRouter } from "react-router-dom";
import swal from "sweetalert";

const NavBar = (props) => {
    const {
        boolValue,
        handleLoginCallBackFunc
    } = props;

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
        </>
    )
}

export default withRouter(NavBar)