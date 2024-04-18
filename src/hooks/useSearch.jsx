import { createContext, useState, useContext, useEffect } from 'react';
import { message } from 'antd';

import PropTypes from 'prop-types';


// Assuming initData is imported or defined here
const initData = [
    {
        key: '1',
        email: 'example1@example.com',
        password: 'password1',
        fullname: 'έλτον Τζόν',
    },
    {
        key: '2',
        email: 'example2@example.com',
        password: 'password2',
        fullname: 'Jane Smith',
    },
    // Add more data here
];

const SearchContext = createContext();

export const useSearch = () => useContext(SearchContext);

export const SearchProvider = ({ children }) => {
    const [searchText, setSearchText] = useState('');
    const [data, setData] = useState(initData);
    const [filteredData, setFilteredData] = useState(initData);

    const [editingEntry, setEditingEntry] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => setIsModalVisible(true);

    const showEditModal = (record) => {
        setEditingEntry(record);
        setIsModalVisible(true);
    };
    const handleCancel = () => {
        setIsModalVisible(false);
        setEditingEntry(null); // Reset editing entry
    };

    const handleAddOrUpdate = (newEntry) => {
        if (editingEntry) {
            // Update logic
            setData(prevData => prevData.map(item => item.key === editingEntry.key ? { ...item, ...newEntry } : item));
            message.success('Entry updated successfully!');
        } else {
            // Add logic remains the same
            const newData = { key: `new_${Date.now()}`, ...newEntry };
            setData(prevData => [newData, ...prevData]);
            message.success('New entry added successfully!');
        }
        setIsModalVisible(false);
        setEditingEntry(null); // Reset editing entry
    };


    useEffect(() => {
        const filtered = data.filter(entry =>
            entry.fullname.toLowerCase().includes(searchText.toLowerCase())
        );
        setFilteredData(filtered);
    }, [searchText, data]);

    return (
        <SearchContext.Provider value={{ searchText, setSearchText, filteredData, showModal, showEditModal, isModalVisible, handleAddOrUpdate, editingEntry, handleCancel }}>
            {children}
        </SearchContext.Provider>
    );
};

SearchProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]).isRequired
};