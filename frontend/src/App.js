import {Routes, Route, Navigate} from 'react-router-dom'

import {AdminPanelPage, ForgotPasswordPage, LoginPage, NotFoundPage, UserPage, UserPageManager, AddPasswordPage} from "./pages";
import {HeaderLayots, HeaderLayotsManager } from "./layouts";

function App() {

  return (
      <div >
        <Routes>

          <Route path={'/'}>
            <Route index element={<Navigate to={'/login'}/> }/>
            <Route path={'/login'} element={<LoginPage/>}/>

          </Route>



          <Route element={<HeaderLayots/>}>
            <Route path={"/orders"} element={<UserPage/>}/>
            <Route path={"/adminPanel"} element={<AdminPanelPage/>}/>
          </Route>

          <Route element={<HeaderLayotsManager/>}>
            <Route path={"/manager"} element={<UserPageManager/>}/>
          </Route>


          <Route path={"/forgot/password"} element={<ForgotPasswordPage/>}/>
          <Route path={"/activate"} element={<AddPasswordPage/>}/>

          <Route path={'*'} element={<NotFoundPage/>}/>

        </Routes>
      </div>


  );
}

export default App;