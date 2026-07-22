// src/models/User.model.js
const supabase = require('../config/supabase');

class UserModel {
  // Find user by email
  static async findByEmail(email) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();
    if (error && error.code !== 'PGRST116') throw error; // PGRST116 = no rows
    return data;
  }

  // Find user by ID
  static async findById(id) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data;
  }

  // Create a new user
  static async create(email, hashedPassword, role = 'user', credits = 0) {
    const { data, error } = await supabase
      .from('users')
      .insert({ email, password: hashedPassword, role, credits })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  // Update user credits (e.g., after subscription)
  static async updateCredits(id, newCredits) {
    const { data, error } = await supabase
      .from('users')
      .update({ credits: newCredits })
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  // Update user role (admin/user)
  static async updateRole(id, newRole) {
    const { data, error } = await supabase
      .from('users')
      .update({ role: newRole })
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  // Delete user (if needed)
  static async delete(id) {
    const { error } = await supabase
      .from('users')
      .delete()
      .eq('id', id);
    if (error) throw error;
    return true;
  }
}

module.exports = UserModel;
