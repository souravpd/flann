//Controller Actions
module.exports.index = function (request, response) {
    response.render('index', {
        title: "Flann"
    });
};