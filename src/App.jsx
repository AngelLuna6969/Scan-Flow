import MyRoutes from './components/routes/MyRoutes';
import ContextProvider from './components/context/ContextProvider';

const App = () => {
  return (
    <ContextProvider>
      <MyRoutes />
    </ContextProvider>

  );
}

export default App;
