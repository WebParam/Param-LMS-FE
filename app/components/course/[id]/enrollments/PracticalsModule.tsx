// components/PracticalSkillsModules.tsx
import React, { useState, ChangeEvent } from "react";
import { Modal, Button, Form } from "react-bootstrap";

interface Module {
  date: string;
  assessment: string;
  name: string;
  credits: string;
  achievement: string;
}

const PracticalSkillsModules: React.FC = () => {
  const [modules, setModules] = useState<Module[]>([
    {
      date: "2023-01-01",
      assessment: "95%",
      name: "Practical Module 1",
      credits: "10",
      achievement: "A",
    },
    {
      date: "2023-02-01",
      assessment: "88%",
      name: "Practical Module 2",
      credits: "8",
      achievement: "B",
    },
  ]);

  const [show, setShow] = useState(false);
  const [newModule, setNewModule] = useState<Module>({
    date: "",
    assessment: "",
    name: "",
    credits: "",
    achievement: "",
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewModule({ ...newModule, [name]: value });
  };

  const addModule = () => {
    setModules([...modules, newModule]);
    setNewModule({
      date: "",
      assessment: "",
      name: "",
      credits: "",
      achievement: "",
    });
    handleClose();
  };

  return (
    <div className="card m-3 d-flex flex-column justify-content-center align-items-center gap-2 p-4">
      <div className="mb-3 d-flex justify-content-between align-items-center w-100">
        <p className="h5">Practical Skills Modules</p>
        <Button
          variant="primary btn-dark"
          onClick={handleShow}
          className="mb-2"
        >
          Add Module
        </Button>
      </div>
      <table className="rbt-table table table-borderless">
        <thead className="thead-light">
          <tr>
            <th>Date</th>
            <th>% Assessment</th>
            <th>Name of Module</th>
            <th>Credits</th>
            <th>Achievement</th>
          </tr>
        </thead>
        <tbody>
          {modules.map((module, index) => (
            <tr key={index}>
              <td>{module.date}</td>
              <td>{module.assessment}</td>
              <td>{module.name}</td>
              <td>{module.credits}</td>
              <td>{module.achievement}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Practical Skills Module</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formDate">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="text"
                name="date"
                value={newModule.date}
                onChange={handleChange}
                placeholder="Enter date"
              />
            </Form.Group>
            <Form.Group controlId="formAssessment">
              <Form.Label>% Assessment</Form.Label>
              <Form.Control
                type="text"
                name="assessment"
                value={newModule.assessment}
                onChange={handleChange}
                placeholder="Enter assessment"
              />
            </Form.Group>
            <Form.Group controlId="formName">
              <Form.Label>Name of Module</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={newModule.name}
                onChange={handleChange}
                placeholder="Enter name of module"
              />
            </Form.Group>
            <Form.Group controlId="formCredits">
              <Form.Label>Credits</Form.Label>
              <Form.Control
                type="text"
                name="credits"
                value={newModule.credits}
                onChange={handleChange}
                placeholder="Enter credits"
              />
            </Form.Group>
            <Form.Group
              className="d-flex flex-column"
              controlId="formAchievement"
            >
              <Form.Label>Competency</Form.Label>
              <Form.Select
                className="form-inline p-2"
                style={{ height: "40px", opacity: "0.3", borderRadius: "4px" }}
              >
                <option>Competent</option>
                <option>Incompetent</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary btn-dark" onClick={addModule}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PracticalSkillsModules;
