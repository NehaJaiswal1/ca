import React, { useEffect, useState } from 'react'
import Slidebar from '../Slidebar/Slidebar'
import { Box, Button, Flex, IconButton, Input, Text } from '@chakra-ui/react'
import Company_name from '../Company_name/Company_name'
import Sold_ShipTo from './Sold_ShipTo'
import Invoice from './Invoice'
import ItemsTable from './ItemsTable'
import TableOptions from './TableOptions'
import { FaCalculator } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import {
    postInvoiceAction,
    getOneInvoiceAction
} from "../../../../Redux/Invoice/invoice.action";
import { useParams } from 'react-router-dom'
import { userDetails } from '../../../../Redux/config/Commen'
import { Inputvalidate } from '../../../helpers/inputValidate'
import { hasValidationError, validationError } from '../../../helpers/Frontend'
import { getStockAction } from '../../../../Redux/Stocks/stock.action'

const Company = {
    name: "Company Name"
}

const BillingSoftware = () => {
    const { firmId } = useSelector((store) => store.FirmRegistration);
    const { invoiceId } = useParams();
    const dispatch = useDispatch();
    console.log(invoiceId, "<<<invoiceId");
    const { getOneInvoice } = useSelector((store) => store.invoiceReducer);
    const { getStockData } = useSelector((store) => store.stockReducer);

    const [formData, setFormData] = useState({
        soldToCustomerName: '',
        shipToCustomerName: '',
        soldToCustomerAddress: '',
        shipToCustomerAddress: '',
        customerEmail: '',
        subTotal: '',
        discount: '',
        finalAmount: '',
        invoiceNo: '',
        invoiceDate: '',
        paymentMode: '',
        gstNo: '',
        dueDate: '',
        items: [],
        paidAmount: '',
        dueAmount: '',
        firmId: firmId
    });

    useEffect(() => {
        if (getOneInvoice) {
            setFormData({
                soldToCustomerName: getOneInvoice.soldToCustomerName || '',
                shipToCustomerName: getOneInvoice.shipToCustomerName || '',
                soldToCustomerAddress: getOneInvoice.soldToCustomerAddress || '',
                shipToCustomerAddress: getOneInvoice.shipToCustomerAddress || '',
                customerEmail: getOneInvoice.customerEmail || '',
                subTotal: getOneInvoice.subTotal || '',
                discount: getOneInvoice.discount || '',
                finalAmount: getOneInvoice.finalAmount || '',
                invoiceNo: getOneInvoice.invoiceNo || '',
                invoiceDate: getOneInvoice.invoiceDate || '',
                paymentMode: getOneInvoice.paymentMode || '',
                gstNo: getOneInvoice.gstNo || '',
                dueDate: getOneInvoice.dueDate || '',
                items: getOneInvoice.items || [],
                paidAmount: getOneInvoice.paidAmount || '',
                dueAmount: getOneInvoice.dueAmount || ''
            });
        }
    }, [getOneInvoice]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        // setFormData({ ...formData, firmId: firmId });

    };

    const inputNameArray = ["soldToCustomerName", "shipToCustomerName", "soldToCustomerAddress", "shipToCustomerAddress", "customerEmail"
        , "subTotal", "discount", "finalAmount", "invoiceNo", "invoiceDate", "paymentMode", "gstNo", "dueDate",
        "items", "paidAmount", "dueAmount", "firmId"]
    const [errors, setErrors] = useState([]);

    const submitInvoice = () => {
        if (!Inputvalidate(inputNameArray, { ...formData, firmId: firmId }, setErrors)) { return; }
        dispatch(postInvoiceAction({ ...formData, firmId: firmId }, firmId, userDetails?.token))
    }

    useEffect(() => {
        dispatch(getOneInvoiceAction(userDetails?.token, firmId, invoiceId))
    }, [])


    useEffect(() => {
        dispatch(getStockAction(userDetails?.token, firmId));
        console.log(getStockData, "<<<<getStockData<");
    }, [firmId]);


    return (
        <>
            <Company_name company_name={Company.name} />
            <Flex>
                <Slidebar />
                <Box flex='1' flexDirection='column' p='1'>
                    {/* basic details and invoice */}
                    <Flex justifyContent='space-between'>
                        <Flex width="60%"
                            flexDirection="column"
                            p='2'
                            margin='15px'
                            border='0.1px solid lightgray'
                            boxShadow='rgba(149, 157, 165, 0.2) 0px 8px 24px'
                        >
                            <Sold_ShipTo formData={formData} setFormData={setFormData} handleInputChange={handleInputChange} />
                            <Flex direction="column" mt='2' p='2'>
                                <Flex justifyContent='space-between' p='2'>
                                    <Flex align='left' mr='4'>
                                        <Text textAlign='left' fontWeight='semibold' mr='2'>Customer Email: </Text>
                                        <Input name="customerEmail" size='sm' width='250px' placeholder='Enter customer email' onChange={handleInputChange} />
                                    </Flex>
                                    {/* <Button
                                        colorScheme="gray"
                                        leftIcon={<FaCalculator />}
                                        variant="outline"
                                        size="sm"
                                    >
                                        <Flex alignItems="center">
                                            <Text ml="2" fontSize="sm" mt='4'>
                                                Calculator
                                            </Text>
                                        </Flex>
                                    </Button> */}
                                </Flex>

                                <Flex alignItems="center" justifyContent="space-between">
                                    <Button size="sm" colorScheme="gray" variant="none">
                                        Line Count 23
                                    </Button>
                                    <Button size="sm" colorScheme="gray" variant="outline">
                                        Add Item
                                    </Button>
                                    {
                                        invoiceId ?
                                            <Button size="sm" colorScheme="gray" variant="outline">
                                                Update Bill
                                            </Button> : ""
                                    }
                                    <Button size="sm" colorScheme="gray" variant="outline">
                                        Delete Item
                                    </Button>
                                </Flex>

                            </Flex>
                        </Flex>
                        
                        {/* Invoice */}
                        <Box width="40%"
                            p='2'
                            margin='15px'
                            border='0.1px solid lightgray'
                            boxShadow='rgba(149, 157, 165, 0.2) 0px 8px 24px'
                        >
                            <Invoice formData={formData} setFormData={setFormData} handleInputChange={handleInputChange} />
                        </Box>
                    </Flex>
                    {/* table */}

                    <ItemsTable />

                    {/* below table */}
                    <Flex>
                        <Flex p='4'
                            height='90%'
                            direction='column'
                            justifyContent='left'
                            margin='15px'
                            width='60%'
                            marginRight='auto'
                            border='0.1px solid lightgray'
                            boxShadow='rgba(149, 157, 165, 0.2) 0px 8px 24px'
                        >
                            <Flex justifyContent='space-around'>
                                <Flex>
                                    <Text fontSize='md' fontWeight='semibold' type='number' mr='2'>Paid Amount : </Text>
                                    <Input flex="1" ml="2" size="sm" name="paidAmount" onChange={handleInputChange} />

                                </Flex>
                                {/* {hasValidationError(errors, "paidAmount") ? (<span className="has-cust-error-white">{validationError(errors, "paidAmount")}</span>) : null} */}
                                <Flex>
                                    <Text fontSize='md' fontWeight='semibold' type='number' mr='2'>Due Amount : </Text>
                                    <Input flex="1" ml="2" size="sm" name="dueAmount" onChange={handleInputChange} />
                                </Flex>
                            </Flex>
                            <Flex justifyContent='space-between' alignItems='flex-end'>
                                <Button width='30%' outline='none'>Close</Button>
                                <Button width='30%' outline='none' onClick={submitInvoice}>Save</Button>
                                <Button width='30%' outline='none'>Print</Button>
                            </Flex>
                        </Flex>
                        <Flex pt='4' px='2'
                            justifyContent='right'
                            margin='15px'
                            width='32%'
                            marginLeft='auto'
                            border='0.1px solid lightgray'
                            boxShadow='rgba(149, 157, 165, 0.2) 0px 8px 24px'
                        >
                            <Flex direction='column'>
                                <Flex mb="2">
                                    <Text flex="0 0 120px"
                                        alignItem='left'
                                    >Sub Total : </Text>
                                    <Input flex="1" ml="2" size="sm" type='number' name="subTotal" value={formData?.subTotal} onChange={handleInputChange} />
                                </Flex>
                                <Flex mb="2">
                                    <Text flex="0 0 120px">Discount : </Text>
                                    <Input flex="1" ml="2" size="sm" type='number' name="discount" value={formData?.discount} onChange={handleInputChange} />
                                </Flex>
                                <Flex mb="2">
                                    <Text flex="0 0 120px">Final Amount : </Text>
                                    <Input flex="1" ml="2" size="sm" type='number' name="finalAmount" value={formData?.finalAmount} onChange={handleInputChange} />
                                </Flex>
                            </Flex>
                        </Flex>
                    </Flex>
                </Box>
            </Flex>
        </>
    )
}

export default BillingSoftware