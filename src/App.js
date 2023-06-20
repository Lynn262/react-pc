import { BrowserRouter,Link,Routes,Route ,unstable_HistoryRouter as HistoryRouter} from "react-router-dom";
import Login from "@/pages/Login";
import "./App.scss"
import AuthComponent from "./components/AuthComponents";
import GeekLayout from "@/pages/Layout";
import Home from "@/pages/Home";
import Publics from "@/pages/Publics";
import Article from "@/pages/Article";
import { history } from "./utils/history";


function App() {
  return (
    <HistoryRouter history={history}>
      <div className="App">
        <Routes>
          {/* 创建路由对应关系 */}
          <Route path="/login" element={<Login/>}></Route>
          {/* layout 需要鉴权 */}
          <Route path="/layout" element={<AuthComponent><GeekLayout/></AuthComponent>}>
            <Route index element={<Home/>}></Route>
            <Route path="/layout/article" element={<Article/>}></Route>
            <Route path="/layout/publics" element={<Publics/>}></Route>
          </Route>
        </Routes>
      </div>
    </HistoryRouter>
    
  );
}

export default App;
