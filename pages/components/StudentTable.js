import React, { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import { Table, Input, Select, Button, Space, Switch, List, Card } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import { AppContext } from '../../context/AppContext';

export default function StudentTable({ students, majors }) {
  const { selectedMajor } = useContext(AppContext);
  const [searchText, setSearchText] = useState('');
  const [selected, setSelected] = useState('');
  const [data, setData] = useState(students || []);
  const [usePagination, setUsePagination] = useState(true);
  const [visibleCount, setVisibleCount] = useState(20);

  useEffect(() => {
    if (selectedMajor) setSelected(selectedMajor);
  }, [selectedMajor]);

  useEffect(() => {
    let filtered = students || [];

    if (searchText) {
      filtered = filtered.filter((s) => {
        const full = `${s.firstName} ${s.lastName}`.toLowerCase();
        return full.includes(searchText.toLowerCase());
      });
    }

    if (selected) {
      filtered = filtered.filter((s) => s.major === selected);
    }

    setData(filtered);
  }, [searchText, selected, students]);

  const loadMore = () => {
    setVisibleCount((prev) => prev + 20);
  };

  const columns = [
    {
      title: 'Name',
      key: 'name',
      render: (_, record) => `${record.firstName} ${record.lastName}`,
    },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'University', dataIndex: 'university', key: 'university' },
    {
      title: 'Major',
      key: 'major',
      render: (_, record) => record.major || '-',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Link href={`/students/${record.id}`}>
          <Button type="primary">View Details</Button>
        </Link>
      ),
    },
  ];

  return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        <Input
          placeholder="Search by name"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />

        <Select
          placeholder="Filter by Major"
          allowClear
          style={{ width: 220 }}
          value={selected || undefined}
          onChange={(val) => setSelected(val)}
        >
          {majors.map((major) => (
            <Select.Option key={major.slug} value={major.slug}>
              {major.name}
            </Select.Option>
          ))}
        </Select>

        <Space>
          <span>Use Infinite Scroll</span>
          <Switch
            checked={!usePagination}
            onChange={(val) => setUsePagination(!val)}
          />
        </Space>
      </Space>

      {usePagination && (
        <Table
          columns={columns}
          dataSource={data}
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />
      )}

      {!usePagination && (
        <InfiniteScroll
          dataLength={Math.min(visibleCount, data.length)}
          next={loadMore}
          hasMore={visibleCount < data.length}
          height={600}
          loader={<h4>Loading...</h4>}
        >
          <List
            dataSource={data.slice(0, visibleCount)}
            renderItem={(item) => (
              <Card style={{ marginBottom: 16 }}>
                <List.Item>
                  <List.Item.Meta
                    title={`${item.firstName} ${item.lastName}`}
                    description={`${item.email} • ${item.university}`}
                  />
                  <Link href={`/students/${item.id}`}>
                    <Button type="primary">View Details</Button>
                  </Link>
                </List.Item>
              </Card>
            )}
          />
        </InfiniteScroll>
      )}
    </div>
  );
}
