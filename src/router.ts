import Router from 'koa-router'
import responseHandler from './middleware/responseHandler'
import blockController from './controller/BlockController'
import eventController from './controller/EventController'
import transactionController from './controller/TransactionController'
import transferController from './controller/TransferController'
import logController from './controller/LogController'
import accountController from './controller/AccountController'
import validatorController from './controller/ValidatorController'

const router = new Router({prefix: "api"});

router.use(responseHandler);

router.get('/v1/block/:id', blockController.get.bind(blockController));
router.post('/v1/blocks', blockController.list.bind(blockController));
router.get('/v1/event/:id', eventController.get.bind(eventController));
router.post('/v1/events', eventController.list.bind(eventController));
router.get('/v1/transaction/:id', transactionController.get.bind(transactionController));
router.post('/v1/transactions', transactionController.list.bind(transactionController));
router.get('/v1/transfer/:id', transferController.get.bind(transferController));
router.post('/v1/transfers', transferController.list.bind(transferController));
router.get('/v1/log/:id', logController.get.bind(logController));
router.post('/v1/logs', logController.list.bind(logController));
router.get('/v1/account/:id', accountController.get.bind(accountController));
router.post('/v1/accounts', accountController.list.bind(accountController));
router.get('/v1/validator/:id', validatorController.get.bind(validatorController));
router.post('/v1/validators', validatorController.list.bind(validatorController));
export default router;
