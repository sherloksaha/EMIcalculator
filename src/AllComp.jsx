import React, { useEffect, useMemo, useState } from "react";
import { Badge, Button, Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
export const AllComp = () => {
  const [Cost, setCost] = useState(0);
  const [emi, setEmi] = useState(0);
  const [DonwPayment, setDonwPayment] = useState(0);
  const [Interest, setInterest] = useState(0);
  const [ProFee, setProFee] = useState(1);
  const [month, setMonth] = useState(12);

 
    function EMIData(data){
        const loanAmt = Cost - data;
        const rateOfInterest = Interest / 100;
        const numOfYears = month / 12;
    
        const EMI =
          (loanAmt * rateOfInterest * (1 + rateOfInterest) ** numOfYears) /
          ((1 + rateOfInterest) ** numOfYears - 1);
    
        return (Number(EMI / 12).toFixed(0));
    }
 
    function editDownPayment(val){
        setDonwPayment(val);
        const emidata= EMIData(val);
        setEmi(emidata)
    }

useEffect(()=>{
    let c = EMIData(DonwPayment);
    if(isNaN(c)){return setEmi(0)}
    setEmi(c);
},[month])
  return (
    <div>
      <Container
        className="mt-4 p-5"
        style={{
          backgroundColor: "coral",
        }}
      >
        <Form>
        <h3>EMI CalCulator</h3>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>
              <Badge bg="info"> Total Cost</Badge>
            </Form.Label>
            <Form.Control
              type="number"
              value={Cost}
              onChange={(e) => setCost(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
            <Form.Label>
              <Badge bg="info">Interset Rate (in%)</Badge>
            </Form.Label>
            <Form.Control
              type="number"
              value={Interest}
              onChange={(e) => setInterest(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
            <Form.Label>
              <Badge bg="info">Processing Fee (in %)</Badge>
            </Form.Label>
            <Form.Control
              type="number"
              disabled
              value={ProFee}
              onChange={(e) => setProFee(e.target.value)}
            />
          </Form.Group>
          <Form.Label>
            <Badge bg="info">Down Payment</Badge>
          </Form.Label>
          <br />
          <Form.Label>
            <Badge bg="success"> Total Down Payment Rs.{DonwPayment}/-</Badge>{" "}
            <Badge bg="light" text="dark"></Badge>{" "}
          </Form.Label>
          <Form.Range value={DonwPayment} max={Cost} min={0} onChange={(e)=>editDownPayment(e.target.value)}/>
          <p>
            <b>Actual Donw Payment {(Number(DonwPayment) + (Cost - DonwPayment) * (ProFee / 100)).toFixed(0)}</b>
            <Badge bg="warning" text="dark"></Badge>
          </p>

          

          <Form.Label>
            <Badge bg="danger">Total Loan Amount Per Month (EMI) {emi}</Badge>
          </Form.Label>
          <Form.Range  value={emi} max={EMIData(0)} min={EMIData(Cost)}/>

          <Form.Label>
            <Badge bg="danger">
             Tenure {month} Months
            </Badge>
          </Form.Label>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
            }}
          >
            {[12,24,36]?.map((e, i) => {
              return (
                <Button
                  style={{
                    backgroundColor: "wheat",
                    color: "black",
                    border: "none",
                    borderRadius: "5px",
                  }}
                  onClick={()=>setMonth(e)}
                  variant="primary"
                >
                  {e}
                </Button>
              );
            })}
          </div>
        </Form>
      </Container>
    </div>
  );
};
