import HeaderTag from './HeaderTag';
import UsersPagination from '../Components/UsersPagination';

const UsersList = () => {
    return(
        <>
            <HeaderTag
                text='Users List'
            />
            <UsersPagination/>
        </>
    )
}

export default UsersList