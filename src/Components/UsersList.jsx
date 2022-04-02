import UsersPagination from '../Components/UsersPagination';

const UsersList = () => {
    return(
        <>
            <h1
                className="text-center text-warning"
            >
                Users List
            </h1>

            <UsersPagination/>
        </>
    )
}

export default UsersList