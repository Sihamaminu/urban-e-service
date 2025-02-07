import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LoginForm } from "./components/login-form";
import Dashboard from "./app/dashboard/page"; // Adjust the path if needed
import StepperForm from "@/components/StepperForm";
import TestComponent from "@/components/TestComponent";
import MyRequests from "@/components/MyRequests";
import RegisterForm from "@/components/RegisterForm";
function App() {

  return (
    <>
    <Router>
          <Routes> 
            <Route path="/" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/dashboard" element={<Dashboard />}>
                 <Route path="building_permit" element={<StepperForm /> }/>
                 <Route path="demolition_permit" element={<TestComponent /> }/>
                 <Route path="my_requests" element={<MyRequests /> }/>
            </Route>
          </Routes>
    </Router>
    </>
  )
}

export default App
