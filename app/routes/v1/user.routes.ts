import authenticationMiddleware from '@app/middleware/authentication.middleware';
import { EPermissions } from '@app/modules/permission/types/permission.types';
import { GetAuthenticatedUser, GetUser } from '@app/modules/user/controllers/user.controllers';
import { use } from '@app/utils/errors';
import { Router } from 'express';

const router = Router();

router.get(
  '/profile/show/:userId',
  authenticationMiddleware.authorizeClient(EPermissions.GENERAL_AUTHENTICATE),
  use(GetUser)
);
router.get(
  '/profile',
  authenticationMiddleware.authorizeClient(EPermissions.GENERAL_AUTHENTICATE),
  use(GetAuthenticatedUser)
);
export default router;
