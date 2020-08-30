import {Transaction} from "../database";
import BaseController from "./BaseController";

class TransactionController extends BaseController<Transaction> {
    constructor() {
        super({model: Transaction})
    }

}

export default new TransactionController();
