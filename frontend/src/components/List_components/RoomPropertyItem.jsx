import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { Typography, Button } from '@mui/material';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { StoreContext } from '../../utils/store';
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: 60,
  lineHeight: '60px',
}));

const theme = createTheme({ palette: { mode: 'light' } });
export default function RoomPropertyItem ({ type = 'None', nBeds = '0', idx = -1 }) {
  const context = React.useContext(StoreContext);
  const setRoomList = context.roomList[1];
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
              <Grid item container xs={6} sx={{ alignItems: 'center' }}>
                <Grid item xs={12}>
                  <Typography>
                    {`PropertyType: ${type}`}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography>
                    {`Beds: ${nBeds}`}
                  </Typography>
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <Button sx={{ paddingLeft: 'auto' }} onClick={handleCancel}>Cancel</Button>
              </Grid>
            </Grid>
          </Item>
        </Box>
      </ThemeProvider>
    </Grid>
  );
}
