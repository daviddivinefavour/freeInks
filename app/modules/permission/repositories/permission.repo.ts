import Permission from '../models/permission.model';

export const GetPermissionsQuery = async (userId: string): Promise<Permission[]> => Permission.findAll();
