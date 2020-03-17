import Router from 'koa-router'
import koaBody from 'koa-body'
import responseHandler from './middleware/responseHandler'
import blockController from './controller/BlockController'
import eventController from './controller/EventController'
import transactionController from './controller/TransactionController'
import transferController from './controller/TransferController'
import logController from './controller/LogController'
import accountController from './controller/AccountController'

const router = new Router();
router.use(responseHandler);
router.use(koaBody());

router.get('/block/:id', blockController.get.bind(blockController));
router.post('/blocks', blockController.list.bind(blockController));
router.get('/event/:id', eventController.get.bind(eventController));
router.post('/events', eventController.list.bind(eventController));
router.get('/transaction/:id', transactionController.get.bind(transactionController));
router.post('/transactions', transactionController.list.bind(transactionController));
router.get('/transfer/:id', transferController.get.bind(transferController));
router.post('/transfers', transferController.list.bind(transferController));
router.get('/log/:id', logController.get.bind(logController));
router.post('/logs', logController.list.bind(logController));
router.get('/account/:id', accountController.get.bind(accountController));
router.post('/accounts', accountController.list.bind(accountController));
export default router;
