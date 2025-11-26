import React from 'react';
import { Card } from 'antd';
import StudentTable from '../components/StudentTable';


export async function getServerSideProps() {
  const usersRes = await fetch('https://dummyjson.com/users');
  const usersJson = await usersRes.json();

  const categoriesRes = await fetch('https://dummyjson.com/products/categories');
  const categoriesJson = await categoriesRes.json();

  const studentsWithMajor = usersJson.users.map((u) => {
    const randomMajor = categoriesJson[Math.floor(Math.random() * categoriesJson.length)];
    return {
      ...u,
      major: randomMajor.slug, 
    };
  });

  return {
    props: {
      students: studentsWithMajor,  
      majors: categoriesJson,
    },
  };
}



export default function StudentsPage({ students, majors }) {
return (
    <Card title="Students List">
    <StudentTable students={students} majors={majors} />
    </Card>
);
}