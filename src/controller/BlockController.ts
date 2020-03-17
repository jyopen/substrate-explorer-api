import {Block} from "../database";
import BaseController from "./BaseController";

class BlockController extends BaseController {
    constructor() {
        super({model: Block})
    }
}

export default new BlockController();
