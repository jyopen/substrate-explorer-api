import {fetchDataTask, fetchSingleBlockData} from "./fetchData";
import {saveDataTask, saveSingleBlockData} from "./saveData";


export async function start() {
    exec()
    // insertSingleBlock(6)
}

async function exec() {
    fetchDataTask();
    saveDataTask()
}

async function insertSingleBlock(number: number) {
    await fetchSingleBlockData(number);
    saveSingleBlockData(number);
}





