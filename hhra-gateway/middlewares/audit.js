const utils = require('./../utils/index');

const AuditHandler = class AuditHandler {
    logger = utils.loggerUtil.getAuditLogger();

    log = async (requestName, objectName, objectID, msg) => {
        await this.logger.info(`[{requestName}{objectName}{objectID}] {msg}`);
    };

    logRequest = async (req, res, next) => {
        //parse request to get some of these values. The current values are temporary and experimental.
        await this.log(req.method, req.url, req.headers, req.body);
        next();
    };
};

const auditHandler = new AuditHandler();

const middleware = {
    auditHandler: auditHandler
};

module.exports = middleware;