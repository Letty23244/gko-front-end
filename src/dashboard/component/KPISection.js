import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { UserCheck, Users, AlertTriangle, FileText, ClipboardList, BarChart2 } from 'lucide-react';

const KPICard = ({ title, value, Icon }) => (
  <Card className="text-center shadow-sm mb-4">
    <Card.Body>
      <Icon size={32} className="mb-2 text-primary" />
      <Card.Title>{title}</Card.Title>
      <Card.Text className="fs-4 fw-bold">{value}</Card.Text>
    </Card.Body>
  </Card>
);

const KPISection = () => {
  return (
    <div className="mt-4">
      <Row xs={1} sm={2} md={3} lg={3} className="g-4">
        <Col>
          <KPICard title="Total Guards" value="48" Icon={UserCheck} />
        </Col>
        <Col>
          <KPICard title="Active Clients" value="19" Icon={Users} />
        </Col>
        <Col>
          <KPICard title="Incidents Reported" value="7" Icon={AlertTriangle} />
        </Col>
        <Col>
          <KPICard title="Pending Invoices" value="5" Icon={FileText} />
        </Col>
        <Col>
          <KPICard title="Service Requests" value="12" Icon={ClipboardList} />
        </Col>
        <Col>
          <KPICard title="Revenue Collected" value="$34,500" Icon={BarChart2} />
        </Col>
      </Row>
    </div>
  );
};

export default KPISection;
