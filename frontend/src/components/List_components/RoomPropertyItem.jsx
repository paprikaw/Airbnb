import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { Typography, Button } from '@mui/material';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const theme = createTheme({ palette: { mode: 'light' } });
export default function RoomPropertyItem ({ type = 'None', nBeds = '0', idx = -1, setRoomList = null }) {
  const handleCancel = () => {
    console.log('here');
    setRoomList((element) => element.filter((item, i) => item.idx !== idx))
  }
  return (
    <Grid item xs={12}>
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            p: 2,
            bgcolor: 'background.default',
            display: 'grid',
            gridTemplateColumns: { md: '1fr 1fr' },
            gap: 2,
          }}
        >
          <Item elevation={2}>
            <Grid container >
              <Grid item container xs={12} sx={{ alignItems: 'center' }}>
                <Grid item xs={12}>
                  <Typography id='type'>
                    {`PropertyType: ${type}`}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography id='nBeds'>
                    {`Beds: ${nBeds}`}
                  </Typography>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Button sx={{ paddingLeft: 'auto' }} onClick={handleCancel}>Cancel</Button>
              </Grid>
            </Grid>
          </Item>
        </Box>
      </ThemeProvider>
    </Grid>
  );
}
