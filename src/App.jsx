import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LoginForm } from "./components/login-form";
import Dashboard from "./app/dashboard/page"; // Adjust the path if needed
import StepperForm from "@/components/StepperForm";
import TestComponent from "@/components/TestComponent";
function App() {

  return (
    <>
    <Router>
          <Routes> 
            <Route path="/" element={<LoginForm />} />
            <Route path="/dashboard" element={<Dashboard />}>
                 <Route path="construction_permit" element={<StepperForm /> }/>
                 <Route path="demolition_permit" element={<TestComponent /> }/>
            </Route>
          </Routes>
    </Router>
    </>
  )
}

export default App
