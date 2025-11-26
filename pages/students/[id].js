import { useRouter } from "next/router";
import { useState } from "react";
import { Skeleton, Card, Button, Modal, Form, Input, message } from "antd";
import StudentDetailCard from "../components/StudentsDetailCard";

export default function StudentDetailPage({ student }) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  if (router.isFallback) return <Skeleton active />;

  if (!student) return <p>Student not found</p>;

  const openEdit = () => setIsModalOpen(true);
  const closeEdit = () => setIsModalOpen(false);

  const onFinish = (values) => {
    message.success("Student updated ");
    console.log("Updated values:", values);
    closeEdit();
  };

  const onDelete = () => {
    message.success("Student deleted");
    router.push("/students");
  };

  return (
    <div style={{ maxWidth: 700, margin: "0 auto" }}>
      

      <StudentDetailCard student={student} />
      <Modal title="Edit Student" open={isModalOpen} onCancel={closeEdit} footer={null}>
        <Form
          layout="vertical"
          initialValues={{
            firstName: student.firstName,
            lastName: student.lastName,
            email: student.email,
            address: student.address?.address,
            phone: student.phone,
            university: student.university,
            company: student.company?.name,
            age: student.age,
            department: student.company?.department,
          }}
          onFinish={onFinish}
        >
          <Form.Item name="firstName" label="First Name">
            <Input />
          </Form.Item>

          <Form.Item name="lastName" label="Last Name">
            <Input />
          </Form.Item>

          <Form.Item name="email" label="Email">
            <Input />
          </Form.Item>

           <Form.Item name="age" label="Age">
            <Input />
          </Form.Item>

            <Form.Item name="address" label="Address">
            <Input />
          </Form.Item>

           <Form.Item name="company" label="Company">
            <Input />
          </Form.Item>

            <Form.Item name="department" label="Department">
            <Input />
          </Form.Item>

            <Form.Item name="phone" label="Phone">
            <Input />
          </Form.Item>

            <Form.Item name="university" label="University">
            <Input />
          </Form.Item>

           

           

          <Button type="primary" htmlType="submit">Save</Button>
        </Form>
      </Modal>

      <Card style={{ marginBottom: 16 }}>
        <Button type="primary" onClick={openEdit} style={{ marginRight: 8 }}>
          Edit Student
        </Button>

        <Button danger onClick={onDelete}>
          Delete Student
        </Button>

        <Button onClick={() => router.back()} style={{ marginRight: 8 }}>
          Back
        </Button>
      </Card>
    </div>
  );
}


export async function getStaticPaths() {
  const res = await fetch("https://dummyjson.com/users");
  const json = await res.json();

  const paths = json.users.map((u) => ({
    params: { id: u.id.toString() },
  }));

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  try {
    const res = await fetch(`https://dummyjson.com/users/${params.id}`);
    const student = await res.json();

    if (!student || student.message === "User not found") {
      return { notFound: true };
    }

    return {
      props: { student },
      revalidate: 60,
    };
  } catch (err) {
    return { notFound: true };
  }
}
