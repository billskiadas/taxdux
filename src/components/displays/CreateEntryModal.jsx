import { useEffect } from 'react';
import { Modal, Form, Input, Button } from 'antd';

const CreateEntryModal = ({ isVisible, onAdd, initialValues, onCancel }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(initialValues || {
      email: '',
      password: '',
      fullname: '',
    });
  }, [initialValues, form]);

  const handleAdd = (values) => {
    onAdd(values); // This now serves for both adding and updating
    form.resetFields();
  };

  return (
    <Modal
      title={initialValues ? "Edit Entry" : "Create Entry"}
      open={isVisible}
      footer={null}
      onCancel={onCancel}
      destroyOnClose
    >
      <br />
      <Form
        form={form}
        layout="vertical"
        onFinish={handleAdd}
      >
        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, type: "email", message: 'Please input the email!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: 'Please input the password!' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="first_name"
          label="First name"
          rules={[{ required: true, message: 'Please input the first name!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
            name="last_name"
            label="Last name"
            rules={[{ required: true, message: 'Please input the last name!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button key="submit" type="primary" htmlType="submit">
            Save
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateEntryModal;
