import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { AppRoutes } from "./router/AppRouter";
import { AppTheme } from "./theme/AppTheme";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppTheme>
          <AppRoutes />
        </AppTheme>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
