import Express from 'express';
import authRoutes from './auth.route.js';
import expenseRoutes from './expense.route.js';

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
]

defaultRoutes.forEach((routes) => {
    router.use(routes.path, routes.route)
})

export default router;