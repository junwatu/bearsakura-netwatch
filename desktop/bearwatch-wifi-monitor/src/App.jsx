import React, { useState, useEffect } from 'react'
import PacketVisualization from './packet-visualization'
import "./App.css";

function App() {
  const [packetData, setPacketData] = useState(null)

  useEffect(() => {
    async function fetchPacketData() {
      const response = await fetch('http://localhost:4000/get-all-packets')
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
      <h1>Wi-Fi Packet Monitor</h1>
      {packetData && <PacketVisualization data={packetData} />}
    </div>
  );
}

export default App;
