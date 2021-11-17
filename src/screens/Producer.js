import { Container, TextField, Button, CircularProgress, IconButton } from '@mui/material';
import * as React from 'react';
import Navigator from '../components/Navigator';
import { CssBaseline } from '@mui/material';
import { Box } from '@mui/system';
import { Lock, LockOpen } from '@mui/icons-material';

import { produce } from '../api/ContractApi';


export default function Producer() {
    const [privateKey, setPrivateKey] = React.useState('');
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [loc, setLoc] = React.useState('');
    const [event, setEvent] = React.useState('');
    const [progress, setProgress] = React.useState(0);
    const [lock, setLock] = React.useState(false);
    
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
                <TextField value={privateKey} margin="normal" label="Privatekey" onChange={
                    (e) => setPrivateKey(e.target.value)
                } type='password' />
            </Box>
            <TextField value={name} margin="normal" label="name" onChange={
                (e) => setName(e.target.value)
            }/>
            <TextField value={loc} margin="normal" label="loc" onChange={
                (e) => setLoc(e.target.value)
            }/>
            <TextField value={description} margin="normal" label="describe" onChange={
                (e) => setDescription(e.target.value)
            }
            multiline={true}
            />
            <TextField value={event} margin="normal" label="event" onChange={
                (e) => setEvent(e.target.value)} 
                multiline={true}
            />

            <Button variant="contained" color="primary" onClick={()=>{
                setProgress(50);
                produce(privateKey, name, description, loc, event).then((v)=>{
                    if(v) setProgress(100);
                    else {
                        setProgress(0);
                        alert("Failed to deliver");
                    }
                }).catch(e=>{
                    alert("Error may sufficient privileges");
                    setProgress(0);
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
