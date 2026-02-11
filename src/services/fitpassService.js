const { pool } = require('../config/database');
const generateFitpassId = require('../utils/generateFitpassId');

const fitpassService = {
  getAllPlans: async () => {
    const result = await pool.query('SELECT * FROM fitpass_plans ORDER BY created_at DESC');
    return result.rows;
  },

  getPlanById: async (id) => {
    const result = await pool.query('SELECT * FROM fitpass_plans WHERE id = $1', [id]);
    return result.rows[0];
  },

  createPlan: async (data) => {
    const fitpassId = await generateFitpassId();
    
    const query = `
      INSERT INTO fitpass_plans (
        fitpass_id, plan_name, plan_category, entry, description,
        validity_days, no_expiry, auto_renew,
        max_credits_per_day, max_classes_per_day, online_classes_allowed, offline_classes_allowed,
        credits_included, plan_price, original_price, discount_percent,
        status, visible_to_users, featured_plan
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19)
      RETURNING *
    `;
    
    const values = [
      fitpassId,
      data.plan_name,
      data.plan_category || null,
      data.entry || null,
      data.description || null,
      data.validity_days || 30,
      data.no_expiry || false,
      data.auto_renew || false,
      data.max_credits_per_day || 5,
      data.max_classes_per_day || 2,
      data.online_classes_allowed !== undefined ? data.online_classes_allowed : true,
      data.offline_classes_allowed !== undefined ? data.offline_classes_allowed : true,
      data.credits_included || 0,
      data.plan_price || 0,
      data.original_price || null,
      data.discount_percent || null,
      data.status || 'draft',
      data.visible_to_users !== undefined ? data.visible_to_users : true,
      data.featured_plan || false
    ];
    
    const result = await pool.query(query, values);
    return result.rows[0];
  },

  updatePlan: async (id, data) => {
    const fields = [];
    const values = [];
    let paramCount = 1;

    for (const [key, value] of Object.entries(data)) {
      fields.push(`${key} = $${paramCount}`);
      values.push(value);
      paramCount++;
    }

    if (fields.length === 0) return null;

    values.push(id);
    const query = `
      UPDATE fitpass_plans 
      SET ${fields.join(', ')}, updated_at = CURRENT_TIMESTAMP
      WHERE id = $${paramCount}
      RETURNING *
    `;

    const result = await pool.query(query, values);
    return result.rows[0];
  },

  deletePlan: async (id) => {
    const result = await pool.query('DELETE FROM fitpass_plans WHERE id = $1 RETURNING id', [id]);
    return result.rowCount > 0;
  },

  updatePlanStatus: async (id, status) => {
    const result = await pool.query(
      'UPDATE fitpass_plans SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *',
      [status, id]
    );
    return result.rows[0];
  }
};

module.exports = fitpassService;