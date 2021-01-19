module.exports = function(req, res, next) {
    // 401 Unauthorized
    // 403 Forbidden 
    console.log("req.body---")
    console.log("requesting user in admin", req.user);
    if (req.user.level != 0) return res.status(403).send('Access denied from superadmin.');

    next();
}