import React, { useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [query, setQuery] = useState('')
  const [artist, setArtist] = useState('')
  const search = event => {
    if(event.key === 'Enter') {
      axios
      .get(`http://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=${query}&api_key=4f503138c40c29787e2979a5193249ad&format=json`)
      .then(data => {
        const trackList = document.getElementById('track-list')
        const slicedArray = data.data.toptracks.track.slice(0,10)
        trackList.innerHTML = 
        slicedArray.map(track => {
          return `<li key=${track.mbid}>${track.name}</li>`
        }).join("")
        document.getElementById("artistitle").classList.remove("hide");
        setArtist(data.data.toptracks["@attr"].artist)
        setQuery("");
        document.getElementById("search-bar").classList.add("hide")
        document.getElementById("searchforartist").classList.add("hide")
        document.getElementById("restart").classList.remove("hide")

      })
    }
  }
  function reload(){
   
      window.location.reload()
    
  }

  return (
    <>
      <div className='inputs'>
        <h1 id="searchforartist"> Search Top 10 Tracks Of Your Favourite Artist</h1>
        <input 
        id='search-bar' 
        type='text' 
        placeholder='Search...' 
        onChange={event => setQuery(event.target.value)} 
        value={query} 
        onKeyPress={search} 
        />
      </div>
      <h1 id="artistitle" class="hide"> Top 10 Tracks of {artist}</h1>
      <ol id='track-list'></ol>
      <button class="hide" id="restart" onClick={reload}> Again </button>
    </>
  );
}

export default App;