import React, { useState, useEffect } from 'react'
import { Box, Flex, Heading, Table, TableContainer, Tbody, Td, Th, Thead, Tr, Button, Input, InputRightAddon, InputGroup, Select, Text, Center, Link, Icon } from '@chakra-ui/react'
import { ChevronDownIcon, SearchIcon } from '@chakra-ui/icons'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getPartiesStatementByDate, getPartiesStatement, getIndividualPartiesStatement, setPartyId, getTransactions } from '../../../../Redux/Partystatement/partystatement.action'
import { store } from '../../../../Store/Store'

import { getAllPartiesAction } from '../../../../Redux/AllPartiesReport/allparties.action';


const tableData = [
  {
    reportNo: '1',
    customerName: 'aa',
    amount: 50,
    balance: 20,
    date: '25-08-2023'
  },
  {
    reportNo: '2',
    customerName: 'bb',
    amount: 40,
    balance: 20,
    date: '23-08-2023'
  },
  {
    reportNo: '3',
    customerName: 'cc',
    amount: 40,
    balance: 20,
    date: '22-08-2023'
  },
  {
    reportNo: '4',
    customerName: 'zz',
    amount: 70,
    balance: 20,
    date: '21-08-2023'
  },

]

const PartyStatement = () => {

  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchData, setSearchData] = useState(tableData);
  let [selectedPartyId, setSelectedPartyId] = useState([]);
  let [partyId, setPartyId] = useState('');

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setSearchData(tableData.filter((data) =>
      data.name.toLowerCase().includes(searchQuery.toLowerCase())
    ))
  }

  const handleRowClick = (reportNo) => {
    navigate('/individual-report')
  }



  const [startDate, setStartDate] = useState(''); // State to store start date
  const [endDate, setEndDate] = useState('');
  const { firmId } = useSelector((store) => store.FirmRegistration);

  console.log("firmid - 1-", firmId)

  //  token login
  const userDetails = JSON.parse(sessionStorage.getItem("companyDetails")) ?
    JSON.parse(sessionStorage.getItem("companyDetails")) : null


  let getpartydata = useSelector((store) => store.partiesReducer.getPartiesData);
  console.log("get party data ", getpartydata)



  const dispatch = useDispatch();

  // const handleViewClick = (partyId) => {
  //   navigate(`/party/${partyId}`);
  // };



  // console.log("selectedPartyId", selectedPartyId)


  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const userDetails = JSON.parse(sessionStorage.getItem("companyDetails")) || {};
  //       const { token } = userDetails;
  //       console.log("user details", userDetails)

  //       // console.log("hi p 1",selectedPartyId)
  //       // console.log("hi f 1",firmId)
  //       // if (firmId && selectedPartyId) {
  //       //   console.log("hi p 2",selectedPartyId)
  //       //   console.log("hi f ",firmId)
  //       //  const getdisplaydata =  dispatch(getTransactions({ token, firmId: firmId, partyId: selectedPartyId }));
  //       //  console.log("display data", getdisplaydata)

  //       // } else {
  //       //   console.error("Party ID is undefined.");
  //       // }
  //     } catch (error) {
  //       // Handle errors
  //       console.error("Error fetching party statement:", error);
  //     }
  //   };

  //   fetchData();
  // }, [firmId]);


  // const handlePartySelectChange = (event) => {
  //   event.preventDefault();
  //   // partyId = selectedPartyId = event.target.value;
  //   selectedPartyId = event.target.value;
  //   setPartyId(selectedPartyId); // Update partyId using the state setter
  //   dispatch(setPartyId(selectedPartyId));
  //   // dispatch(setPartyId(partyId));
  //   const { token } = userDetails;
  //   // checking data is getting properly
  //   console.log("Token:", token);
  //   console.log("Firm ID:", firmId);
  //   console.log("Party ID:", partyId);

  //   // if (firmId && partyId) {
  //   //   const { token } = userDetails;
  //   //   dispatch(getTransactions(token, firmId, partyId));
  //   // } else {
  //   //   console.error("Party ID or Firm ID is undefined.");
  //   // }
  // };


  const handlePartySelectChange = (event) => {
    event.preventDefault();
    const selectedPartyId = event.target.value;
    setPartyId(selectedPartyId); // Update partyId using the state setter
  
    const { token } = userDetails;
    console.log("Token:", token);
    console.log("Firm ID:", firmId);
    console.log("Party ID:", selectedPartyId);
  
    dispatch({ type: 'SET_PARTY_ID', payload: selectedPartyId }); // Dispatch the action directly
  
    if (firmId && selectedPartyId) {
      dispatch(getTransactions(token, firmId, selectedPartyId));
    } else {
      console.error("Party ID or Firm ID is undefined.");
    }
  };
  
  


  useEffect(() => {
    // Log data to verify it's getting properly
    console.log("Token 1:", userDetails.token);
    console.log("Firm ID 1:", firmId);
    console.log("Party ID 1:", partyId);

    // Check if firmId and partyId are defined
    if (firmId && partyId) {
      const { token } = userDetails;
      dispatch(getTransactions(token, firmId, partyId));
    } else {
      console.error("Party ID or Firm ID is undefined.");
    }
  }, [firmId, partyId, userDetails.token, dispatch]);

  // const transactions = useSelector((state) => state.partiesReducer.transactions);
  // console.log("transactions", transactions)


  return (
    <>

      <Box Flex='1' padding='15px'
      >
        <Heading size='md' mt='2'> Party Statement Reports</Heading>
        <Flex alignItems='right' position='absolute' right="230" top="140">
          <Button fontSize={"10px"} bg={"blue.400"} marginLeft="10px">Print</Button>
          <Button fontSize={"10px"} bg={"blue.400"} marginLeft="10px">Excel</Button>
        </Flex>

        <Flex justifyContent='space-between' alignItems='center'
          margin='30px'
          flexDirection={{ base: 'column', md: 'row' }}
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
            <Input type='date' size='sm' mr='2' />
            <Text size='lg' mr='2'>to</Text>
            <Input type='date' size='sm' mr='4' />
          </Flex>
          <InputGroup mt='-2'>
            <Input
              placeholder="search..."
              value={searchQuery}
              onChange={handleSearch}
              size='sm'
              width='60%'

            />
            <InputRightAddon size='sm' outline='none' height='32px' mr='-10'>
              <SearchIcon color='black' />
            </InputRightAddon>
          </InputGroup>
          {/* Parties dropdown */}
          <Select
            mt="-1"
            ml="-10"
            width="35%"
            size="sm"
            rightIcon={<ChevronDownIcon />}
            defaultValue={selectedPartyId}
            onChange={handlePartySelectChange}
            placeholder="Select Parties"
          >
            <optgroup label=" Parties Listed ">
              {getpartydata.map((party) => (
                <option key={party._id} value={party._id}>
                  {party.partyName}
                </option>
              ))}
            </optgroup>
          </Select>
        </Flex>

        <TableContainer m='2' margin='15px'
          border='0.1px solid lightgray'
          boxShadow='rgba(149, 157, 165, 0.2) 0px 8px 24px'
        >
          <Table>
            <Thead>
              <Tr>
                <Th style={{ border: '1px solid gray' }}>
                  Date
                </Th>
                <Th style={{ border: '1px solid gray' }}>
                  TXN TYPE
                </Th>
                <Th style={{ border: '1px solid gray' }}>
                  REF NO.
                </Th>
                <Th style={{ border: '1px solid gray' }}>PAYMENT TYPE</Th>
                <Th style={{ border: '1px solid gray' }}>TOTAL</Th>
                <Th style={{ border: '1px solid gray' }}>RECEIVED/PAID</Th>
                <Th style={{ border: '1px solid gray' }}>TXN BALANCE</Th>
                <Th style={{ border: '1px solid gray' }}>RECEIVEABLE BALANCE</Th>
              </Tr>
            </Thead>
            <Tbody>
              {
                <Tr>
                  {/* <Td style={{border:'1px solid gray'}}>
                                       </Td> */}
                  {/* <Td style={{border:'1px solid gray'}}>{}</Td>
                  
                                        <Td style={{border:'1px solid gray'}}></Td>
                                        <Td style={{border:'1px solid gray'}}> </Td>
                                        <Td style={{border:'1px solid gray'}}></Td>
                                        <Td style={{border:'1px solid gray'}}></Td>
                                        <Td style={{border:'1px solid gray'}}></Td> */}
                </Tr>
              }
            </Tbody>
          </Table>

        </TableContainer>

        <Flex>

          <Box border='0.1px solid lightgray'
            boxShadow='rgba(149, 157, 165, 0.2) 0px 8px 24px'
            ml='4'
            height='100%'
            width='100%'
            p='2'>
            <Box>
              <Text textAlign='left' textColor='black' fontSize='20px' fontWeight='semibold' mt='3' >Party Statement Summary</Text> <br />
            </Box>
            <Box>
              <Flex justifyContent='space-between'>
                <Box >
                  <Flex>
                    <Text textColor='black' fontSize='15px' fontWeight='semibold'>Total Sale : </Text>
                    <Text textColor='black' fontSize='15px' fontWeight='semibold' >  ₹{ }</Text>
                  </Flex>
                </Box>
                <Box>
                  <Flex>
                    <Text textColor='black' fontSize='15px' fontWeight='semibold'>Total Purchase :  </Text>
                    <Text textColor='black' fontSize='15px' fontWeight='semibold' >  ₹ { }</Text>
                  </Flex>
                </Box>
                <Box>
                  <Flex>
                    <Text textColor='black' fontSize='15px' fontWeight='semibold' marginRight='30'>Total Expense : </Text>
                    <Text textColor='black' fontSize='15px' fontWeight='semibold'> ₹ { }</Text>
                  </Flex>
                </Box>

              </Flex>
              <Flex justifyContent='space-between'>
                <Box>
                  <Flex>
                    <Text textColor='black' fontSize='15px' fontWeight='semibold'>Total Money-In :  </Text>
                    <Text textColor='black' fontSize='15px' fontWeight='semibold'>₹{ }</Text>
                  </Flex>
                </Box>
                <Box>
                  <Flex>
                    <Text textColor='black' fontSize='15px' fontWeight='semibold' marginRight='30'>Total Money-out : </Text>
                    <Text textColor='black' fontSize='15px' fontWeight='semibold' >₹{ }</Text>
                  </Flex>
                </Box>
              </Flex>
            </Box>
            <Box>
              <Flex>
                <Text textColor='black' fontSize='15px' fontWeight='semibold'>Total Receiveable :  </Text>
                <Text textColor='black' fontSize='15px' fontWeight='semibold'>₹{ }</Text>
              </Flex>
            </Box>
          </Box>
        </Flex>
      </Box>
    </>
  );
}

export default PartyStatement;
