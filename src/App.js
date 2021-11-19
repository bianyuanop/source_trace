
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { TextField} from '@mui/material';
import { Button } from '@mui/material';
import Commodity from './components/Commodity';
import { Avatar, Link } from '@mui/material';

import Navigator from './components/Navigator';

import { queryCommodity } from './api/ContractApi';

export default function App() {
  const [commodyId, setCommodyId] = React.useState(0);
  const [commody, setCommody] = React.useState([]);

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="md" disableGutters={true}>
        <Box 
        height={window.innerHeight}
         style={{
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'rgb(244 244 244)'
        }}
        >
          <Box height='10%'
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white'
          }}
          boxShadow={1}
          >
            <Avatar src='/company.svg' sx={{ width: 50, height: 50}} />
            <Link href="https://confluxscan.io/address/cfx:acf04ah5ja3zc6nkcfv5pu2x693ty4shmpc7cwemjr?tab=contract-viewer">
              卡匿奇溯源系统
            </Link>
          </Box> 

          <Box style={{
            display: 'flex',
            justifyContent: 'center',
          }}
          marginTop='5%'
          marginBottom='5%'
          >
            <TextField id="outlined-basic" label="商品id" value={commodyId} onChange={
              (v) => {
                setCommodyId(v.target.value);
              }
            } >
            </TextField>
            <Button onClick={()=>{
              queryCommodity(commodyId).then((result)=>{
                console.log(result);
                setCommody(result);
              }).catch(e=>{
                console.log(e);
              });
            }}>查询</Button>
          </Box>

          <Box marginTop="5%" paddingLeft="5%" paddingRight="5%" style={{
            overflowY: 'scroll',
          }}>
            <Commodity data={commody}></Commodity>
          </Box>

          <Box justifySelf='flex-end' marginTop='auto' boxShadow={5}>
            <Navigator id={0} />
          </Box>
        </Box>
        
        
      </Container>
    </React.Fragment>
  );
}