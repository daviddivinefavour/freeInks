'use strict';

const { Op } = require('sequelize');

const permissions = [
  {
    name: 'admin.manage_system',
    description: 'Manage overall system settings, user management, and access to all content.',
  },
  {
    name: 'author.manage_articles',
    description: 'Create and manage own articles, access collaboration tools.',
  },
  {
    name: 'editor.review_articles',
    description: 'Review and approve articles, access editorial workflow and version control.',
  },
  {
    name: 'reader.access_content',
    description: 'Access and explore the book inventory, read published articles, leave comments and reviews.',
  },
  {
    name: 'manager.manage_inventory',
    description: 'Manage book inventory, view sales analytics, collaborate with authors.',
  },
  {
    name: 'general.authenticate',
    description: 'Secure authentication for all users.',
  },
  {
    name: 'general.interact',
    description: 'Interaction permissions, e.g., commenting, reviewing, and collaborating.',
  },
];

/** @type {import('sequelize-cli').Migration} */
const uuid = require('uuid').v4;
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      const seedData = permissions.map(permission => ({
        id: uuid(),
        name: permission.name,
        description: permission.description,
        is_active: true,
        created_at: new Date(),
        updated_at: new Date(),
      }));
      await queryInterface.bulkInsert('permissions', seedData, {});
    } catch (error) {
      console.log(`Some error occurred seeding permissions\n ${error}`);
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('permissions', null, {
      name: {
        [Op.in]: permissions.map(permission => permission.name),
      },
    });
  },
};
