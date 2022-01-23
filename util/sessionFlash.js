async function flashDataToSession(req, data, action) {
    console.log(data);
  req.session.flashedData = data;
  await req.session.save(action);
}

function getSessionData(req) {
  const sessionData = req.session.flashedData;
  req.session.flashedData = null;
  return sessionData;
}

module.exports = {
  flashDataToSession,
  getSessionData,
};
