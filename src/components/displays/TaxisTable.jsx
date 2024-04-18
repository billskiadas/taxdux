import { useEffect, useState } from 'react';
import { Button, Input, Table, message, Row } from 'antd';
import { EditOutlined, CopyOutlined, PlusOutlined } from '@ant-design/icons';
import { useSearch } from "../../hooks/useSearch.jsx";
import NameAvatar from "./NameAvatar.jsx";
import CreateEntryModal from "./CreateEntryModal.jsx";
import {supabase} from "../../supabase/createSupabaseClient.js";

const TaxisTable = () => {
    const { showEditModal, showModal, isModalVisible, handleCancel } = useSearch();
    const [data, setData] = useState([]);
    const [editData, setEditData] = useState(null);
    const fetchData = async () => {
        const { data: supabaseData, error } = await supabase
            .from('tax_user')
            .select('*');

        if (error) console.error('Error fetching data:', error);
        else setData(supabaseData);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleAddOrUpdate = async (entry) => {
        const { id, ...rest } = entry;
        const method = id ? 'update' : 'insert';
        const changes = id ? rest : entry;

        const { data: supabaseData, error } = await supabase
            .from('tax_user')
            [method](changes)
            .match({ id });

        if (error) {
            message.error('Failed to update data');
            console.error('Error:', error);
        } else {
            setData(prev => prev.map(x => x.id === id ? {...x, ...changes} : x));
            message.success('Entry updated successfully');
        }
        handleCancel();
        fetchData();
    };

    const copyToClipboardAsJson = (data) => {
        const text = JSON.stringify(data, null, 2);
        navigator.clipboard.writeText(text)
            .then(() => message.success('Copied to clipboard!'))
            .catch(err => console.error('Failed to copy:', err));
    };

    const columns = [
        {
            title: '',
            key: 'avatar',
            render: (_, record) => <NameAvatar fullName={`${record.first_name} ${record.last_name}`} />,
        },
        {
            title: 'Name',
            dataIndex: 'fullname',
            key: 'fullname',
            render: (_, record) => <a>{`${record.first_name} ${record.last_name}`}</a>,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Password',
            dataIndex: 'password',
            key: 'password',
            render: (text) => (
                <Input.Password
                    value={text}
                    disabled
                />
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <span>
                    <Button icon={<EditOutlined />} style={{ marginRight: 5 }} onClick={() => {
                        showEditModal(record)
                        setEditData(record)
                    }}/>
                    <Button icon={<CopyOutlined />} style={{ marginRight: 5 }} onClick={() => copyToClipboardAsJson(record)} />
                </span>
            ),
        },
    ];

    return (
        <>
            <Row justify={'end'}>
                <Button type="primary" icon={<PlusOutlined />} onClick={showModal} style={{ marginBottom: 16 }}>
                    Create
                </Button>
                <CreateEntryModal
                    isVisible={isModalVisible}
                    onAdd={handleAddOrUpdate}
                    onCancel={handleCancel}
                    initialValues={editData}
                />
            </Row>
            <Row>
                <Table className={'responsive'} style={{width: '100%'}} dataSource={data} columns={columns} rowKey="id" />
            </Row>
        </>
    );
};

export default TaxisTable;