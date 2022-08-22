import {useEffect} from 'react';
import './App.css';

function App() {
    useEffect(() => {
        fetch('http://localhost:6000/api/post/630204f2b590c05b19465c5a', { mode: 'no-cors'})
            .then(res => res.json)
            .then(data => console.log(data))
            .catch(e => console.log(e));
    }, []);
    return(
        <div className="App">
               some text 
        </div>
    );
}

export default App;
