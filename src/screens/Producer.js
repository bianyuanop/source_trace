import { Container, TextField, Button, CircularProgress, IconButton } from '@mui/material';
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
            }} 
            marginLeft={2}
            marginRight={2}
            >
            <Box marginBottom="5%" style={{
                display: 'flex',
                alignItems: 'center',
            }}>
                生产标记
                <Box marginLeft="2%">
                    <CircularProgress variant="determinate" value={progress} />
                </Box>
            </Box>
            <Box>
                <TextField value={privateKey} margin="normal" label="私钥" onChange={
                    (e) => setPrivateKey(e.target.value)
                } type='password' />
            </Box>
            <TextField value={name} margin="normal" label="产品名" onChange={
                (e) => setName(e.target.value)
            }/>
            <TextField value={loc} margin="normal" label="地址" onChange={
                (e) => setLoc(e.target.value)
            }/>
            <TextField value={description} margin="normal" label="描述" onChange={
                (e) => setDescription(e.target.value)
            }
            multiline={true}
            />
            <TextField value={event} margin="normal" label="事件" onChange={
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
                        setErrorMsg("交易已发送、可能账户gas不足，请联系管理员");
                        console.log(v);
                    }
                }).catch(e=>{
                    setError(true);
                    console.log(e);
                    setProgress(0);

                    setErrorMsg("出错:" + String(e));
                })
            }}>
                Summit 
            </Button>



            <Box justifySelf='flex-end' marginTop='auto' boxShadow={5}>
                <Navigator id={1} />
            </Box>
            </Box>

            <Snackbar open={error} autoHideDuration={5000} message={ "出错: "+ errorMsg.substr(0, 5) + '...'} action={failAction} />
            <Snackbar open={success} autoHideDuration={5000} message={"产品id(需要交付给运单员):"+ transaction.substr(0, 5) + '...'} action={successAction} />
            <Snackbar open={copy} autoHideDuration={5000} message={"已复制"} onClick={()=>{
                setCopy(false);
            }} />

        </Container>
    </React.Fragment>
    )
}
