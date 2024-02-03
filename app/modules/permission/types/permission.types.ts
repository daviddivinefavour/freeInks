export type TUserPermission = {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
};

export enum EPermissions {
  ADMIN_MANAGE_SYSTEM = 'admin.manage_system',
  AUTHOR_MANAGE_ARTICLES = 'author.manage_articles',
  EDITOR_REVIEW_ARTICLES = 'reader.access_content',
  READER_ACCESS_CONTENT = 'reader.access_content',
  MANAGER_MANAGE_INVENTORY = 'manager.manage_inventory',
  GENERAL_AUTHENTICATE = 'general.authenticate',
  GENERAL_INTERACT = 'general.interact',
}
