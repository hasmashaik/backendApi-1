const { pool } = require('../config/database');

const generateFitpassId = async () => {
  const result = await pool.query('SELECT COUNT(*) FROM fitpass_plans');
  const count = parseInt(result.rows[0].count) + 1;
  return `FP-${count.toString().padStart(3, '0')}`;
};

module.exports = generateFitpassId;