import { Container, TextField, Button, CircularProgress } from '@mui/material';
import * as React from 'react';
import Navigator from '../components/Navigator';
import { CssBaseline } from '@mui/material';
import { Box } from '@mui/system';
import { Snackbar } from '@mui/material';
import { deliver } from '../api/ContractApi';
import { IconButton } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

import { copyTextToClipboard } from '../util/util';

export default function Producer() {
    const [privateKey, setPrivateKey] = React.useState('');
    const [id, setId] = React.useState(0);
    const [loc, setLoc] = React.useState('');
    const [event, setEvent] = React.useState('');
    const [progress, setProgress] = React.useState(0);

    const [error, setError] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const [errorMsg, setErrorMsg] = React.useState('');
    const [transaction, setTransaction] = React.useState('');

    const [copy, setCopy] = React.useState(false);

    const failAction = (
        <React.Fragment>
            <IconButton onClick={()=>{
                // navigator.clipboard.writeText(error);                
                copyTextToClipboard(error);
                setCopy(true);
            }}>
                <ContentCopyIcon />
            </IconButton>
        </React.Fragment>
    );

    const successAction = (
        <React.Fragment>
            <IconButton onClick={()=>{
                // navigator.clipboard.writeText(transaction);                
                copyTextToClipboard(transaction);
                setCopy(true);
            }}>
                <ContentCopyIcon />
            </IconButton>
        </React.Fragment>
    );
    
    return (
    <React.Fragment>
        <CssBaseline />
        <Container maxWidth="md" disableGutters={true}>
            <Box height={window.innerHeight} style={{
                display: 'flex',
                flexDirection: 'column',
            }} 
            marginLeft={2}
            marginRight={2}
            >
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
                    if(v.success) {
                        setProgress(100);
                        setSuccess(true);
                        setTransaction(v.transaction);
                    }
                    else {
                        setProgress(0);
                        setError(true);
                        setErrorMsg('sent but error.')
                    }
                }).catch(e=>{
                    setErrorMsg(String(e));
                })
            }}>
                Summit 
            </Button>

            <Box justifySelf='flex-end' marginTop='auto' boxShadow={5}>
                <Navigator id={2} />
            </Box>
            </Box>

            <Snackbar open={error} autoHideDuration={5000} message={ "Error: "+ errorMsg.substr(0, 5) + '...'} action={failAction} />
            <Snackbar open={success} autoHideDuration={5000} message={"TransactionHash: "+ transaction.substr(0, 5) + '...'} action={successAction} />
            <Snackbar open={copy} autoHideDuration={5000} message={"Copied"} onClick={()=>{
                setCopy(false);
            }} />

        </Container>
    </React.Fragment>
    )
}
