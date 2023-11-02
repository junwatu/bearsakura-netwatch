import React, { useState, useEffect } from 'react'
import PacketVisualization from './packet-visualization'
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";

function App() {
  const [packetData, setPacketData] = useState(null)

  useEffect(() => {
    async function fetchPacketData() {
      const config = await invoke('read_config');
      const apiBaseUrl = await invoke('get_api_base_url', { config: config });
      const response = await fetch(`${apiBaseUrl}/get-all-packets`)
      const data = await response.json()
      console.log(data)
      setPacketData(data)
    }
  
    fetchPacketData()  // fetch once initially
    const intervalId = setInterval(fetchPacketData, 5000)  // fetch every 5 seconds
    
    return () => clearInterval(intervalId)  // cleanup interval on component unmount
  }, [])
  

  return (
    <div className="container">
      {packetData && <PacketVisualization data={packetData} />}
    </div>
  );
}

export default App;
