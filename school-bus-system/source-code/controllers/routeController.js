const routeModel = require('../models/routeModel');

const createRoute = async (req, res) => {
  try {
    const route = await routeModel.createRoute(req.body);
    res.status(201).json(route);
  } catch (error) {
    console.error('Error creating route:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getAllRoutes = async (req, res) => {
  try {
    const routes = await routeModel.getAllRoutes();
    res.json(routes);
  } catch (error) {
    console.error('Error fetching routes:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getRouteById = async (req, res) => {
  try {
    const route = await routeModel.getRouteById(req.params.id);
    if (route) {
      res.json(route);
    } else {
      res.status(404).json({ error: 'Route not found' });
    }
  } catch (error) {
    console.error('Error fetching route by ID:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateRoute = async (req, res) => {
  try {
    const route = await routeModel.updateRoute(req.params.id, req.body);
    if (route) {
      res.json(route);
    } else {
      res.status(404).json({ error: 'Route not found' });
    }
  } catch (error) {
    console.error('Error updating route:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteRoute = async (req, res) => {
  try {
    const route = await routeModel.deleteRoute(req.params.id);
    if (route) {
      res.json({ message: 'Route deleted successfully' });
    } else {
      res.status(404).json({ error: 'Route not found' });
    }
  } catch (error) {
    console.error('Error deleting route:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  createRoute,
  getAllRoutes,
  getRouteById,
  updateRoute,
  deleteRoute,
};
