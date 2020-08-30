import {Log} from "../database";
import BaseController from "./BaseController";

class LogController extends BaseController<Log> {
    constructor() {
        super({model: Log})
    }
}

export default new LogController();
