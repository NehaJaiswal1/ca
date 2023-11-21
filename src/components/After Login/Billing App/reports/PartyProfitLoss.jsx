
import React, { useEffect, useState } from 'react'

import Company_name from '../Company_name/Company_name'
import Slidebar from '../Slidebar/Slidebar'
import { Box, Flex, Heading, Table, TableContainer, Tbody, Td, Th, Thead, Tr, Button, Input, InputRightAddon, InputGroup, Select, Text } from '@chakra-ui/react'
import { ChevronDownIcon, SearchIcon } from '@chakra-ui/icons'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {getPartiesAction} from '../../../../Redux/PartyProfitLoss/partyprofitloss.action'
// sale -> receivedAmount- sale
// transaction-> paidAmount - purchase
// const Company = {
//     name: "Company Name"
// }
// const tableData = [
//     {
//         partyName:'1',
//         phone_No:'aa',
//         totalSale:50,
//         profit/loss:20
//     },
//     {
//         partyName:'2',
//         phone_No:'bb',
//         totalSale:40,
//         profit_loss:20
//     },
//     {
//         partyName:'3',
//         phone_No:'cc',
//         totalSale:40,
//         profit_loss:20
//     },
//     {
//         partyName:'4',
//         phone_No:'zz',
//         totalSale:70,
//         profit_loss:20
//     },
    
// ]



const PartyProfitLoss = () => {
    
    // const navigate = useNavigate();
    // const [searchQuery, setSearchQuery] = useState('');
    // const [searchData, setSearchData] = useState(tableData);

    // const handleSearch = (e) => {
    //     setSearchQuery(e.target.value);
    //     setSearchData(tableData.filter((data)=>
    //         data.name.toLowerCase().includes(searchQuery.toLowerCase())
    //     ))
    // }

    // const handleRowClick = (reportNo) => {
    //     navigate('/individual-report')
    // }

  
    const { firmId } = useSelector((store) => store.FirmRegistration);
    console.log("firmid -", firmId)
    const { getAllInvoice } = useSelector((store) => store.invoiceReducer);
    console.log("🚀 ~ getAllInvoice:", getAllInvoice)
    
    const purchasedata =  useSelector((store)=>store.purchaseReducer.receivedAmount)
    console.log("purchasedata", purchasedata)

    // transaction action for paidAmount
    const transactionData =  useSelector((store)=>store.transactionReducer.transactionData)
    console.log("transactionData", transactionData)

    
    const TotalNumberOfTransaction = getAllInvoice.length;
    // console.log("NumberOfTransaction- " ,TotalNumberOfTransaction );

    const TotalNumberOfSaleArray = getAllInvoice.map(option => option.finalAmount);
    let sumofAmount = 0;
    for(let i=0;i<TotalNumberOfSaleArray.length;i++){
        sumofAmount += TotalNumberOfSaleArray[i];
    }
    // console.log("SumofAmount - " , sumofAmount );

  

    const dispatch = useDispatch();

    // const handleViewClick = (invoiceId) => {
    //     navigate(`/billing-software/${invoiceId}`);
    // };

    useEffect(() => {
        const userDetails = JSON.parse(sessionStorage.getItem("companyDetails")) ? JSON.parse(sessionStorage.getItem("companyDetails")) : null
    
        dispatch(getPartiesAction(userDetails?.token, firmId));
      }, [firmId]);
  return (
    <>
        
                <Box Flex='1' padding='15px'
                >
                    <Heading size='md' mt='2'>Party wise Profit&Loss</Heading>
                    <Flex alignItems='right' position='absolute' right="230" top="140">
                    <Button fontSize={"10px"} bg={"blue.400"} marginLeft="10px">Print</Button>
                    <Button fontSize={"10px"} bg={"blue.400"} marginLeft="10px">Excel</Button>
                    </Flex>

                    <Flex justifyContent='space-between' alignItems='center'
                        margin='30px'
                        flexDirection={{base:'column', md:'row'}}
                    >
                        <Select
                            width='32%'
                            size='sm'
                            mr='2'
                            mt='-2'
                            rightIcon={<ChevronDownIcon />}
                            defaultValue='default'
                            placeholder="Select date"
                        >
                            <option>Today</option>
                            <option>This week</option>
                            <option>This Month</option>
                            <option>This Quarter</option>
                            <option>This Financial Year</option>
                            <option>Custom</option>
                        </Select>
                        <Flex>
                            <Input type='date' size='sm' mr='2'/>
                            <Text size='lg' mr='2'>to</Text>
                            <Input type='date' size='sm' mr='4'/>
                        </Flex>
                        <InputGroup mt='-2'>
                            {/* <Input
                                placeholder="search..."
                                value={searchQuery}
                                onChange={handleSearch}
                                size='sm'
                                width='60%'
                                
                            /> */}
                            <InputRightAddon size='sm' outline='none' height='32px' mr='-10'>
                                <SearchIcon color='black'/>
                            </InputRightAddon>
                        </InputGroup>
                        <Select
                            mt='-1'
                            ml='-10'
                            width='35%'
                            size='sm'
                            rightIcon={<ChevronDownIcon />}
                            defaultValue='default'
                            placeholder="Select Txns type & Parties "
                        >
                            <optgroup label='Txns Type'>
                                <option>Sale & Cr. Note</option>
                                <option>Sale</option>
                                <option>Credit Note</option>
                            </optgroup>
                            <optgroup label='Party'>
                                <option>aa</option>
                                <option>bb</option>
                                <option>cc</option>
                            </optgroup>
                        </Select>
                    </Flex>
                    
                    <TableContainer m='2' margin='15px'
                        border= '0.1px solid lightgray'
                        boxShadow= 'rgba(149, 157, 165, 0.2) 0px 8px 24px'
                    >
                        <Table>
                            <Thead>
                                <Tr>
                                    <Th style={{border:'1px solid gray'}}>
                                        Party Name
                                    </Th>
                                    <Th style={{border:'1px solid gray'}}>
                                        Phone no.
                                    </Th>
                                    <Th style={{border:'1px solid gray'}}>
                                        Total Sale Amount
                                    </Th>
                                    <Th style={{border:'1px solid gray'}}>Profit/Loss</Th>
                                    
                                </Tr>
                            </Thead>
                            <Tbody>
                                {getAllInvoice?.map((data)=>(
                                    <Tr style={{cursor:'pointer'}}
                                    >
                                        <Td style={{border:'1px solid gray'}}>
                                        {data.partyName}</Td>
                                        <Td style={{border:'1px solid gray'}}>{data.partyName}</Td>
                                        {/* <Td style={{border:'1px solid gray'}}></Td> */}
                                        <Td style={{border:'1px solid gray'}}>{data.finalAmount} ₹</Td>
                                        <Td style={{border:'1px solid gray'}}>{data.dueAmount} </Td>
                                        <Td style={{border:'1px solid gray'}}>{data.dueDate}</Td>
                                        <Td style={{border:'1px solid gray'}}>Edit</Td>
                                        <Td style={{border:'1px solid gray'}}>Delete</Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </TableContainer>
                    <Flex>
                        <Box border= '0.1px solid lightgray'
                        boxShadow= 'rgba(149, 157, 165, 0.2) 0px 8px 24px'
                        ml='4'
                        height='80px'
                        width='100%'
                        p='2'
                        >
                            <Text>Total Sale Amount</Text>
                            <Text fontSize='20px' mt='-2'>{TotalNumberOfTransaction}</Text>
                        </Box>
                        <Box border= '0.1px solid lightgray'
                        boxShadow= 'rgba(149, 157, 165, 0.2) 0px 8px 24px'
                        ml='4'
                        height='80px'
                        width='100%'
                        p='2'
                        >
                            <Text>Total Profit(+)/Loss(-)</Text>
                            <Text fontSize='20px' mt='-2'>{sumofAmount}₹</Text>
                        </Box>
                    
                    </Flex>
                </Box>
    </>
  )
}

export default PartyProfitLoss