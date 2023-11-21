import React, { useState, useEffect } from 'react'
import { Company_name } from '../Company_name/Company_name'
import { Box, Flex, Heading, Table, TableContainer, Tbody, Td, Th, Thead, Tr, Button, Input, InputRightAddon, InputGroup, Select, Text, Center, Link, Icon } from '@chakra-ui/react'
import { ChevronDownIcon, SearchIcon } from '@chakra-ui/icons'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { FiDownload, FiShare2 } from 'react-icons/fi';
import { getPartiesStatementByDate, getPartiesStatement} from '../../../../Redux/Partystatement/partystatement.action'
import { store } from '../../../../Store/Store'


const Company = {
  name: "Company Name"
}
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

  const [startDate, setStartDate] = useState(''); // State to store start date
  const [endDate, setEndDate] = useState('');
  const { firmId } = useSelector((store) => store.FirmRegistration);
  // let ip = useSelector((store)=> store.partiesReducer.getPartiesData)
  // console.log("ip",ip)
  // console.log("hello",useSelector((store) => store.partystatementReducer.partiesStatementData));
  console.log("firmid - 1-", firmId)
  // console.log("hi", store.partystatementReducer)

  // let getAlltransactionData = useSelector((store) => store.transactionReducer.transactionData);
  // console.log("Alltransactiondata", getAlltransactionData)

  // console.log(store.partystatementReducer)

  
  let getAllData = useSelector((store) => store.partystatementReducer.partiesStatementData.user);
  console.log("getalldata ", getAllData)

 
  
  const dispatch = useDispatch();

  useEffect(() => {
    const userDetails = JSON.parse(sessionStorage.getItem("companyDetails")) ? JSON.parse(sessionStorage.getItem("companyDetails")) : null;

    // Check if both start and end dates are provided before making the API call
    if (startDate && endDate) {
      dispatch(getPartiesStatementByDate(userDetails?.token, firmId, startDate, endDate));
      
    }
    else{
      dispatch(getPartiesStatement(userDetails?.token, firmId));
    }
  }, [firmId]); // Include startDate and endDate in the dependency array to re-run the effect when they change

  return (
    <>

      <Flex>
        <Input type='date' size='sm' value={startDate} onChange={(e) => setStartDate(e.target.value)} mr='2' />
        <Text size='lg' mr='2'>to</Text>
        <Input type='date' size='sm' value={endDate} onChange={(e) => setEndDate(e.target.value)} mr='4' />
      </Flex>
      <Flex>
        <Box>
          <TableContainer m='2' margin='15px'
            border='0.1px solid lightgray'
            boxShadow='rgba(149, 157, 165, 0.2) 0px 8px 24px'
          >
            <Table>
              <Thead>
                <Tr>
                  <Th style={{ border: '1px solid gray' }}>Party Name</Th>
                  <Th style={{ border: '1px solid gray' }}> Date</Th>
                  <Th style={{ border: '1px solid gray' }}>TXN TYPE</Th>
                  <Th style={{ border: '1px solid gray' }}>REF NO.</Th>
                  <Th style={{ border: '1px solid gray' }}>PAYMENT</Th>
                  <Th style={{ border: '1px solid gray' }}>TOTAL</Th>
                  <Th style={{ border: '1px solid gray' }}>RECEIVED</Th>
                  <Th style={{ border: '1px solid gray' }}>TXN BALANCE</Th> 
                  <Th style={{ border: '1px solid gray' }}>RECEIVABLE BALANCE</Th>
                  <Th style={{ border: '1px solid gray' }}>PAYABLE BALANCE</Th>

                </Tr>
              </Thead>
              {/* <Tbody>
                {getAllData.map((party, index) => (
                  <Tr key={index}>
                    <Td>{party.firmId}</Td>
                    <Td>{party.createdAt}</Td>
                    <Td>{party.type}</Td>
                    <Td>{party.gstNo}</Td>
                    <Td>{party.paidAmount} ₹</Td>
                    <Td>{party.finalAmount} ₹</Td>
                    <Td>{party.subTotal} ₹</Td>
                    

                    
                    
                    <Td>
                      <Link color="blue.500" mr="2" textDecoration='underline'>
                        view
                      </Link>
                      <Link color="blue.500" mr="2">
                        <Icon as={FiDownload} />
                      </Link>
                      <Link color="blue.500">
                        <Icon as={FiShare2} />
                      </Link>
                    </Td>
                  </Tr>
                ))}
              </Tbody> */}
            </Table>
          </TableContainer>
        </Box>
      </Flex>

    </>
  );
}

export default PartyStatement;

// /:firmId/purchase - purchase