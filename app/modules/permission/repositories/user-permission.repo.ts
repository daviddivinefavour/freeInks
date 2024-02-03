import UserPermission from '../models/user-permission.model';

interface IAddPermissionOption {
  id: string;
  userId: string;
  permissionId: string;
}
const AddUserPermissionQuery = async (TCreateUserPermissionDto: IAddPermissionOption): Promise<UserPermission> => {
  const { id, ...otherCreateDto } = TCreateUserPermissionDto;
  const [userPermission] = await UserPermission.findOrCreate({
    where: { ...TCreateUserPermissionDto },
    defaults: { ...otherCreateDto } as UserPermission,
  });
  return userPermission;
};
export default { AddUserPermissionQuery };
