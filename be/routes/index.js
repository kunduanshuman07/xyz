import Express from 'express';
import authRoutes from './auth.route.js';

const router = Express.Router();

const defaultRoutes = [
    {
        path: '/auth',
        route: authRoutes
    },
]

defaultRoutes.forEach((routes) => {
    router.use(routes.path, routes.route)
})

export default router;