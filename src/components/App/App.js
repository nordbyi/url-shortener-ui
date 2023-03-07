import React, { useEffect, useState } from 'react';
import './App.css';
import { getUrls } from '../../apiCalls';
import UrlContainer from '../UrlContainer/UrlContainer';
import UrlForm from '../UrlForm/UrlForm';

const App = (props) => {

  const [urls, setUrls] = useState([])

  useEffect(() => {
    const getData = async () => {
      try{
        const data = await getUrls()
        console.log(data)
        setUrls(data.urls)
      } catch {
        console.log('error')
      }
    }
    getData()
  }, [])


    return (
      <main className="App">
        <header>
          <h1>URL Shortener</h1>
          <UrlForm />
        </header>

        <UrlContainer urls={urls}/>
      </main>
    );
  }


export default App;
