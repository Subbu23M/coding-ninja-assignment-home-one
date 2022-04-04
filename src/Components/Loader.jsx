import spinner from '../Assets/Spinner.gif';

// ES6-Arrow function
const Loader = () => {

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