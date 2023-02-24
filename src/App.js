import './App.css';
import { useState, useEffect } from 'react'

function App() {

  const [countries, setCountries] = useState([])

  useEffect(() => {
    fetch("https://restcountries.com/v2/all")
      .then(res => res.json())
      .then(data => {
        setCountries(data)
      })
  }, [])

  const [enterName, setEnterName] = useState("")
  const [nameFilter] = useState(["name", "capital"])

  const searchCountry = (countries) => {
    return countries.filter((item) => { //กรองชุดข้อมูลประเทศทั้งหมดใส่ item
      // eslint-disable-next-line
      return nameFilter.some((filter) => { //.some คือ เมื่อตรงกับอันใดอันหนึ่ง ["name", "capital"] // กำหนดตัว filter 
        if (item[filter]) {//ถ้ามีตรงกับชุดข้อมูลประเทศทั้งหมดในช่องของ filter("name","capital") // indexOf เช็คสิ่งที่ค้นหา(enterName)ผ่าน index
          return item[filter].toString().toLowerCase().indexOf(enterName.toLowerCase()) > -1
          // > -1 แปลว่ามี index ที่ตรงกัน เช่น มีตรงกัน 1 ตัว = 0 , มีตรงกัน 2 ตัว = 1 ,ไม่ตรงกับ index ไหนเลย return -1
        }
      })
    })
  }

  const formatNumber = (num) => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }

  const checkArea = (area) => { // เช็คว่ามี area หรือป่าว เพราะบางข้อมูลไม่มี area
    if (area) {
      return formatNumber(area)
    }
    else{
      return area
    }
  }

  return (
    <div className='container'>
      <div className='search-container'>
        <label htmlFor='search-form'>
          <input type="text" className='search-input' placeholder='Enter country name(Capital,Country)' value={enterName} onChange={(n) => setEnterName(n.target.value)}></input>
        </label>
      </div>
      <ul className='row'>
        {searchCountry(countries).map((item, index) => {
          return (
            <li key={index}>
              <div className='card'>
                <div className='card-title'>
                  <img src={item.flag} alt={item.name} />
                </div>
                <div className='card-body'>
                  <div className='crad-description'>
                    <h2>{item.name}</h2>
                    <ol className='card-list'>
                      <li>Population : <span>{formatNumber(item.population)}</span> </li>
                      <li>Region : <span>{item.region}</span></li>
                      <li>Area : <span>{checkArea(item.area)} km²</span></li>
                      <li>Capital : <span>{item.capital}</span></li>
                    </ol>
                  </div>
                </div>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  );
}

export default App;
