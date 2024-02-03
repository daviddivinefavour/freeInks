import { failingResult, passingResult } from '@app/utils/respond';
import permissionRepo from '../repositories/permission.repo';
import winston from 'winston';
import userPermissionRepo from '../repositories/user-permission.repo';
import { v4 } from 'uuid';

const AddUserPermissionService = async ({ userId, permissions }: { userId: string; permissions: string[] }) => {
  const systemPermissions = await permissionRepo.GetPermissionsQuery(permissions);
  if (!systemPermissions || systemPermissions.length === 0) {
    winston.error('Failed to fetch system permissions');
    return failingResult('An error occurred');
  }
  try {
    await Promise.all(
      systemPermissions.map(async permission => {
        await userPermissionRepo.AddUserPermissionQuery({
          id: v4(),
          userId,
          permissionId: permission.dataValues.id,
        });
      })
    );
  } catch (error) {
    console.log(error);
  }
  return passingResult('Successfully added permissions to target user', {});
};

export default { AddUserPermissionService };
