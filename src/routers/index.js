import { Router } from "express";
// import dateRouter from "./dateRouter.js";
// import e2eRouter from "./e2eRouter.js";
import userRouter from "./userRouter.js";
import appointmentRouter from "./appointmentRouter.js";
import quoteRouter from "./quoteRouter.js";

const router = Router();
router.use(userRouter);
router.use(appointmentRouter);
router.use(quoteRouter);
// router.use(dateRouter);

// if (process.env.NODE_ENV === "test") {
//   router.use(e2eRouter);
// }
export default router;
