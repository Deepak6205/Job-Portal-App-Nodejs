import express from 'express';
import { loginController, registerController } from '../controllers/authController.js';
import rateLimit from 'express-rate-limit';

//ip limiter

const limiter = rateLimit({
	windowMs: 240 * 60 * 1000, // 15 minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: true, // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	// store: ... , // Redis, Memcached, etc. See below.
})


//router object
const router = express.Router();

//routes

//REGISTER || POST
router.post('/register',limiter,registerController)


// LOGIN || POST
router.post('/login',limiter,loginController)

//export
export default router;