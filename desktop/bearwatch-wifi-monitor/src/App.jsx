import React, { useState, useEffect } from 'react'
import PacketVisualization from './packet-visualization'
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";

function App() {
  const [packetData, setPacketData] = useState(null)
  const [apiBaseUrl, setApiBaseUrl] = useState(null)
  useEffect(() => {
    async function fetchPacketData() {
      const config = await invoke('read_config');
      const apiBaseUrlConfig = await invoke('get_api_base_url', { config: config });
      const response = await fetch(`${apiBaseUrlConfig}/get-all-packets`)
      const data = await response.json()

      setPacketData(data)
      setApiBaseUrl(apiBaseUrlConfig)
    }
  
    fetchPacketData()  // fetch once initially
    const intervalId = setInterval(fetchPacketData, 5000)  // fetch every 5 seconds
    
    return () => clearInterval(intervalId)  // cleanup interval on component unmount
  }, [])
  

  return (
    <div className="container">
      {packetData && <PacketVisualization data={packetData} />}
      <p className='packet-server'>
        Packet Server: {apiBaseUrl}
      </p>
    </div>
  );
}

export default App;
