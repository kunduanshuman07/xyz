import Express from 'express';
import authRoutes from './auth.route.js';
import expenseRoutes from './expense.route.js';
import taskboardRoutes from "./taskboard.route.js"
import taskboardoverviewRoutes from "./taskboardoverview.route.js"
const router = Express.Router();

const defaultRoutes = [
    {
        path: '/auth',
        route: authRoutes
    },
    {
        path: '/expense',
        route: expenseRoutes
    },
    {
        path: '/taskboard',
        route: taskboardRoutes
    },
    {
        path: '/taskboard-overview',
        route: taskboardoverviewRoutes
    }
]

defaultRoutes.forEach((routes) => {
    router.use(routes.path, routes.route)
})

export default router;