import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { AppRoutes } from "./router/AppRouter";
import { Toaster } from "sonner";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Toaster richColors closeButton position="top-right" expand={false} />
        <AppRoutes />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
