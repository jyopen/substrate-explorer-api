import {Event} from "../database";
import BaseController from "./BaseController";

class EventController extends BaseController<Event> {
    constructor() {
        super({model: Event})
    }
}

export default new EventController();
