const fitpassService = require('../services/fitpassService');

const fitpassController = {
  getAllPlans: async (req, res) => {
    try {
      const plans = await fitpassService.getAllPlans();
      res.json({ success: true, data: plans });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  },

  getPlanById: async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ success: false, message: 'Invalid ID' });
      }

      const plan = await fitpassService.getPlanById(id);
      if (!plan) {
        return res.status(404).json({ success: false, message: 'Plan not found' });
      }

      res.json({ success: true, data: plan });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  },

  createPlan: async (req, res) => {
    try {
      const plan = await fitpassService.createPlan(req.body);
      res.status(201).json({ success: true, data: plan });
    } catch (error) {
      console.error(error);
      res.status(400).json({ success: false, message: 'Error creating plan' });
    }
  },

  updatePlan: async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ success: false, message: 'Invalid ID' });
      }

      const plan = await fitpassService.updatePlan(id, req.body);
      if (!plan) {
        return res.status(404).json({ success: false, message: 'Plan not found' });
      }

      res.json({ success: true, data: plan });
    } catch (error) {
      console.error(error);
      res.status(400).json({ success: false, message: 'Error updating plan' });
    }
  },

  deletePlan: async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ success: false, message: 'Invalid ID' });
      }

      const deleted = await fitpassService.deletePlan(id);
      if (!deleted) {
        return res.status(404).json({ success: false, message: 'Plan not found' });
      }

      res.json({ success: true, message: 'Plan deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Error deleting plan' });
    }
  },

  updatePlanStatus: async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { status } = req.body;

      if (isNaN(id)) {
        return res.status(400).json({ success: false, message: 'Invalid ID' });
      }

      if (!status || !['active', 'paused', 'draft'].includes(status)) {
        return res.status(400).json({ success: false, message: 'Invalid status' });
      }

      const plan = await fitpassService.updatePlanStatus(id, status);
      if (!plan) {
        return res.status(404).json({ success: false, message: 'Plan not found' });
      }

      res.json({ success: true, data: plan });
    } catch (error) {
      console.error(error);
      res.status(400).json({ success: false, message: 'Error updating status' });
    }
  }
};

module.exports = fitpassController;