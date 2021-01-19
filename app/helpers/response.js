const response = (res, status_code, message, data) => {
    var response = {
        message: message ? message : 'Excecuted Successfully'
    };
    if (data) {
        response.data = data;
    }
    res.status(status_code).send(response);
};
module.exports = response;