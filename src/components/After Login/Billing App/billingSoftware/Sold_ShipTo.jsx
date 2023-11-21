import React from 'react';
import { Box, Flex, Heading, Select, Input, Textarea } from '@chakra-ui/react';

const Sold_ShipTo = ({ formData, setFormData ,handleInputChange }) => {
  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({ ...formData, [name]: value });
  // };

  return (
    <Flex>
      {/* Box 1 */}
      <Box flex="1" p="2">
        <Flex alignItems="center" mb="1" justifyContent="space-between" height='50px'>
          <Heading size="xs" marginRight="1">
            Sold To:
          </Heading>
          <Select placeholder="Select customer" width="70%" fontSize="sm" size='sm'
            mt='-10px'
          />
        </Flex>
        <Input
          name="soldToCustomerName"
          placeholder="Customer Name"
          mb="1"
          size="sm"
          value={formData?.soldToCustomerName}
          onChange={(e)=>handleInputChange(e)}
        />
        <Textarea
          name="soldToCustomerAddress"
          placeholder="Address"
          size="sm"
          value={formData?.soldToCustomerAddress}
          onChange={(e)=>handleInputChange(e)}
        />
      </Box>

      {/* Box 2 */}
      <Box flex="1" p="2" marginLeft="4">
        <Flex alignItems="center" mb="1" height='50px'>
          <Heading size="xs" marginRight="1">
            Ship To:
          </Heading>
        </Flex>
        <Input
          name="shipToCustomerName"
          placeholder="Name"
          mb="1"
          size="sm"
          value={formData?.shipToCustomerName}
          onChange={(e)=>handleInputChange(e)}
        />
        <Textarea
          name="shipToCustomerAddress"
          placeholder="Address"
          size="sm"
          value={formData?.shipToCustomerAddress}
          onChange={(e)=>handleInputChange(e)}/>
                </Box>
    </Flex>
  );
}

export default Sold_ShipTo;
