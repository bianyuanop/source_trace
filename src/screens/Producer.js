import { Container, TextField, Button, CircularProgress, IconButton, Avatar } from '@mui/material';
import * as React from 'react';
import Navigator from '../components/Navigator';
import { CssBaseline } from '@mui/material';
import { Box } from '@mui/system';
import { Snackbar } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

import { produce } from '../api/ContractApi';
import { copyTextToClipboard } from '../util/util';


export default function Producer() {
    const [privateKey, setPrivateKey] = React.useState('');
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
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
                copyTextToClipboard(errorMsg);
                setCopy(true);
            }}>
                <ContentCopyIcon color='white' />
            </IconButton>
        </React.Fragment>
    );

    const successAction = (
        <React.Fragment>
            <IconButton onClick={()=>{
                copyTextToClipboard(transaction);
                setCopy(true);
            }}>
                <ContentCopyIcon color='white' />
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
                backgroundColor: 'rgb(244 244 244)'
            }} 
            >
            <Box marginBottom="5%" style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: 'white'
            }}
            boxShadow={3}
            >
                <Avatar src='/manufacture.png' />
                <Box marginLeft={2}>
                    ????????????
                </Box>
                <Box marginLeft="2%">
                    <CircularProgress variant="determinate" value={progress} />
                </Box>
            </Box>
            <Box>
                <TextField value={privateKey} margin="normal" label="??????" onChange={
                    (e) => setPrivateKey(e.target.value)
                } type='password' />
            </Box>
            <TextField value={name} margin="normal" label="?????????" onChange={
                (e) => setName(e.target.value)
            }/>
            <TextField value={loc} margin="normal" label="??????" onChange={
                (e) => setLoc(e.target.value)
            }/>
            <TextField value={description} margin="normal" label="??????" onChange={
                (e) => setDescription(e.target.value)
            }
            multiline={true}
            />
            <TextField value={event} margin="normal" label="??????" onChange={
                (e) => setEvent(e.target.value)} 
                multiline={true}
            />

            <Button variant="contained" color="primary" onClick={()=>{
                setProgress(50);
                produce(privateKey, name, description, loc, event).then((v)=>{
                    setProgress(100);
                    if(v.success) {
                        setSuccess(true);
                        setTransaction(v.id);
                        console.log(v);
                    } else {
                        setError(true);
                        setErrorMsg("??????????????????????????????gas???????????????????????????");
                        console.log(v);
                    }
                }).catch(e=>{
                    setError(true);
                    console.log(e);
                    setProgress(0);

                    setErrorMsg("??????:" + String(e));
                })
            }}>
                ??????
            </Button>



            <Box justifySelf='flex-end' marginTop='auto' boxShadow={5}>
                <Navigator id={1} />
            </Box>
            </Box>

            <Snackbar open={error} autoHideDuration={5000} message={ "??????: "+ errorMsg.substr(0, 5) + '...'} action={failAction} />
            <Snackbar open={success} autoHideDuration={5000} message={"??????id(????????????????????????):"+ transaction.substr(0, 5) + '...'} action={successAction} />
            <Snackbar open={copy} autoHideDuration={5000} message={"?????????"} onClick={()=>{
                setCopy(false);
            }} />

        </Container>
    </React.Fragment>
    )
}
