import './App.css';
import Spinner from './components/Spinner';
import Auth from './components/Auth';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import { HomePage } from './pages';
import { Context } from './context/main';
import { links } from './_config';
import { useEffect } from 'react';

import { app } from './_config';
import { useDispatch, useSelector } from 'react-redux';
import { actionCheckAuth, actionCheckAuthCode } from './store/auth';
import HeaderContainer from './container/HeaderContainer';
import AlertsContainer from './container/AlertsContainer';

function App() {
  const authState = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();

  const setAuthState = () => {
    dispatch(actionCheckAuth());
    dispatch(actionCheckAuthCode());
  }

   useEffect(() => {
    setAuthState();
  }, []);

  const htmlRender = () => {
    if(authState.IS_LOADING)
      return <div className="main-spinner"><Spinner/></div>;

    if(authState.AUTH){
      return (
        <Context.Provider value={{
          links,
          authToken: authState.AUTH_TOKEN,
          app
        }}>
          <div className="App bg-light">
            <HeaderContainer/>
            <div className="container-fluid main-container">
              <div className="row h-100">
                <div className="col-md-3 py-3">
                  <Sidebar/>
                </div>
                <div className="col-md-9">
                  <div className="content-page py-3">
                    <HomePage/>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer/>
          <AlertsContainer/>
        </Context.Provider>
      )
    }else{
      return (
        <Context.Provider value={{
          links,
          app
        }}>
            <Auth/>
        </Context.Provider>
      )
    }
  }

  return htmlRender();
}

export default App;
