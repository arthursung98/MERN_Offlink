import React, { Suspense } from 'react';
import { Route, Switch } from "react-router-dom";
import Auth from "../hoc/auth";
// pages for this product
import LandingPage from "./views/LandingPage/LandingPage.js";
import LoginPage from "./views/LoginPage/LoginPage.js";
import RegisterPage from "./views/RegisterPage/RegisterPage.js";
import RegisterPage2 from "./views/RegisterPage/RegisterPage2.js"
import RegisterPage3 from './views/RegisterPage/RegisterPage3';
import NavBar from "./views/NavBar/NavBar";
import Footer from "./views/Footer/Footer";
import MyPage from "./views/MyPage/MyPage";
import LinkMain from "./views/Link/LinkMain";

//null   Anyone Can go inside
//true   only logged in user can go inside
//false  logged in user can't go inside

function App() {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <NavBar />
      <div style={{ paddingTop: '69px', minHeight: '50vh' }}>
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, null)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <Route exact path="/register2" component={Auth(RegisterPage2, false)} />
          <Route exact path="/register3" component={Auth(RegisterPage3, false)} />
          <Route exact path="/mypage" component={Auth(MyPage, true)}/>
          <Route exact path="/link" component={LinkMain} />
        </Switch>
      </div>
      <Footer />
    </Suspense>
  );
}

export default App;