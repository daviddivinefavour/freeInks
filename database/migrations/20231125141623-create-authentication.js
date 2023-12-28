'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('authentications', {
      id: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      authenticatedType: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'authenticated_type',
      },
      authenticatedId: {
        type: Sequelize.UUID,
        field: 'authenticated_id',
      },
      lastSeen: {
        type: Sequelize.DATE,
        field: 'last_seen',
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'created_at',
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'updated_at',
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE,
        field: 'deleted_at',
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('authentications');
  },
};
