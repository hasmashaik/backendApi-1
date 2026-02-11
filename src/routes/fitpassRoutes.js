const express = require('express');
const router = express.Router();
const fitpassController = require('../controllers/fitpassController');

router.get('/', fitpassController.getAllPlans);
router.get('/:id', fitpassController.getPlanById);
router.post('/', fitpassController.createPlan);
router.put('/:id', fitpassController.updatePlan);
router.delete('/:id', fitpassController.deletePlan);
router.patch('/:id/status', fitpassController.updatePlanStatus);

module.exports = router;