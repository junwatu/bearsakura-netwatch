import React from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'

const PacketVisualization = ({ data }) => {
	const formattedData = data.packets.results.map((packet, index) => ({
	  name: `Packet ${index + 1}`,
	  length: parseInt(packet.length, 10),
	}))
  
	return (
	  <BarChart width={800} height={400} data={formattedData}>
		<CartesianGrid strokeDasharray="3 3" />
		<XAxis dataKey="name" />
		<YAxis />
		<Tooltip />
		<Bar dataKey="length" fill="#8884d8" />
	  </BarChart>
	)
  }
  
  export default PacketVisualization
  