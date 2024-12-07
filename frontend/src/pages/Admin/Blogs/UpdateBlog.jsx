import React, {useState} from 'react'
import { Button, Form, Input, Checkbox, Select } from 'antd';

const UpdateBlog = () => {
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState('vertical');
  const onFormLayoutChange = ({ layout }) => {
    setFormLayout(layout);
  };
  const { TextArea } = Input;
  const plainOptions = ['products', 'coats', 'electronics'];
  return (
    <div>
      <h4>Blog Update Panel</h4>
      <Form layout={formLayout} form={form} initialValues={{layout: formLayout}}>
            <Form.Item label="Blog Name">
                <Input placeholder="Blog Name" />
            </Form.Item>
            <Form.Item label="Image Url">
                <Input placeholder="Image Url" />
            </Form.Item>
            <Form.Item label="Subject">
                <Input placeholder="Subject" />
            </Form.Item>
            <Form.Item label="Description">
            <TextArea rows={4} />
            </Form.Item>
            {/* <Form.Item label="Category">
            <Select
      defaultValue="Smartphone"
      style={{
        width: 120,
      }}
      options={[
        {
          value: 'Smartphone',
          label: 'Smartphone',
        },
        {
          value: 'Watches',
          label: 'Watches',
        },
        {
          value: 'Electronics',
          label: 'Electronics',
        },
        {
          value: 'Furnitures',
          label: 'Furnitures',
        },
        {
          value: 'Collections',
          label: 'Collections',
        },
        {
          value: 'Fashion',
          label: 'Fashion',
        },
      ]}
    />
            </Form.Item> */}
            <Form.Item>
                <Button type="primary">Update Blogs</Button>
            </Form.Item>
        </Form>
    </div>
  )
}

export default UpdateBlog