import { useState,useEffect } from "react";
import ReactPaginate from 'react-paginate';
import axios from "axios";
import swal from "sweetalert";
import Loader from '../Components/Loader';

const UsersPagination = () => {
    const [usersList, setUsersList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Asynchronous nature
    const fetchData = () => {
        const baseURL = 'https://reqres.in/api/users?page=1';

        axios
            .get(baseURL)

            .then((response) => {
                const result = response.data.data;
                // console.log(result);
                setUsersList(result);
                setIsLoading(!true);
            })

            .catch((error) => {
                swal(error.message);
            })
    }

    // Invoke useEffect hook
    useEffect(fetchData, []);

    // For pagination to make API call
    const fetchUsers = (currentPage) => {
        const baseURLTwo = `https://reqres.in/api/users?page=${currentPage}`;

        axios
            .get(baseURLTwo)
            .then((response) => {
                const result = response.data.data;
                setUsersList(result);
            })
            .catch((error) => {
                swal(error.message);
            })
    }

    // Event Handler as callback function
    const handlePageClick = (data) => {
        let currentPage = data.selected + 1;

        // Invoke function
        fetchUsers(currentPage);
    }

    const result = (
        <section>
            <div className="container">
                {/* row */}
                <div className="row">
                    {
                        usersList.map((user) => {
                                    const {
                                        id,
                                        avatar,
                                        first_name,
                                        email
                                    } = user;
                            return(
                                <div className="col-lg-3 col-sm-6 mb-2" key={id}>
                                    <div className="card  text-center p-2">
                                        <img
                                            src={avatar}
                                            alt={first_name}
                                            className='img-fluid'
                                        />
                                        <h3 className="text-dark my-2 card-title">
                                            {first_name}
                                        </h3>
                                        <p className="email card-subtitle">
                                            {email}
                                        </p>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                {/* row */}
            </div>
        </section>
    )

    return(
        <>
            {/* Conditional rendering - Ternary Operator */}
            {
                (isLoading) ? <Loader/> : result
            }

            <ReactPaginate
                previousLabel={'<'}
                nextLabel={'>'}
                pageCount={2}
                onPageChange={handlePageClick}
                containerClassName={'pagination pagination-md justify-content-center'}
                pageClassName={'page-item'}
                pageLinkClassName={'page-link'}
                previousClassName={'page-item'}
                previousLinkClassName={'page-link'}
                nextClassName={'page-item'}
                nextLinkClassName={'page-link'}
                activeClassName={'active'}
            />
        </>
    )
}

export default UsersPagination