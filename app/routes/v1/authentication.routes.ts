import authenticationController from '@app/modules/authentication/controllers/authentication.controller';
import { use } from '@app/utils/errors';
import { Router } from 'express';

const router = Router();

router.post('/user/register', use(authenticationController.SignUpAsClient));
export default router;
