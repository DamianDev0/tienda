import { routes } from "./routes";
import { NavBarLayout } from "./components/layouts";

export function Router() {
  const path = window.location.pathname;
  const publicRoute = routes.public.find((route) => route.path === path);
  const privateRoute = routes.private.find((route) => route.path === path);

  if (path === "/login" || path === "/register") {
    const token = localStorage.getItem("token");

    if (token) {
      navigateTo("/dashboard");
      return;
    }
  }

  if (publicRoute) {
    publicRoute.page();
    return;
  }

  if (privateRoute) {
    if (!localStorage.getItem("token")) {
      navigateTo("/login");
      return;
    }
    const { $content, logic } = privateRoute.page();
    NavBarLayout($content, logic);
    return;
  }

  navigateTo("/not-found");
}

export function navigateTo(path) {
  window.history.pushState({}, "", window.location.origin + path);
  Router();
}
