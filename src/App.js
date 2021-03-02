import './App.css';
import { useState } from 'react'
import Header from './components/Header'
import Postcard from './components/Postcard'
import dogImage from './assets/normalMochi.jpg'

function App() {

  const [sendingData, setSendingData] = useState(false);

  // post request with base64, kernel size and number of colour clusters
  // returns an array with pixel data representing cluster group
  const apiRequest = async (data) => {
    const url = 'https://pfft9x63fc.execute-api.eu-west-2.amazonaws.com/default/python_pixelator';

    const options = {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'text/plain'
      },
      body: JSON.stringify(data)
    }

    setSendingData(true);
    const response = await fetch(url, options);
    setSendingData(false);
    return response.json();
  }

  return (
    <div className="App">
      <Header></Header>

      <div style={{ position: 'relative' }}>

        <div className="centers">
          <Postcard canvasId="mochi" canvasImage={dogImage} requestImage={apiRequest} requestState={sendingData}></Postcard>
        </div>

      </div>


    </div>
  );
}

export default App;
