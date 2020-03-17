import {Event} from "../database";
import BaseController from "./BaseController";

class EventController extends BaseController {
    constructor() {
        super({model: Event})
    }
}

export default new EventController();
