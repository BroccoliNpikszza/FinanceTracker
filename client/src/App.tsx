import Layout from "./app/dashboard/layout"
import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Account from "./pages/Account"
import {LoginForm} from "./pages/Login"
import {SignupForm} from "./pages/Signup"
import { Transaction } from "./pages/Transactions"

export default function App() {
  return (
    <div>
      <main className="main-content">
        <Routes>
          <Route path="/"element={<Layout><Home/></Layout>}/>
          <Route path="/account"element={<Layout><Account/></Layout>}/>
          <Route path="/transaction"element={<Layout><Transaction/></Layout>}/>
        <Route path="/login" element={<LoginForm/>} />
        <Route path="/signup" element={<SignupForm/>} />
        </Routes>
      
      </main>
    </div>
  )
}
