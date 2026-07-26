import { Box, Card, CardContent, Divider, Typography } from '@mui/material';

import styles from './Home.module.css';

export const HomePage = () => {
  return (
    <>
      <Typography variant="h3">Home AI Rig Cost Calculator</Typography>
      <Divider sx={{ marginBottom: '8px', marginTop: '8px' }} />
      <Box className={styles.rootBox}>
        <Box className={styles.childBox}>
          <Card>
            <CardContent>
              <Typography variant="h5">Power Usage</Typography>
            </CardContent>
          </Card>
        </Box>
        <Box className={styles.childBox}>
          <Card>
            <CardContent>
              <Typography variant="h5">Cost Breakdown</Typography>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </>
  );
};

export default HomePage;
