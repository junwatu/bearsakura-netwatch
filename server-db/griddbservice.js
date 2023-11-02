import * as GridDB from './libs/griddb.cjs';
import { generateRandomID } from './libs/rangen.js';

/**
packet = {
		"length": 66,
		"srcaddr": "20.198.210.174",
		"dstaddr": "192.168.0.102",
		"protocol": "TCP",
		"srcport": 443,
		"dstport": 1693
	},
 */

const { collectionDb, store, conInfo, containerName } = await GridDB.initGridDbTS();

export async function saveData({ length, scraddr, dstaddr, protocol, srcport, dstport }) {
	const id = generateRandomID();

	// packet information
	const lengthInt = parseInt(length);
	const scraddrStr = String(scraddr);
	const dstaddrStr = String(dstaddr);
	const protocolStr = String(protocol);
	const srcportInt = parseInt(srcport);
	const dstportInt = parseInt(dstport);

	// Now you can safely insert them into the database as strings
	const packetInfo = [parseInt(id), lengthInt, scraddrStr, dstaddrStr, protocolStr, srcportInt, dstportInt];
	const saveStatus = await GridDB.insert(packetInfo, collectionDb);
	return saveStatus;
}

export async function getAllData() {
	return await GridDB.queryAll(conInfo, store);
}