import React from 'react'

const BuildingPermitFormManager = () => {

    const [stages, setStages] = useState({
        planAgreement: null,
        payment: null,
        buildingPermit: null,
      });

      const [loading, setLoading] = useState(true);

      useEffect(() => {
        fetchStages();
      }, []);

      const fetchStages = async () => {
        try {
          const response = await fetch("https://your-api.com/stages");
          const data = await response.json();
    
          if (data && data.length > 0) {
            const planAgreementStage = data.find((stage) => stage.name === "Plan Agreement");
            const paymentStage = data.find((stage) => stage.name === "Payment");
            const buildingPermitStage = data.find((stage) => stage.name === "Building Permit");
    
            setStages({
              planAgreement: planAgreementStage || null,
              payment: paymentStage || null,
              buildingPermit: buildingPermitStage || null,
            });
          }
        } catch (error) {
          console.error("Error fetching stages:", error);
        } finally {
          setLoading(false);
        }
      };

      const handleSubmit = async (stageName) => {
        await fetchStages(); // Refresh the stages after submission
      };
    
      if (loading) return <p>Loading...</p>;
    
      if (!stages.planAgreement) {
        return <PlanAgreementForm onSubmit={() => handleSubmit("Plan Agreement")} />;
      }
    
      if (stages.planAgreement.status === "pending") {
        return <PendingComponent />;
      }
    
      if (stages.planAgreement.status === "approved" && !stages.payment) {
        return <PaymentForm onSubmit={() => handleSubmit("Payment")} />;
      }
    
      if (stages.payment?.status === "pending") {
        return <PendingComponent />;
      }
    
      if (stages.payment?.status === "approved" && !stages.buildingPermit) {
        return <BuildingPermitForm onSubmit={() => handleSubmit("Building Permit")} />;
      }
    
      if (stages.buildingPermit?.status === "pending") {
        return <PendingComponent />;
      }
    
      if (stages.buildingPermit?.status === "approved") {
        return <BuildingPermitCertificate />;
      }
    
      return <p>No matching form found.</p>;
    };

    return (
      <div>BuildingPermitFormManager</div>
    );


export default BuildingPermitFormManager