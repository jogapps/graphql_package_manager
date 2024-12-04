const {ROLES} = require("../utils/text");
const httpStatus = require("http-status");
const Package = require('../models/package');
const {validateAuth} = require("../middlewares/auth.middleware");
const ApiError = require("../utils/requests/ApiError");

const createPackage = async (data, req) => {
    validateAuth(req);
    const { id: user_id } = req.user;
    return Package.create({...data, user_id });
};

const updatePackage = async (id, updateData, req) => {
    validateAuth(req);
    const { id: user_id, role } = req.user;
    const packageToUpdate = await Package.findById(id);
    if (!packageToUpdate) throw new ApiError(httpStatus.HTTP_STATUS_NOT_FOUND, 'Package not found');
    if (packageToUpdate.user_id !== user_id && role !== ROLES.ADMIN) throw new ApiError(httpStatus.HTTP_STATUS_FORBIDDEN, 'Forbidden');
    return Package.findByIdAndUpdate(id, updateData, { new: true });
};

const deletePackage = async (id, req) => {
    validateAuth(req);
    const { id: userId, role } = req.user;
    const packageToDelete = await Package.findById(id);
    if (!packageToDelete) throw new ApiError(httpStatus.HTTP_STATUS_NOT_FOUND, 'Package not found');
    if (packageToDelete.user_id !== userId && role !== ROLES.ADMIN) throw new ApiError(httpStatus.HTTP_STATUS_FORBIDDEN, 'Forbidden');
    await Package.deleteOne({ _id: id });
    return true;
};

const getPackages = async (filterByExpiration, req) => {
    validateAuth(req);
    const { id: userId, role } = req.user;

    const filter = {
        ...(filterByExpiration && { expirationDate: { $gte: filterByExpiration } }),
        ...(role !== ROLES.ADMIN && { user_id: userId }),
    };

    return Package.find(filter);
};

module.exports = {
    createPackage,
    updatePackage,
    deletePackage,
    getPackages,
};