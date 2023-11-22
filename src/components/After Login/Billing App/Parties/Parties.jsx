import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  HStack,
  Image,
  Input,
  Select,
  Text,
  VStack,
  Wrap,
  Heading,
  List,
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
  FormErrorMessage,
  InputGroup,
  InputRightElement,
  InputRightAddon,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Slidebar from "../Slidebar/Slidebar";
import Company_name from "../Company_name/Company_name";
import remove from "../../../assets/remove.png";
import print4 from "../../../assets/print4.png";
import {
  deletePartiesAction,
  getPartiesAction,
  postPartiesAction,
  setPartyId,
  searchParty
} from "../../../../Redux/Parties/parties.action";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SearchIcon } from "@chakra-ui/icons";
import { Inputvalidate, validateGstnumber } from "../../../helpers/inputValidate";
import { hasValidationError, validationError } from "../../../helpers/Frontend";



const Parties = () => {
  const Company = {
    name: "Company Name",
  };
  const modal1 = useDisclosure();
  const { firmId } = useSelector((store) => store.FirmRegistration);
  const responseData = useSelector((store) => store.FirmRegistration);
  // const FirmRegistration2 = useSelector((store) => store);
  const dispatch = useDispatch();
  const { getPartiesData } = useSelector((store) => store.partiesReducer);
  const { searchPartiesData } = useSelector((store) => store.partiesReducer);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState();

  // console.log(":", responseData)
  useEffect(() => {
    setFilteredData(Array.isArray(getPartiesData) ? [...getPartiesData] : []);
  }, [getPartiesData]);
  

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    if (searchQuery != "") {
      setFilteredData(getPartiesData?.filter((data) =>
        data.partyName.toLowerCase().includes(searchQuery.toLowerCase())
      ))
      // dispatch(searchParty(e.target.value, token, firmId))
    } else {
      setFilteredData(getPartiesData)
    }
  }

  const userDetails = JSON.parse(sessionStorage.getItem("companyDetails")) ? JSON.parse(sessionStorage.getItem("companyDetails")) : null
  // console.log(  userDetails?.token , "<<<<<<<")

  const [form, setForm] = useState({
    partyName: "",
    gstNo: "",
    phoneNumber: "",
    GSTType: "",
    state: "",
    email: "",
    billingAddress: "",
    shippingAddress: "",
  });

  const [errors, setErrors] = useState([]);

  const handleChangeParty = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const inputNameArray = ["gstNo", "phoneNumber"]

  const handleAddParty = () => {

    if (!validateGstnumber(inputNameArray, { gstNo: form?.gstNo, phoneNumber: form?.phoneNumber }, setErrors)) { return; }
    if (!Inputvalidate(["partyName", "GSTType", "state", "email", "shippingAddress", "phoneNumber", "gstNo", "billingAddress"], form, setErrors)) { return; }
    dispatch(postPartiesAction(form, userDetails?.token, firmId ,modal1));
    // modal1.onClose();

  };
  useEffect(() => {

    if (responseData.error) {
      console.log(responseData);
    } else {
      modal1.onClose()
    }
  }, [responseData])
  // useEffect(() => {
  //   const userDetails = JSON.parse(sessionStorage.getItem("companyDetails")) ? JSON.parse(sessionStorage.getItem("companyDetails")) : null

  //   dispatch(getAllPartiesAction(userDetails?.token));
  // }, []);


  //   const removeParty=(token,id,firmId)=>{
  //       dispatch(deletePartiesAction(token,id,firmId))
  //   }


useEffect(() => {
  dispatch(getPartiesAction(userDetails?.token, firmId));
}, [firmId]);


  // validate gst no.
  const isValidgstNo = (gstNo) => {
    const gstPattern = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[0-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$/;
    return gstPattern.test(gstNo);
  }
  // handle row click
  const navigate = useNavigate();

  const handleRowClick = (partyId) => {
    // Handle row click to navigate to respective page
    navigate(`/party/${partyId}`);
  };

  return (
    <>
      <Company_name company_name={Company.name} />
      <Flex>
        <Slidebar />
        <Box margin={"auto"} marginTop="20px" overflow={"hidden"} width="80%">
          <Flex margin='15px' justifyContent='space-between' alignItems='center'>
            <InputGroup>
              <Input
                placeholder="search..."
                value={searchQuery}
                onChange={handleSearch}
                size='sm'
                width='40%'
              />
              <InputRightAddon size='sm' outline='none' height='32px'>
                <SearchIcon color='black' />
              </InputRightAddon>
            </InputGroup>
            <Button
              backgroundColor="blue.400"
              margin={"10px"}
              onClick={modal1.onOpen}
              px="4"
            >
              Add Parties +
            </Button>
          </Flex>
          <TableContainer
            style={{ margin: '20px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}
          >
            {
              searchQuery.length == 0 &&
              <Text>Please click to logo and Select a company first</Text>

            }
            <Table style={{ borderCollapse: 'collapse', width: '100%' }}>
              <Thead style={{ textAlign: 'center' }}>
                <Tr>
                  <Th isNumeric style={{ border: '1px solid gray' }}>Party ID</Th>
                  <Th style={{ border: '1px solid gray' }}>Party Name</Th>
                  <Th style={{ border: '1px solid gray' }}>Due Amount </Th>
                  <Th style={{ border: '1px solid gray' }}>Paid Amount </Th>
                  <Th style={{ border: '1px solid gray' }}>Total Invoice</Th>
                </Tr>
              </Thead>
              <Tbody>
                {searchQuery.length > 0 ? (
                  // Render search results if a search query is present
                  searchPartiesData
                    .filter((data) => {
                      // Your filtering logic here based on the search query
                      return data.partyName.toLowerCase().includes(searchQuery.toLowerCase());
                    })?.map((filteredData) => (
                      <Tr key={filteredData._id} onClick={() => handleRowClick(filteredData._id)} style={{ cursor: 'pointer' }}>
                        <Td isNumeric style={{ border: '1px solid gray' }}>{filteredData._id}</Td>
                        <Td style={{ border: '1px solid gray' }}>{filteredData.partyName}</Td>
                        <Td style={{ border: '1px solid gray' }}>{filteredData.paidAmount}</Td>
                        <Td style={{ border: '1px solid gray' }}>{filteredData.dueAmount}</Td>
                        <Td style={{ border: '1px solid gray' }}>{filteredData.totalInvoice}</Td>
                      </Tr>
                    ))
                ) : (
                  // Render normal data when there's no search query
                  filteredData?.map((data) => (
                    <Tr key={data._id} onClick={() => handleRowClick(data._id)} style={{ cursor: 'pointer' }}>
                      <Td isNumeric style={{ border: '1px solid gray' }}>{data._id}</Td>
                      <Td style={{ border: '1px solid gray' }}>{data.partyName}</Td>
                      <Td style={{ border: '1px solid gray' }}>{data.paidAmount}</Td>
                      <Td style={{ border: '1px solid gray' }}>{data.dueAmount}</Td>
                      <Td style={{ border: '1px solid gray' }}>{data.totalInvoice}</Td>
                    </Tr>
                  ))
                )}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>

        {/* Add new party */}
        <Modal isOpen={modal1.isOpen} onClose={modal1.onClose}>
          <ModalOverlay />
          <ModalContent
            maxW="70%"
            margin="10px"
            borderRadius="8px"
            boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)"
            paddingLeft="20px"
            paddingRight="40px"
          >

            <ModalHeader style={{ borderBottom: '1px solid #E2E8F0', padding: '16px' }}>
              Add New Party
            </ModalHeader>
            <ModalCloseButton style={{ padding: '12px' }} />
            <ModalBody style={{ padding: '16px' }}>
              <Flex direction='row'>
                <FormControl margin={"10px"}>
                  <FormLabel>Party Name :</FormLabel>
                  <Input
                    type="text"
                    placeholder="Party Name"
                    value={form.partyName}
                    name="partyName"
                    onChange={handleChangeParty}
                  />
                </FormControl>
                <FormControl margin={"10px"}>
                  <FormLabel>Email :</FormLabel>
                  <Input
                    type="email"
                    placeholder="Email"
                    value={form.email}
                    name="email"
                    onChange={handleChangeParty}
                  />
                  {hasValidationError(errors, "email") ? (<span className="has-cust-error-white">{validationError(errors, "email")}</span>) : null}

                </FormControl>
              </Flex>

              <Flex>
                {/* GST no. */}
                <FormControl margin={"10px"}>
                  <FormLabel>GST NO :</FormLabel>
                  <Input
                    type="text"
                    placeholder="GST NO"
                    value={form.gstNo}
                    name="gstNo"
                    onChange={handleChangeParty}
                    isInvalid={!isValidgstNo(form.gstNo) && form.gstNo !== ""}
                  />
                  {!isValidgstNo(form.gstNo) && form.gstNo !== "" && (
                    <FormErrorMessage>Please enter a valid GST number</FormErrorMessage>
                  )}
                  {hasValidationError(errors, "gstNo") ? (<span className="has-cust-error-white">{validationError(errors, "gstNo")}</span>) : null}
                </FormControl>

                <FormControl margin={"10px"}>
                  <FormLabel>GST Type :</FormLabel>
                  <Select
                    placeholder="GST Type"
                    name="GSTType"
                    onChange={handleChangeParty}
                  >
                    <option value="c_gst">cgst</option>
                    <option value="s_gst">sgst</option>
                  </Select>
                </FormControl>
              </Flex>

              <Flex>
                <FormControl margin={"10px"}>
                  <FormLabel>Phone Number :</FormLabel>
                  <Input
                    type="number"
                    placeholder="Phone Number "
                    value={form.phoneNumber}
                    name="phoneNumber"
                    onChange={handleChangeParty}
                  />
                  {hasValidationError(errors, "phoneNumber") ? (<span className="has-cust-error-white">{validationError(errors, "phoneNumber")}</span>) : null}
                </FormControl>
                <FormControl margin={"10px"}>
                  <FormLabel>State :</FormLabel>
                  <Input
                    type="text"
                    placeholder="State"
                    value={form.state}
                    name="state"
                    onChange={handleChangeParty}
                  />
                </FormControl>
              </Flex>

              <Flex>
                <FormControl margin={"10px"}>
                  <FormLabel>Billing Address:</FormLabel>
                  <Input
                    type="text"
                    placeholder="Billing Address"
                    value={form.billingAddress}
                    name="billingAddress"
                    onChange={handleChangeParty}
                  />
                </FormControl>
                <FormControl margin={"10px"}>
                  <FormLabel>Shipping Address :</FormLabel>
                  <Input
                    type="text"
                    placeholder="Shipping Address"
                    value={form.shippingAddress}
                    name="shippingAddress"
                    onChange={handleChangeParty}
                  />
                </FormControl>
              </Flex>
            </ModalBody>

            <ModalFooter style={{ borderTop: '1px solid #E2E8F0', padding: '16px' }}>
              <Button colorScheme="blue" mr={3} onClick={modal1.onClose}>
                Close
              </Button>
              <Button
                colorScheme="green"
                onClick={handleAddParty}
                disabled={form.partyName == ""}
              >
                Add
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Flex>
    </>
  );
};

export default Parties;
