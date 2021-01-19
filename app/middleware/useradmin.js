module.exports = function(req, res, next) {
    // 401 Unauthorized
    // 403 Forbidden 
    console.log("req.body---")
    console.log("requesting user in user", req.user);
    if (req.user.roleId != 2) return res.status(403).send('Access denied from super admin.');

    next();
}