import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';
import { getSalePurchasebyPartyAction } from '../../../../Redux/SalePurchaseBYParty/salepurchasebyparty.action';
import Company_name from '../Company_name/Company_name';
import Slidebar from '../Slidebar/Slidebar';

const SalePurchaseByPartyReport = () => {
    const dispatch = useDispatch();
    const { firmId } = useSelector((store) => store.FirmRegistration);
    const { getAllSalePurchasePartyData } = useSelector((store) => store.salepurchasebypartyReducer);
    const userDetails = JSON.parse(sessionStorage.getItem("companyDetails")) || null;
    const token = userDetails?.token;

    useEffect(() => {
        dispatch(getSalePurchasebyPartyAction(token, firmId));
    }, [firmId, token]);

    if (!getAllSalePurchasePartyData) {
        // Handle loading state or display a message if data is still being fetched
        return <div>Loading...</div>;
    }

    return (
        <>
            <Company_name company_name="Company Name" />
            <Slidebar />
            <Table>
                <Thead>
                    <Tr>
                        <Th>Party Name</Th>
                        <Th>Purchase Amount</Th>
                        <Th>Sale Amount</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {getAllSalePurchasePartyData.map((party, index) => (
                        <Tr key={index}>
                            <Td>{party.partyName}</Td>
                            <Td>{party.purchaseAmount}</Td>
                            <Td>{party.saleAmount}</Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </>
    );
}

export default SalePurchaseByPartyReport;