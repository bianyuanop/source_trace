import { Box } from '@mui/system';
import * as React from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function getTime(timestamp) {
    console.log(timestamp);
    let date = new Date(parseInt(timestamp) * 1000);
    return date.toLocaleString();
}

function parseCommodity(commodityArray) {
    let name = commodityArray[0];
    let timestamp = commodityArray[1];
    let decribe = commodityArray[2];
    let deliverChain = commodityArray[3];

    return {
        name,
        timestamp,
        decribe,
        deliverChain
    }
}

function parseDeliverChain(deliverArray) {
    let deliverChain = [];
    for (let i = 0; i < deliverArray.length; i++) {
        let deliver = deliverArray[i];
        let deliverItem = {
            timestamp: deliver[0],
            loc: deliver[1],
            event: deliver[2],
        }
        deliverChain.push(deliverItem);
    }
    return deliverChain;
}

export default function Commodity(data) {
    data = data.data;
    if(data.length === 0)  return (<div></div>);
    const commodity = parseCommodity(data);
    const deliverChain = parseDeliverChain(commodity.deliverChain);

    return (
        <Box>
            <Box style={{
                display: 'flex',
            }}>
                <div>产品名: </div>
                <div>{commodity.name}</div>
            </Box>
            <Box style={{
                display: 'flex',
            }}>
                <div>生产日期: </div>
                <div>{getTime(commodity.timestamp)}</div>
            </Box>
            <Box style={{
                display: 'flex',
            }}>
                <div>产品描述: </div>
                <div>{commodity.decribe}</div>
            </Box>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 300 }} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell align="left" width={130}>时间</TableCell>
                    <TableCell align="left">地点</TableCell>
                    <TableCell align="left">事件</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {deliverChain.map((row) => (
                    <TableRow
                    key={row.timestamp}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                    <TableCell component="th" scope="row" align="left">
                        {getTime(row.timestamp)}
                    </TableCell>
                    <TableCell align="left">{row.loc}</TableCell>
                    <TableCell align="left">{row.event}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>
        </Box>
    ) 
}