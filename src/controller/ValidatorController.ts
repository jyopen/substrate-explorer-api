import {Validator} from "../database";
import BaseController from "./BaseController";

class ValidatorController extends BaseController<Validator> {
    constructor() {
        super({model: Validator})
    }
}

export default new ValidatorController();
