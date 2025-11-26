import React from "react";
import { Card, Avatar, Descriptions } from "antd";

export default function StudentDetailCard({ student }) {
  if (!student) return null;

  return (
    <Card>
      <Card.Meta
        avatar={<Avatar size={96} src={student.image} />}
        title={`${student.firstName} ${student.lastName}`}
        description={student.email}
      />

      <Descriptions column={1} style={{ marginTop: 16 }}>
        <Descriptions.Item label="Phone">{student.phone}</Descriptions.Item>
        <Descriptions.Item label="Age">{student.age}</Descriptions.Item>

        <Descriptions.Item label="Address">
          {student.address?.address}, {student.address?.city}
        </Descriptions.Item>

        <Descriptions.Item label="Company">{student.company?.name}</Descriptions.Item>
        <Descriptions.Item label="Department">{student.company?.department}</Descriptions.Item>
        <Descriptions.Item label="University">{student.university}</Descriptions.Item>
      </Descriptions>
    </Card>
  );
}
