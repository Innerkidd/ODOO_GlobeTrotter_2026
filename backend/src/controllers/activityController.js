const activityService = require('../services/activityService');

const getActivities = async (req, res, next) => {
  try {
    const activities = await activityService.getActivities(req.user.id, req.query.tripStopId);

    res.status(200).json({
      success: true,
      data: activities,
    });
  } catch (error) {
    next(error);
  }
};

const getActivityById = async (req, res, next) => {
  try {
    const activity = await activityService.getActivityById(req.user.id, req.params.id);

    res.status(200).json({
      success: true,
      data: activity,
    });
  } catch (error) {
    next(error);
  }
};

const addActivity = async (req, res, next) => {
  try {
    const activity = await activityService.addActivity(req.user.id, {
      tripStopId: req.body.tripStopId,
      name: req.body.name,
      description: req.body.description,
      category: req.body.type || req.body.category,
      cost: req.body.estimatedCost || req.body.cost,
      duration: req.body.duration,
      startTime: req.body.startTime,
      endTime: req.body.endTime,
    });

    res.status(201).json({
      success: true,
      message: 'Activity added successfully',
      data: activity,
    });
  } catch (error) {
    next(error);
  }
};

const updateActivity = async (req, res, next) => {
  try {
    const activity = await activityService.updateActivity(req.user.id, req.params.id, {
      name: req.body.name,
      description: req.body.description,
      category: req.body.type || req.body.category,
      cost: req.body.estimatedCost || req.body.cost,
      duration: req.body.duration,
      startTime: req.body.startTime,
      endTime: req.body.endTime,
    });

    res.status(200).json({
      success: true,
      message: 'Activity updated successfully',
      data: activity,
    });
  } catch (error) {
    next(error);
  }
};

const deleteActivity = async (req, res, next) => {
  try {
    const result = await activityService.deleteActivity(req.user.id, req.params.id);

    res.status(200).json({
      success: true,
      message: 'Activity deleted successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getActivities,
  getActivityById,
  addActivity,
  updateActivity,
  deleteActivity,
};