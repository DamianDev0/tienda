import { NotFound } from "./pages/not-found";
import { DashboardPage } from "./pages/private/dashboardVisit";
import { DashboardAdmin } from "./pages/private/dashboardAdmin";
import { HomePage } from "./pages/public/home";
import { LoginPage } from "./pages/public/login";
import { RegisterPage } from "./pages/public/register";
import { EditProducts } from "./pages/private/dashboardAdmin/admin.edit";
import { CreateProduct } from "./pages/private/dashboardAdmin/admin.create";
import { AllProducts } from "./pages/private/all-products";


export const routes = {
    public: [
        { path: '/', page: HomePage },
        { path: '/register', page: RegisterPage },
        {path: '/login', page: LoginPage},
        { path: '/not-found', page: NotFound },
    ],
    private: [
        { path: '/dashboard', page: DashboardPage },
        {path: '/dasboard/admin', page:DashboardAdmin },
        {path: '/dasboard/admin/edit', page:EditProducts },
        {path: '/dasboard/admin/create', page:CreateProduct },
        {path: '/dasboard/all/products', page:AllProducts }
        
   
    ]
};
