import { SignUpAsClient } from '@app/modules/authentication/controllers/authentication.controllers';
import { use } from '@app/utils/errors';
import { Router } from 'express';

const router = Router();

router.post('/user/register', use(SignUpAsClient));
export default router;
