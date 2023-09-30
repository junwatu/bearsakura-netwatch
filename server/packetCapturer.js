import pkg from 'cap';
const { Cap, decoders } = pkg;

const PROTOCOL = decoders.PROTOCOL;

let packets = [];

function startCapturing(ipAddress) {
	const c = new Cap();
	const device = Cap.findDevice(ipAddress);
	const filter = 'ip';
	const bufSize = 10 * 1024 * 1024;
	const buffer = Buffer.alloc(65535);

	const devices = Cap.deviceList()
	const wifiDevice = devices.find(device => {
		const description = device.description.toLowerCase();
		return description.includes('wireless') || description.includes('wi-fi');
	});

	if (!wifiDevice) {
		console.error('No Wi-Fi device found!');
		process.exit(1);
	}

	const wifiInterfaceName = wifiDevice.name;
	const linkType = c.open(wifiInterfaceName, filter, bufSize, buffer);

	c.on('packet', function (nbytes, trunc) {
		const ret = decoders.Ethernet(buffer);

		if (ret.info.type === 2048) {
			const decodedIP = decoders.IPV4(buffer, ret.offset);
			const srcaddr = decodedIP.info.srcaddr;
			const dstaddr = decodedIP.info.dstaddr;

			let packetInfo = {
				length: nbytes,
				srcaddr: srcaddr,
				dstaddr: dstaddr
			};

			if (decodedIP.info.protocol === PROTOCOL.IP.TCP) {
				const decodedTCP = decoders.TCP(buffer, decodedIP.offset);
				packetInfo.protocol = 'TCP';
				packetInfo.srcport = decodedTCP.info.srcport;
				packetInfo.dstport = decodedTCP.info.dstport;
			} else if (decodedIP.info.protocol === PROTOCOL.IP.UDP) {
				const decodedUDP = decoders.UDP(buffer, decodedIP.offset);
				packetInfo.protocol = 'UDP';
				packetInfo.srcport = decodedUDP.info.srcport;
				packetInfo.dstport = decodedUDP.info.dstport;
			}

			packets.push(packetInfo);

			// Limit the storage to the last 100 entries (or any other number)
			if (packets.length > 100) packets.shift();
		}
	});
}

function getPackets() {
	return packets;
}

export { startCapturing, getPackets };
