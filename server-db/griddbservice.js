import * as GridDB from './libs/griddb.cjs';
import { generateRandomID } from './libs/rangen.js';

const { collectionDb, store, conInfo, containerName } = await GridDB.initGridDbTS();

export async function saveData({ playerposition, numberofthrows, gameover }) {
	const id = generateRandomID();

	// Serialize player position to a JSON string (if needed)
	const playerpositionStr = JSON.stringify(playerposition);
	const numberofthrowsStr = String(numberofthrows);
	const gameoverStr = String(gameover);

	// Now you can safely insert them into the database as strings
	const playerState = [parseInt(id), playerpositionStr, numberofthrowsStr, gameoverStr];
	const saveStatus = await GridDB.insert(playerState, collectionDb);
	return saveStatus;
}

export async function getAllData() {
	return await GridDB.queryAll(conInfo, store);
}