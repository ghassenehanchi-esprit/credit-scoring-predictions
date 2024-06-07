import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import App from './App';
import SmallEntreprise from './SmallEntreprise';
import { AuthProvider } from './components/UseAuth';

import { UserProtectedRoute } from './components';
import './index.css';
import Login from './Login';
import Individual from './Individual';
import AdminDashboard from './AdminDashboard';
import AddIndividual from './AddIndividual';
import {AdminProtectedRoute} from './components';
import Interfacefront from './Interfacefront';
import ApplyForLoan from './ApplyForLoan'
import SetNewPassword from './SetNewPassword';
import AddSmall from './AddSmall';
import AddLarge from './AddLarge';


ReactDOM.createRoot(document.getElementById('root')).render(

  <Router>
      <AuthProvider>

    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/SetNewPassword" element={<SetNewPassword />} />

      <Route
          path="/Admin/Individual/Add"
          element={
            <AdminProtectedRoute>
              <AddIndividual />
            </AdminProtectedRoute>
          }
        />
<Route
          path="/Admin/Small/Add"
          element={
            <AdminProtectedRoute>
              <AddSmall />
            </AdminProtectedRoute>
          }
        />
         <Route
          path="/Admin"
          element={
            <AdminProtectedRoute>
              <AdminDashboard />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/Admin/Large/Add"
          element={
            <AdminProtectedRoute>
              <AddLarge />
            </AdminProtectedRoute>
          }
        />
<Route path="/SmallEntreprise/:user_id" element={
  <UserProtectedRoute role="Small">
    <SmallEntreprise />
  </UserProtectedRoute>
} />

<Route path="/Individual/:user_id" element={
  <UserProtectedRoute role="Individual">
    <Individual />
  </UserProtectedRoute>
} />   
 <Route path="/DepositCredit" element={<Interfacefront/>} />
      <Route path="/ApplyForLoan/:user_id" element={<ApplyForLoan/>} />
    </Routes>
    </AuthProvider>

  </Router>

);