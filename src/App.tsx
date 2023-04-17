import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { AppRoutes } from "./router/AppRouter";
import { Toaster } from "sonner";
import { AuthProvider } from "./features/authentication/components/AuthProvider";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Toaster richColors closeButton position="top-right" expand={false} />
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
