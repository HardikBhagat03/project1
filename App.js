import './App.css';
import Button from 'react-bootstrap/Button';

function App() {
  return (
    <div class ="form">
      <form >
        <label class ="lable">
          Enter the number:
          <br/> 
          <input type="number" name="name" max="20"/>
        </label>
        <input type="submit" value="Submit" />
        
      </form>
      <div className="App">
        <StockList />
      </div>
    </div>
  );
}

export default App;
