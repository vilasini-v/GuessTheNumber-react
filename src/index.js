import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const x= () =>Math.floor(Math.random()*50 + 1); 

function App(){
  const [numb,setNum] = useState(x());
  const [guess, setGuess]=useState('');
  const[msg, setMsg]=useState('');
  const[attempts, setAttempts]=useState(0);

  const handleChange= (event) => {
    setGuess(event.target.value);
  };

  const handleSubmit=(event) =>{
    event.preventDefault();
    const num=parseInt(guess);
    if(isNaN(num) || num<0 || num>50){
      setMsg(`INVALID NUMBER`);
      return;
    }

    setAttempts(attempts+1);
    if(num==numb){
      setMsg(`Congratulations! You guessed it in ${attempts} attempts`);
    }else if(num<numb){
      setMsg(`Try a higher number. You have ${5-attempts} attempts left`);
    }else{
      setMsg(`Try a smaller number. You have ${5-attempts} attempts left`);
    }
    setGuess('');

    if(attempts>=5){
      setMsg( `Game Over! The correct number was ${numb}` );
    }
  }
  const handleReset=()=>{
    setNum(x());
    setGuess('');
    setMsg('');
    setAttempts(0);
  }
  
  return(
    <div className='container'>
      <h1>Guess the number!</h1>
      <p>Guess a number between 1 to 100</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor='num'>Enter your Guess: </label>
        <input type='number' id='num' name='num' value={guess} className='inputBox' onChange={handleChange} />
        <button type="submit" className="button">Submit</button>
        <button type="reset" className='button' onClick={handleReset}>Reset</button>
      </form>
      {msg && <p>{msg}</p>}
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));