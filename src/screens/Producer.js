import { Container } from '@mui/material';
import * as React from 'react';
import Navigator from '../components/Navigator';
import { CssBaseline } from '@mui/material';
import { Box } from '@mui/system';

export default function Producer() {
    return (
    <React.Fragment>
        <CssBaseline />
        <Container maxWidth="md" disableGutters={true}>
            <Box height={window.innerHeight} style={{
                display: 'flex',
                flexDirection: 'column',
            }}>
                <Box>Producer</Box>
                <Box justifySelf='flex-end' marginTop='auto' boxShadow={5}>
                    <Navigator id={1} />
                </Box>
            </Box>

        </Container>
    </React.Fragment>
    )
}
