import React from 'react';

import spinner from './Assets/Spinner.gif';

// ES6-Arrow function
const Loader = (props) => {

    return (
        <>

            <img 
                src={spinner} 
                alt="spinner" 
            />

        </>
    )
}

export default Loader;