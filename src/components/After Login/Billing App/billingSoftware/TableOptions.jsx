import React from 'react';
import { Button, Flex } from '@chakra-ui/react';

const TableOptions = () => {
  return (
    <Flex alignItems="center" justifyContent="space-between">
      <Button size="sm" colorScheme="gray" variant="none">
        Line Count 23
      </Button>
      <Button size="sm" colorScheme="gray" variant="outline">
        Add New Line
      </Button>
      <Button size="sm" colorScheme="gray" variant="outline">
        Add Item
      </Button>
      <Button size="sm" colorScheme="gray" variant="outline">
        Update Bill
      </Button>
      <Button size="sm" colorScheme="gray" variant="outline">
        Delete Item
      </Button>
    </Flex>
  );
}

export default TableOptions;
