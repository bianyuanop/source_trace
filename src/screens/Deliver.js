import { Container, TextField, Button, CircularProgress } from '@mui/material';
import * as React from 'react';
import Navigator from '../components/Navigator';
import { CssBaseline } from '@mui/material';
import { Box } from '@mui/system';

import { deliver } from '../api/ContractApi';

export default function Producer() {
    const [privateKey, setPrivateKey] = React.useState('');
    const [id, setId] = React.useState(0);
    const [loc, setLoc] = React.useState('');
    const [event, setEvent] = React.useState('');
    const [progress, setProgress] = React.useState(0);
    
    return (
    <React.Fragment>
        <CssBaseline />
        <Container maxWidth="md" disableGutters={true}>
            <Box height={window.innerHeight} style={{
                display: 'flex',
                flexDirection: 'column',
            }} >
            <Box marginBottom="5%" style={{
                display: 'flex',
                alignItems: 'center',
            }}>
                Deliver
                <Box marginLeft="2%">
                    <CircularProgress variant="determinate" value={progress} />
                </Box>
            </Box>
            <Box>
                <TextField value={privateKey} margin="normal" label="PrivateKey" onChange={
                    (e) => setPrivateKey(e.target.value)
                } type='password' />
            </Box>
            <TextField value={id} margin="normal" label="id" onChange={
                (e) => setId(e.target.value)
            }/>
            <TextField value={loc} margin="normal" label="loc" onChange={
                (e) => setLoc(e.target.value)
            }
            />
            <TextField value={event} margin="normal" label="event" onChange={
                (e) => setEvent(e.target.value)} 
                multiline={true}
            />

            <Button variant="contained" color="primary" onClick={()=>{
                setProgress(50);
                deliver(privateKey, parseInt(id), loc, event).then((v)=>{
                    if(v) {
                        setProgress(100);
                        alert("Deliver confirmed");
                    }
                    else {
                        setProgress(0);
                        alert("Failed to deliver");
                    }
                })
            }}>
                Summit 
            </Button>



            <Box justifySelf='flex-end' marginTop='auto' boxShadow={5}>
                <Navigator id={2} />
            </Box>
            </Box>

        </Container>
    </React.Fragment>
    )
}
