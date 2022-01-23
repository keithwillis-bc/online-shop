function createUserSession(req, user, action){
    console.log(user);
    req.session.uid = user.id.toString();
    req.session.isAdmin = user.isAdmin;
    req.session.save(action);
}

function clearUserSession(req, user, action){
    req.session.uid = null;
    req.session.save(action);
}

module.exports = {
    createUserSession,
    clearUserSession,
}