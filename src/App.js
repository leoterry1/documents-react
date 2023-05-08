import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Navigation from './components/navigation';
import Documents from './components/documents';
import DocumentForm from './components/documentForm.js';
import 'bootstrap/dist/css/bootstrap.css';
import SearchForm from './components/searchForm';
import AssociateUsersForm from './components/associateUsersForm';


function App() {
  return (
    <div className='container'>
      <BrowserRouter>
        <Navigation/>
        <Routes>
            <Route path='/' element={App}/>
            <Route path="/documents" element={<Documents />}/>
            <Route path='/documents/new' element={<DocumentForm/>}/>
            <Route path='/documents/:id/edit' element={<DocumentForm/>}/>
            <Route path='/documents/:id' element={<DocumentForm/>}/>
            <Route path='/documents/search' element={<SearchForm/>}/>
            <Route path='/documents/:id/asocciate-users' element={<AssociateUsersForm/>}/>
      </Routes>
      </BrowserRouter>
    </div>

  );
}

export default App;
