import * as ImportBlockTask from './ImportBlockTask'
import * as Listeners from './listeners'

ImportBlockTask.start();
async function task() {
    Listeners.listenerNewHeads();
    Listeners.listenerFinalizedHeads();
}

task();
