import {Account} from "../database";
import BaseController from "./BaseController";

class AccountController extends BaseController {
    constructor() {
        super({model: Account})
    }
}

export default new AccountController();
