import { RegisterUser } from '@app/modules/authentication/controllers/authentication.controllers';
import { use } from '@app/utils/errors';
import { Router } from 'express';

const router = Router();

router.post('/user/register', use(RegisterUser));
export default router;
