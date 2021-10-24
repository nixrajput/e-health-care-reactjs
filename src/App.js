import { lazy, Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { SnackbarProvider } from 'notistack';
import store from './redux/store';
import LoadingSpinner from './components/widgets/LoadingSpinner';

const MainPage = lazy(() => import('./components/pages/MainPage'));

//window.store = store;

const fallbackScreen = (
  <div style={{
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    width: "100vw",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    color: "rgb(250, 250, 250)"
  }}>
    <LoadingSpinner />
  </div>
)

function App() {
  return (
    <Provider store={store}>

      <BrowserRouter>
        <Suspense fallback={fallbackScreen}>

          <SnackbarProvider
            maxSnack={3}
            preventDuplicate
            autoHideDuration={6000}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right"
            }}>

            <MainPage />

          </SnackbarProvider>

        </Suspense>
      </BrowserRouter>

    </Provider>
  );
}

export default App;
