import { Op } from 'sequelize';
import Permission from '../models/permission.model';

const GetPermissionsQuery = async (permissionNames: string[]): Promise<Permission[]> =>
  Permission.findAll({
    where: {
      name: {
        [Op.in]: permissionNames,
      },
    },
  });

export default { GetPermissionsQuery };
