import {useEffect} from 'react';
import './App.css';

function App() {
    useEffect(() => {
        fetch('http:/localhost:6000/api/post')
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
