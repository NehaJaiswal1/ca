import React, { useState } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, Button } from '@chakra-ui/react';
import { toast } from 'react-toastify';

const ItemsTable = () => {
  // Dummy data for demonstration
  const items = [
    {
      id: 1,
      name: 'Item 1',
      category: 'Category A',
      quantity: 2,
      price: 100,
      gst: 5,
      hsnCode: 'HSN456',
      totalPrice: 200,
    },
    {
      id: 2,
      name: 'Item 2',
      category: 'Category B',
      quantity: 3,
      price: 50,
      gst: 3,
      hsnCode: 'HSN012',
      totalPrice: 150,
    },
    // Add more items as needed
  ];



  const [tableData, setTableData] = useState([
    { id: 1, item: 'Item 1', quantity: 1, per_unit_price: 10, tax: 10, amount: 11 },
    { id: 2, item: 'Item 2', quantity: 2, per_unit_price: 20, tax: 10, amount: 44 },
    { id: 3, item: 'Item 3', quantity: 3, per_unit_price: 30, tax: 10, amount: 99 },
  ]);

  const [newRowData, setNewRowData] = useState({
    id: 2,
      name: 'Item 2',
      category: 'Category B',
      quantity: 3,
      price: 50,
      gst: 3,
      hsnCode: 'HSN012',
      totalPrice: 150,
  });


  const handleTableInputChange = (event, index, key) => {
    const newData = [...tableData];
    newData[index][key] = event.target.value;
    setTableData(newData);
    const { name, value } = event.target;
    setNewRowData({ ...newRowData, [name]: value });

  };

  const handleAddRow = () => {
    const newId = Math.max(...tableData.map((data) => data.id)) + 1;
    setTableData([...tableData, { ...newRowData, id: newId }]);
  };

  const handleDeleteRow = async (index, id) => {
    const newData = [...tableData];
    // const res = await deleteRequest(`/addEastimate/estimate/${id}`,userDetails?.token)
    // if(res?.status == 200){
    newData.splice(index, 1);
    setTableData(newData);
    toast.success("Item delated Success")
    // }
    // console.log(res , "<<<<");

  };


  const calculateAmount = (quantity, per_unit_price, tax) => {
    const amount = quantity * per_unit_price;
    const taxAmount = (tax / 100) * amount;
    return amount + taxAmount;
  };

  return (
    <TableContainer bg='white'
      margin='15px'
      border='0.1px solid lightgray'
      boxShadow='rgba(149, 157, 165, 0.2) 0px 8px 24px'
    >
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th style={{ border: '1px solid lightgray' }}>Item ID</Th>
            <Th style={{ border: '1px solid lightgray' }}>Item Name</Th>
            <Th style={{ border: '1px solid lightgray' }}>Category</Th>
            <Th style={{ border: '1px solid lightgray' }}>Quantity</Th>
            <Th style={{ border: '1px solid lightgray' }}>Item Price</Th>
            <Th style={{ border: '1px solid lightgray' }}>GST</Th>
            <Th style={{ border: '1px solid lightgray' }}>HSN/SSN Code</Th>
            <Th style={{ border: '1px solid lightgray' }}>Total Price</Th>
          </Tr>
        </Thead>
        <Tbody>
          {items.map((item ,index) => (
          <Tr key={item.id} height='50px'>
            <Td style={{ border: '1px solid lightgray' }}>
              {index + 1}
              </Td>
            <Td style={{ border: '1px solid lightgray' }}>
            {/* <input type="text" value={item.name} name='name' onChange={(e) => handleTableInputChange(e, index, 'item')} /> */}
             
            {item.name}
              </Td>
            <Td style={{ border: '1px solid lightgray' }}>
            {/* <input type="text" value={item.name} name='name' onChange={(e) => handleTableInputChange(e, index, 'item')} /> */}
              
              {item.category}</Td>
            <Td style={{ border: '1px solid lightgray' }}>
            {/* <input type="text" value={item.name} name='name' onChange={(e) => handleTableInputChange(e, index, 'item')} /> */}

              {item.quantity}</Td>
            <Td style={{ border: '1px solid lightgray' }}>
            {/* <input type="text" value={item.name} name='name' onChange={(e) => handleTableInputChange(e, index, 'item')} /> */}

              {item.price}</Td>
            <Td style={{ border: '1px solid lightgray' }}>
            {/* <input type="text" value={item.name} name='name' onChange={(e) => handleTableInputChange(e, index, 'item')} /> */}

              {item.gst}%</Td>
            <Td style={{ border: '1px solid lightgray' }}>
            {/* <input type="text" value={item.name} name='name' onChange={(e) => handleTableInputChange(e, index, 'item')} /> */}

              {item.hsnCode}</Td>
            <Td style={{ border: '1px solid lightgray' }}>
            {/* <input type="number" value={item.totalPrice} name='totalPrice' onChange={(e) => handleTableInputChange(e, index, 'item')} /> */}

              {item.totalPrice}</Td>
          </Tr>
        ))}
          {/* {tableData.map((data, index) => (
            <Tr key={data?._id} height='50px'>
              <Td>{index + 1}</Td>
              <Td>
                <input type="text" value={data.item} name='item' onChange={(e) => handleTableInputChange(e, index, 'item')} />
              </Td>
              <Td>
                <input type="number" value={data.quantity} name='quantity' onChange={(e) => handleTableInputChange(e, index, 'quantity')} />
              </Td>
              <Td>
                <input type="number" value={data.per_unit_price} name='per_unit_price' onChange={(e) => handleTableInputChange(e, index, 'per_unit_price')} />
              </Td>
              <Td>
                <input type="number" value={data.tax} name='tax' onChange={(e) => handleTableInputChange(e, index, 'tax')} />
              </Td>
              <Td> {calculateAmount(Number(data?.quantity), Number(data?.per_unit_price), Number(data?.tax))}</Td>
              <Td>
                <button onClick={() => handleDeleteRow(index, data?._id)}>Delete</button>
              </Td>
            </Tr>

          ))} */}
        </Tbody>
      </Table>
      {/* <Button onClick={handleAddRow}>Add Row +</Button> */}

    </TableContainer>
  );
}

export default ItemsTable;
