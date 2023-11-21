import React, { useEffect, useState } from 'react'
import {
    Box, Button, Flex, HStack, Image, Input, Select, Text, VStack, Wrap, Heading, List,
    ListItem,
    ListIcon,
    OrderedList,

    UnorderedList,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    AspectRatio,
    useDisclosure,
    FormControl,
    FormLabel,
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    InputGroup,
    InputRightAddon,
    InputRightElement,
    InputLeftElement,

} from '@chakra-ui/react'
import Slidebar from '../../Slidebar/Slidebar';
import Company_name from '../../Company_name/Company_name';
import { useNavigate } from 'react-router-dom';
import { FaPrint, FaSearch, FaShare } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import {
    getPurchaseAction,
    postPurchaseAction
} from "../../../../../Redux/Purchase/purchase.action";
import { userDetails } from '../../../../../Redux/config/Commen';


const Purchase_Bills = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const token = localStorage.getItem("token");
    const { firmId } = useSelector((store) => store.FirmRegistration);
    const { purchaseData } = useSelector((store) => store.purchaseReducer);
    console.log("🚀 ~ file: Purchase_Bills.jsx:106 ~ purchaseData:", purchaseData)
    const Company = {
        name: "Company Name"
    }
    const filteredData = purchaseData.filter((data) =>
        data.partyName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    useEffect(() => {
        dispatch(getPurchaseAction( userDetails?.token, firmId))
    }, [firmId])

    const totalSum = purchaseData.reduce((total, data) => {
        const totalAmountForAllItems = data?.items.reduce((itemTotal, item) => {
            if (!isNaN(item.totalAmount)) {
                return itemTotal + parseFloat(item.totalAmount);
            } else {
                return itemTotal; // Skip NaN values
            }
        }, 0);

        if (!isNaN(totalAmountForAllItems)) {
            return total + totalAmountForAllItems;
        } else {
            return total; // Skip NaN values in the total calculation
        }
    }, 0);

    const renderData = searchQuery ? filteredData : purchaseData;

    return (
        <>
            <Company_name company_name={Company.name} />
            <Flex >
                <Slidebar />
                <Box flex='1' margin='15px'>
                    <Flex p='4' justifyContent='space-between'>
                        <Heading size='md'>Purchase List</Heading>
                        <Button colorScheme='red' onClick={() => navigate('/add-purchase')}>Add Purchase + </Button>
                    </Flex>
                    <TableContainer marginX='15px' boxShadow='md'
                    >
                        <Flex justifyContent='space-between' marginX='15px' my='1'>
                            <InputGroup width='40%'
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder='Search Party'
                            >
                                <Input size='sm' />
                                <InputLeftElement mt='-1'>
                                    <FaSearch />
                                </InputLeftElement>
                            </InputGroup>
                            <Flex justifyContent='flex-end' ml='4'>
                                <Text mr='2'>Total Purchase : </Text>
                                <Text color='blue'>₹ {totalSum}</Text>
                            </Flex>
                        </Flex>
                        <Table>
                            <Thead>
                                <Tr>
                                    <Th style={{ border: '0.1px solid lightgray' }}>Party Name</Th>
                                    <Th style={{ border: '0.1px solid lightgray' }}>Date</Th>
                                    <Th style={{ border: '0.1px solid lightgray' }}>Total Amount</Th>
                                    <Th style={{ border: '0.1px solid lightgray' }}>Due Amount</Th>
                                    <Th style={{ border: '0.1px solid lightgray' }}>Actions</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {renderData.map((data) => {
                                    const totalAmountForItem = data?.items.reduce((total, item) => total + parseFloat(item.totalAmount), 0);
                                    const date = new Date(data?.date);
                                    const formattedDate = date.toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    });
                                    return (
                                        <Tr>
                                            <Td style={{ border: '0.1px solid lightgray' }}>
                                                {data?.partyName}
                                            </Td>
                                            <Td style={{ border: '0.1px solid lightgray' }}>
                                                {formattedDate}
                                            </Td>
                                            <Td style={{ border: '0.1px solid lightgray' }}>
                                                ₹ {totalAmountForItem}
                                            </Td>
                                            <Td style={{ border: '0.1px solid lightgray' }}>
                                                ₹ {data?.dueAmount}
                                            </Td>
                                            <Td style={{ border: '0.1px solid lightgray' }}>
                                                <Flex gap='8px'>
                                                    <FaShare />
                                                    <FaPrint />
                                                </Flex>
                                            </Td>
                                        </Tr>
                                    )
                                })}
                            </Tbody>
                        </Table>
                    </TableContainer>
                </Box>

            </Flex>

        </>
    )
}

export default Purchase_Bills