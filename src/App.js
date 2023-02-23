import './App.css';
import { useState } from 'react'

function App() {

  const data = [
    { id: 1, name: "Thailand", region: "Asia", population: 100 },
    { id: 2, name: "Jpan", region: "Asia", population: 70 }
  ]

  const [countries, setCountries] = useState(data)

  return (
    <div className='container'>
      <ul>
      {countries.map((item) =>{
        return(
          <li key={item.id}>{item.name} | {item.region}</li>
        )
      })}
      </ul>
    </div>
  );
}

export default App;
