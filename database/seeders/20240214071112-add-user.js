'use strict';
const uuid = require('uuid').v4;
const bcryptjs = require('bcryptjs');
const { Op } = require('sequelize');

const users = [
  {
    id: '0a23c596-39a2-433d-8319-5cc9896d794e',
    first_name: 'Johnny',
    last_name: 'English',
    email: 'English@example.com',
    phone_number: '09099900999',
    is_email_verified: true,
    verified_at: '2024-02-09T18:39:07.918Z',
    status: 'active',
    profile_image_url:
      'https://fit-tok-dev-storage.fra1.digitaloceanspaces.com/images/a619c257-f893-4fcd-bc22-69dbce5c79a3.jpeg',
    role: 'author',
    created_at: '2024-02-09T18:36:07.918Z',
    updated_at: '2024-02-09T18:36:07.918Z',
    deleted_at: null,
  },
];

const authSeed = users.map(user => ({
  id: uuid(),
  authenticated_id: user.id,
  password: bcryptjs.hashSync('password', bcryptjs.genSaltSync(10)),
  authenticated_type: 'client',
  last_seen: new Date(),
  created_at: new Date(),
  updated_at: new Date(),
}));

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

const userPermissions = [];

users.forEach(user => {
  if (user.role === 'author') {
    const authorPermissions = permissions.filter(permission => {
      const splittedPermission = permission.name.split('.');
      return splittedPermission[0] === 'author';
    });
    authorPermissions.map(obj => {
      userPermissions.push({
        id: uuid(),
        user_id: user.id,
        permission_id: obj.id,
        created_at: new Date(),
        updated_at: new Date(),
      });
    });
  } else {
    const clientPermissions = permissions.filter(permission => {
      const splittedPermission = permission.name.split('.');
      return splittedPermission[0] === 'client';
    });
    clientPermissions.map(obj => {
      userPermissions.push({
        id: uuid(),
        user_id: user.id,
        permission_id: obj.id,
        created_at: new Date(),
        updated_at: new Date(),
      });
    });
  }
});
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(async transaction => {
      await queryInterface.bulkInsert('users', users, { transaction });
      await queryInterface.bulkInsert('authentications', authSeed, { transaction });
      await queryInterface.bulkInsert('user_permissions', userPermissions, { transaction });
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(async transaction => {
      await queryInterface.bulkDelete(
        'users',
        null,
        {
          id: {
            [Op.in]: users.map(user => user.id),
          },
        },
        { transaction }
      );
      await queryInterface.bulkDelete(
        'authentications',
        null,
        {
          authenticated_id: {
            [Op.in]: users.map(user => user.id),
          },
        },
        { transaction }
      );
    });
  },
};
