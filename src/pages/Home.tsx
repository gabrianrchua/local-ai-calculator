import {
  Box,
  Card,
  CardContent,
  Divider,
  Link,
  Typography,
} from '@mui/material';

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
              <Typography variant="body1">
                Enter your rig's estimated power usage during inference.
              </Typography>
              <ul>
                <li>
                  <Typography variant="body1">
                    If you have a real-world value (e.g., by using a{' '}
                    <i>Kill A Watt</i>&reg; device), use that.
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1">
                    Otherwise, you can get a good estimate by plugging your
                    parts list into{' '}
                    <Link href="https://pcpartpicker.com/" target="_blank">
                      PCPartPicker
                    </Link>{' '}
                    and use the "Estimated Wattage." Note that real-world power
                    draw is typically lower because CPU power draw is not at
                    100% for GPU inference.
                  </Typography>
                </li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <Typography variant="h5">Model Performance</Typography>
              <Typography variant="body1">
                Enter the performance of your hardware for the model you want to
                run, in tokens per second.
              </Typography>
              <ul>
                <li>
                  <Typography variant="body1">
                    If you have a real-world value (e.g., by renting the same
                    GPU or from benchmarks), use that.
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1">
                    Otherwise, you can get a good estimate by plugging your GPU
                    and desired model into{' '}
                    <Link href="https://willitrunai.com/" target="_blank">
                      Will It Run AI
                    </Link>
                    , click "Full details," apply your settings (e.g.
                    quantization), and look for the estimated decode speed ("N
                    tok/s decode")
                  </Typography>
                </li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <Typography variant="h5">Amortization Settings</Typography>
              <Typography variant="body1">
                Use this section if you want to factor in the hardware cost of
                your local AI rig and amortize it over a certain period of time.
              </Typography>
            </CardContent>
          </Card>
        </Box>
        <Box className={styles.childBox}>
          <Card>
            <CardContent>
              <Typography variant="h5">Token Cost Breakdown</Typography>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <Typography variant="h5">
                Total Cost of Ownership Breakdown
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </>
  );
};

export default HomePage;
