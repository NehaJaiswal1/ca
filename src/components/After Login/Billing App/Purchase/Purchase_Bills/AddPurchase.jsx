import { Box, Text, Flex, Link, Table, Thead, Tbody, Tr, Th, Td, Icon, TableContainer, TableCaption, Heading, Divider, Select, Input, Textarea, Button } from '@chakra-ui/react';
import React from 'react';
import Company_name from '../../Company_name/Company_name';
import Slidebar from '../../Slidebar/Slidebar';
import { useNavigate } from 'react-router-dom';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import {
  postPurchaseAction
} from "../../../../../Redux/Purchase/purchase.action";
import { userDetails } from '../../../../../Redux/config/Commen';


const AddPurchase = () => {
  const [rows, setRows] = useState([{ idNumber: 1 }]);
  const token = localStorage.getItem("token");
  const { firmId } = useSelector((store) => store.FirmRegistration);
  const dispatch = useDispatch();
  const [totalAmount, setCalculateTotalAmount] = useState(0);

  const navigate = useNavigate();
  const Company = {
    name: "Company Name",
  };

  const addRow = () => {
    const newItem = { idNumber: formData.items.length + 1, itemName: '', qty: '', rate: '', amount: '' };
    setRows([...rows, newItem]);

    setFormData({
      ...formData,
      items: [...formData.items, newItem],
    });
  };

  const deleteRow = (rowId) => {
    const updatedItems = formData.items.filter((item) => item.idNumber !== rowId);
    setFormData({
      ...formData,
      items: updatedItems,
    });
    const updatedRawData = rows.filter((item) => item.idNumber !== rowId);
    setRows(updatedRawData);
  };

  const [formData, setFormData] = useState({
    partyName: '',
    phoneNo: '',
    date: '',
    items: [{ idNumber: 1, itemName: '', qty: '', rate: '', totalAmount: '' }],
    firmId: firmId,
    totalAmount: 0
  });

  const calculateTotalAmount = (items) => {
    let total = 0;
    items.forEach((item) => {
      const amount = parseFloat(item.totalAmount) || 0;
      if (!isNaN(amount)) {
        total += amount;
      }
    });
    return total.toFixed(2);
  };


  const handleInputChange = (e, field, rowId) => {
    const { name, value } = e.target;
    if (rowId !== undefined) {
      const updatedItems = [...formData.items];
      const rowIndex = updatedItems.findIndex((item) => item.idNumber === rowId);
      if (rowIndex !== -1) {
        updatedItems[rowIndex][field] = value;

        if (field === 'qty' || field === 'rate') {
          const qty = parseFloat(updatedItems[rowIndex]['qty']) || 0;
          const rate = parseFloat(updatedItems[rowIndex]['rate']) || 0;
          updatedItems[rowIndex]['totalAmount'] = (qty * rate).toFixed(2);
        }

        setFormData({
          ...formData,
          items: updatedItems,
        });
        const totalFinalAmount = calculateTotalAmount(formData.items);
        setCalculateTotalAmount(totalFinalAmount);
        setFormData({
          ...formData,
          totalAmount: totalFinalAmount,
        });
      }
    } else {
      setFormData({
        ...formData,
        [field]: value,
      });
    }
  };

  const handleClick = () => {
    const totalFinalAmount = calculateTotalAmount(formData.items);
    const updatedFormData = {
      ...formData,
      totalAmount: totalFinalAmount,
    };

    dispatch(postPurchaseAction(formData, userDetails?.token, firmId))
    // Clear the form by resetting the formData state
    setFormData({
      partyName: '',
      phoneNo: '',
      billNo: '',
      date: '',
      items: [{ idNumber: 1, itemName: '', qty: '', rate: '', totalAmount: '' }],
      firmId: firmId,
      totalAmount: 0
    });
  }

  return (
    <>
      <Company_name company_name={Company.name} />
      <Flex>
        <Slidebar />
        <Box bg="white" py="4" px="6" minH="80vh" flex="1" boxShadow="md">
          <Flex margin='15px' justifyContent='space-between'
            p='4'
            boxShadow='rgba(149, 157, 165, 0.2) 0px 8px 24px'
          >
            <Heading size='md' color='gray.500'> Add Purchase Item </Heading>
            <Flex>
              <Select
                rightIcon={<ChevronDownIcon />}
                placeholder='Bill No.'
                size='sm'
                onChange={(e) => handleInputChange(e, "billNo")}
              >
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
              </Select>
              <Input
                ml='4'
                width='100%'
                type='date'
                placeholder='Select date'
                size='sm'
                onChange={(e) => handleInputChange(e, "date")}
              />
            </Flex>
          </Flex>

          {/* Mid */}
          <Box margin='15px' mt='4' p='2'
            boxShadow='rgba(149, 157, 165, 0.2) 0px 8px 24px'
          >
            <Flex justifyContent='space-between' mt='1'>
              <Flex justifyContent='center'>
                <Text mr='4' textAlign='left' mt='1' fontWeight='semibold'> Party Name : </Text>
                <Input placeholder='Enter Party Name' size='sm' width='60%' onChange={(e) => { handleInputChange(e, "partyName") }} name="partyName" />
              </Flex>
              <Flex justifyContent='center'>
                <Text mr='4' textAlign='left' mt='1' fontWeight='semibold'> Phone Number : </Text>
                <Input placeholder='Enter Contact Number' size='sm' type='number' width='60%' onChange={(e) => { handleInputChange(e, "phoneNo") }} />
              </Flex>
            </Flex>
            <Divider />
            <Flex justifyContent='space-between' margin='15px'>
              <Heading size='sm'> Add Items</Heading>
              <Button onClick={addRow} colorScheme='teal' size='sm' title='add row'>
                + New Item
              </Button>
            </Flex>
            <Table>
              <Thead>
                <Tr>
                  <Th style={{ border: '1px solid gray' }}>ID</Th>
                  <Th style={{ border: '1px solid gray' }}>Item Name</Th>
                  <Th style={{ border: '1px solid gray' }}>Qty</Th>
                  <Th style={{ border: '1px solid gray' }}>Rate</Th>
                  <Th style={{ border: '1px solid gray' }}>Amount</Th>
                  <Th style={{ border: '1px solid gray' }}></Th>
                </Tr>
              </Thead>
              <Tbody>
                {rows.map((row) =>
                  <Tr key={row.idNumber}>
                    <Td style={{ border: '1px solid gray' }} onChange={(e) => { handleInputChange(e, "phoneNo", row.idNumber) }}>{row.idNumber}</Td>
                    <Td style={{ border: '1px solid gray' }}>
                      <Input variant='unstyled' placeholder='Item Name' onChange={(e) => { handleInputChange(e, "itemName", row.idNumber) }} />
                    </Td>
                    <Td style={{ border: '1px solid gray' }}>
                      <Input variant='unstyled' placeholder='Qty' onChange={(e) => { handleInputChange(e, "qty", row.idNumber) }} />
                    </Td>
                    <Td style={{ border: '1px solid gray' }}>
                      <Input variant='unstyled' placeholder='Enter Rate' onChange={(e) => { handleInputChange(e, "rate", row.idNumber) }} />
                    </Td>
                    <Td style={{ border: '1px solid gray' }}>
                      <Input variant='unstyled' placeholder='Enter Amount' value={formData.items.find((item) => item.idNumber === row.idNumber)?.totalAmount || 0} />
                    </Td>
                    <Td style={{ border: '1px solid gray' }}>
                      <FaTrash onClick={() => deleteRow(row.idNumber)} />
                    </Td>
                  </Tr>)}
              </Tbody>
            </Table>
            <Flex justifyContent='flex-end' margin='15px'>
              <Text mr='2'> Total Amount (₹): </Text>
              <Text fontSize='md' color='blue'> {totalAmount} </Text>
            </Flex>
          </Box>
          {/* Buttons */}
          <Flex margin='30px'>
            <Button mr='4' size='md'>Save & New</Button>
            <Button mr='4' size='md' onClick={handleClick}>Save</Button>
          </Flex>
        </Box>
      </Flex>
    </>
  );
}

export default AddPurchase;
