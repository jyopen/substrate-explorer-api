import {Transaction} from "../database";
import BaseController from "./BaseController";

class TransactionController extends BaseController {
    constructor() {
        super({model: Transaction})
    }

}

export default new TransactionController();
