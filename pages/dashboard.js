import { useEffect, useState, useContext } from "react";
import { Card, Avatar, Row, Col, Skeleton, List} from "antd";
import { AppContext } from './context/AppContext';
export async function getStaticPropsMajors() {
  const res = await fetch("https://dummyjson.com/products/categories?limit=10");
  const json = await res.json();
  return json.map((c) => c.name);
}

export async function getServerSideProps() {

  const res = await fetch("https://dummyjson.com/users");
  const json = await res.json();

  const majors = await getStaticPropsMajors();

  return {
    props: {
      totalStudents: json.total,
      majors,
    },
  };
}

export default function Dashboard({ totalStudents, majors }) {
  const [randomStudent, setRandomStudent] = useState(null);
  const [loadingStudent, setLoadingStudent] = useState(true);
  const [selected, setSelected] = useState('');
  const { selectedMajor } = useContext(AppContext);

  useEffect(() => {
    if (selectedMajor) setSelected(selectedMajor);
  }, [selectedMajor]);

  useEffect(() => {
    async function fetchRandom() {
      try {
        const randomId = Math.floor(Math.random() * 30) + 1;
        const res = await fetch(`https://dummyjson.com/users/${randomId}`);
        const json = await res.json();

        setRandomStudent(json);
      } catch (err) {
        console.error("Error loading random student");
      } finally {
        setLoadingStudent(false);
      }
    }

    fetchRandom();
  }, []);

  return (
    <div style={{ padding: 24 }}>
      <h1>Dashboard</h1>

      <Row gutter={[16, 16]}>
        <Col span={24} md={8}>
          <Card title="Total Students" bordered>
            <h2 style={{ fontSize: 28 }}>{totalStudents}</h2>
          </Card>
        </Col>

        <Col span={24} md={8}>
          <Card title="Majors">
            <List
              dataSource={majors}
              renderItem={(major) => (
                <List.Item
                  style={{
                    backgroundColor: selected === major ? '#e6f7ff' : 'transparent',
                    cursor: 'pointer',
                  }}
                  onClick={() => setSelected(major)}
                >
                  {major}
                </List.Item>
              )}
            />

          </Card>
        </Col>

        <Col span={24} md={8}>
          <Card title="Random Student of the Day">
            {loadingStudent ? (
              <Skeleton active avatar paragraph={{ rows: 3 }} />
            ) : (
              randomStudent && (
                <Card.Meta
                  avatar={<Avatar src={randomStudent.image} />}
                  title={`${randomStudent.firstName} ${randomStudent.lastName}`}
                  description={randomStudent.email}
                />
              )
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
}
