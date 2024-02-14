'use strict';
const uuid = require('uuid').v4;
const { Op } = require('sequelize');

const permissions = [
  {
    id: 'df57fe56-2e5a-4b7a-b0e3-74ec3a3b421a',
    name: 'admin.manage_system',
    description: 'Manage overall system settings, user management, and access to all content.',
  },
  {
    id: 'f01a1f7b-34b3-4baf-88c2-e2d17d2f63e6',
    name: 'author.manage_articles',
    description: 'Create and manage own articles, access collaboration tools.',
  },
  {
    id: 'c0e0c832-d2a2-43e7-a83c-fdbbd7fb5ed2',
    name: 'editor.review_articles',
    description: 'Review and approve articles, access editorial workflow and version control.',
  },
  {
    id: '1eab6e7b-9354-4a88-8373-d417c92c44a2',
    name: 'reader.access_content',
    description: 'Access and explore the book inventory, read published articles, leave comments and reviews.',
  },
  {
    id: 'c108fe9a-6f43-48c5-875f-ef9b5c7f5f4c',
    name: 'manager.manage_inventory',
    description: 'Manage book inventory, view sales analytics, collaborate with authors.',
  },
  {
    id: '0ec4f68a-b731-431d-8431-02ed0a6745bb',
    name: 'general.authenticate',
    description: 'Secure authentication for all users.',
  },
  {
    id: '7cf3f29d-6a4e-4a8c-b826-8ad28c582add',
    name: 'general.interact',
    description: 'Interaction permissions, e.g., commenting, reviewing, and collaborating.',
  },
];

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    const seedData = permissions.map(permission => ({
      id: permission.id,
      name: permission.name,
      description: permission.description,
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
    }));
    await queryInterface.bulkInsert('permissions', seedData, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('permissions', null, {
      id: {
        [Op.in]: permissions.map(permission => permission.id),
      },
    });
  },
};
