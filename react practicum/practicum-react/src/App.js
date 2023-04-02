import './App.css';
import "primereact/resources/themes/lara-light-indigo/theme.css";     
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";   
import { BrowserRouter} from 'react-router-dom'
import Workspace from './Workspace';
import Header from './Header';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
  <>
   <BrowserRouter>
   <Header></Header>
   <Workspace></Workspace>
   </BrowserRouter>
  </>
  );
}

export default App;
