const arrangementDao = require('../dao/arrangementDao');

exports.getArrangementList = async () => {
    const arrangementList = await arrangementDao.getArrangementList();
    return arrangementList;
};

exports.getArrangement = async (whichWeek) => {
    const arrangementInfo = await arrangementDao.getArrangement(whichWeek);
    return arrangementInfo;
};

exports.addArrangement = async (userClass, course, time, whichCourse, classroom, admin) => {
    const result = await arrangementDao.addArrangement(userClass, course, time, whichCourse, classroom, admin);
    return result;
};

exports.updateArrangement = async (arrangementId, userClass, course, time, whichCourse, classroom, admin) => {
    const result = await arrangementDao.updateArrangement(arrangementId, userClass, course, time, whichCourse, classroom, admin);
    return result;
};

exports.deleteArrangement = async (arrangementId) => {
    const result = await arrangementDao.deleteArrangement(arrangementId);
    return result;
};
