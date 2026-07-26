import {
  Box,
  Card,
  CardContent,
  Divider,
  InputAdornment,
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';

import styles from './Home.module.css';
import { useState } from 'react';

/**
 * Checks whether a string represents a valid number.
 */
const isNumber = (value: string): boolean => {
  return !Number.isNaN(parseFloat(value)) && value !== '';
};

/**
 * Calculates the electricity cost per million tokens.
 *
 * @param power - Power draw in watts
 * @param speed - Inference speed in tokens per second
 * @param electricity - Cost of electricity in $/kWh
 * @returns Cost per million tokens as a raw number
 */
const calculateCostPerMToken = (
  power: number,
  speed: number,
  electricity: number
): number => {
  return (power * electricity * 1_000_000) / (3_600_000 * speed);
};

/**
 * Calculates the electricity cost per million tokens with input validation.
 *
 * @param power - Power draw in watts
 * @param speed - Inference speed in tokens per second
 * @param electricity - Cost of electricity in $/kWh
 * @returns Formatted cost string (e.g., "$0.12 / MTok") or an error message
 */
const safeCalculateCostPerMToken = (
  power: string,
  speed: string,
  electricity: string
): string => {
  if (!isNumber(power) || !isNumber(speed) || !isNumber(electricity)) {
    return 'Input validation error! Please enter valid numbers on the left side.';
  }
  const costPerMToken: number = calculateCostPerMToken(
    parseFloat(power),
    parseFloat(speed),
    parseFloat(electricity)
  );

  return `$${costPerMToken.toFixed(2)} / MTok`;
};

/**
 * Calculates the amortized hardware cost per million tokens.
 *
 * @param hardware - Total hardware cost in dollars
 * @param years - Amortization period in years
 * @param tokensPerDay - Number of tokens generated per day
 * @returns Amortized cost per million tokens as a raw number
 */
const calculateAmortizationCost = (
  hardware: number,
  years: number,
  tokensPerDay: number
): number => {
  return (hardware * 1_000_000) / (tokensPerDay * 365 * years);
};

/**
 * Calculates the amortized hardware cost per million tokens with input validation.
 *
 * @param hardware - Total hardware cost in dollars
 * @param years - Amortization period in years
 * @param tokensPerDay - Number of tokens generated per day
 * @returns Formatted cost string (e.g., "$0.12 / MTok") or an error message
 */
const safeCalculateAmortizationCost = (
  hardware: string,
  years: string,
  tokensPerDay: string
): string => {
  if (!isNumber(hardware) || !isNumber(years) || !isNumber(tokensPerDay)) {
    return 'Input validation error! Please enter valid numbers on the left side.';
  }
  const amortizationCost: number = calculateAmortizationCost(
    parseFloat(hardware),
    parseFloat(years),
    parseFloat(tokensPerDay)
  );

  return `$${amortizationCost.toFixed(2)} / MTok`;
};

/**
 * Calculates the total cost per million tokens (electricity + amortized hardware).
 *
 * @param power - Power draw in watts
 * @param speed - Inference speed in tokens per second
 * @param electricity - Cost of electricity in $/kWh
 * @param hardware - Total hardware cost in dollars
 * @param years - Amortization period in years
 * @param tokensPerDay - Number of tokens generated per day
 * @returns Total cost per million tokens as a raw number
 */
const calculateTotalCost = (
  power: number,
  speed: number,
  electricity: number,
  hardware: number,
  years: number,
  tokensPerDay: number
): number => {
  return (
    calculateCostPerMToken(power, speed, electricity) +
    calculateAmortizationCost(hardware, years, tokensPerDay)
  );
};

/**
 * Calculates the total cost per million tokens with input validation.

 * @param power - Power draw in watts
 * @param speed - Inference speed in tokens per second
 * @param electricity - Cost of electricity in $/kWh
 * @param hardware - Total hardware cost in dollars
 * @param years - Amortization period in years
 * @param tokensPerDay - Number of tokens generated per day
 * @returns Formatted cost string (e.g., "$0.12 / MTok") or an error message
 */
const safeCalculateTotalCost = (
  power: string,
  speed: string,
  electricity: string,
  hardware: string,
  years: string,
  tokensPerDay: string
): string => {
  if (
    !isNumber(power) ||
    !isNumber(speed) ||
    !isNumber(electricity) ||
    !isNumber(hardware) ||
    !isNumber(years) ||
    !isNumber(tokensPerDay)
  ) {
    return 'Input validation error! Please enter valid numbers on the left side.';
  }
  const totalCost: number = calculateTotalCost(
    parseFloat(power),
    parseFloat(speed),
    parseFloat(electricity),
    parseFloat(hardware),
    parseFloat(years),
    parseFloat(tokensPerDay)
  );

  return `$${totalCost.toFixed(2)} / MTok`;
};

export const HomePage = () => {
  const [powerDraw, setPowerDraw] = useState<string>('300');
  const [powerDrawError, setPowerDrawError] = useState<boolean>(false);
  const [powerCost, setPowerCost] = useState<string>('0.12');
  const [powerCostError, setPowerCostError] = useState<boolean>(false);
  const [inferenceSpeed, setInferenceSpeed] = useState<string>('120');
  const [inferenceSpeedError, setInferenceSpeedError] =
    useState<boolean>(false);
  const [hardwareCost, setHardwareCost] = useState<string>('600');
  const [hardwareCostError, setHardwareCostError] = useState<boolean>(false);
  const [tokenUsagePerDay, setTokenUsagePerDay] = useState<string>('400000');
  const [tokenUsagePerDayError, setTokenUsagePerDayError] =
    useState<boolean>(false);
  const [amortizationLength, setAmortizationLength] = useState<string>('2');
  const [amortizationLengthError, setAmortizationLengthError] =
    useState<boolean>(false);

  return (
    <>
      <Typography variant="h3">Home AI Rig Cost Calculator</Typography>
      <Divider sx={{ marginBottom: '8px', marginTop: '8px' }} />
      <Box className={styles.rootBox}>
        <Box className={styles.childBox}>
          <Card>
            <CardContent>
              <Typography variant="h4">Power Usage</Typography>
              <Typography variant="body1">
                Enter your rig's estimated power usage and cost of electricity
                during inference.
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
                    100% for GPU-bound inference.
                  </Typography>
                </li>
              </ul>
              <TextField
                variant="outlined"
                label="Total Power Draw (W)"
                value={powerDraw}
                onChange={(event) => {
                  setPowerDraw(event.target.value);
                  setPowerDrawError(!isNumber(event.target.value));
                }}
                error={powerDrawError}
                helperText={powerDrawError ? 'Enter a valid number' : ''}
                sx={{ marginTop: '12px' }}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">W</InputAdornment>
                    ),
                  },
                }}
              />
              <TextField
                variant="outlined"
                label="Cost of Electricity ($/kWh)"
                value={powerCost}
                onChange={(event) => {
                  setPowerCost(event.target.value);
                  setPowerCostError(!isNumber(event.target.value));
                }}
                error={powerCostError}
                helperText={powerCostError ? 'Enter a valid number' : ''}
                sx={{ marginTop: '12px' }}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">$/kWh</InputAdornment>
                    ),
                  },
                }}
              />
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <Typography variant="h4">Model Performance</Typography>
              <Typography variant="body1">
                Enter the token generation speed of your hardware for the model
                you want to run, in tokens per second.
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
              <TextField
                variant="outlined"
                label="Inference Speed (tok/s)"
                value={inferenceSpeed}
                onChange={(event) => {
                  setInferenceSpeed(event.target.value);
                  setInferenceSpeedError(!isNumber(event.target.value));
                }}
                error={inferenceSpeedError}
                helperText={inferenceSpeedError ? 'Enter a valid number' : ''}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">tok/s</InputAdornment>
                    ),
                  },
                }}
              />
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <Typography variant="h4">Amortization Settings</Typography>
              <Typography variant="body1">
                Use this section if you want to factor in the hardware cost of
                your local AI rig and amortize it over a certain period of time.
              </Typography>
              <TextField
                variant="outlined"
                label="Cost of components"
                value={hardwareCost}
                onChange={(event) => {
                  setHardwareCost(event.target.value);
                  setHardwareCostError(!isNumber(event.target.value));
                }}
                error={hardwareCostError}
                helperText={hardwareCostError ? 'Enter a valid number' : ''}
                sx={{ marginTop: '12px' }}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  },
                }}
              />
              <TextField
                variant="outlined"
                label="Token usage per day"
                value={tokenUsagePerDay}
                onChange={(event) => {
                  setTokenUsagePerDay(event.target.value);
                  setTokenUsagePerDayError(!isNumber(event.target.value));
                }}
                error={tokenUsagePerDayError}
                helperText={tokenUsagePerDayError ? 'Enter a valid number' : ''}
                sx={{ marginTop: '12px' }}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">tok</InputAdornment>
                    ),
                  },
                }}
              />
              <TextField
                variant="outlined"
                label="Amortization Length (years)"
                value={amortizationLength}
                onChange={(event) => {
                  setAmortizationLength(event.target.value);
                  setAmortizationLengthError(!isNumber(event.target.value));
                }}
                error={amortizationLengthError}
                helperText={
                  amortizationLengthError ? 'Enter a valid number' : ''
                }
                sx={{ marginTop: '12px' }}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">years</InputAdornment>
                    ),
                  },
                }}
              />
            </CardContent>
          </Card>
        </Box>
        <Box className={styles.childBox}>
          <Card>
            <CardContent>
              <Typography variant="h4">Per Token Cost Breakdown</Typography>
              <Typography variant="body1">
                The electricity-only cost of running your AI compute rig per
                million tokens. Use this value if you already owned the hardware
                or only care about the running costs.
              </Typography>
              <Typography variant="h5" color="secondary">
                {safeCalculateCostPerMToken(
                  powerDraw,
                  inferenceSpeed,
                  powerCost
                )}
              </Typography>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <Typography variant="h4">
                Total Cost of Ownership Breakdown
              </Typography>
              <Typography variant="body1">
                The total cost of ownership (TCO) of purchasing and running your
                AI compute rig, amortized over your chosen number of years, per
                million tokens. Use this value if you want to spread the
                one-time purchase cost of your rig over time.
              </Typography>
              <Typography variant="h5" color="secondary">
                {safeCalculateAmortizationCost(
                  hardwareCost,
                  amortizationLength,
                  tokenUsagePerDay
                )}
              </Typography>
              <Typography variant="h5" color="secondary">
                {safeCalculateTotalCost(
                  powerDraw,
                  inferenceSpeed,
                  powerCost,
                  hardwareCost,
                  amortizationLength,
                  tokenUsagePerDay
                )}
              </Typography>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <Typography variant="h4">
                Cost Comparison with Frontier Models
              </Typography>
              <Typography variant="body1">
                How does your AI Rig compare to paying for frontier models from{' '}
                <Link
                  href="https://developers.openai.com/api/docs/pricing"
                  target="_blank"
                >
                  OpenAI
                </Link>
                ,{' '}
                <Link
                  href="https://platform.claude.com/docs/en/about-claude/pricing"
                  target="_blank"
                >
                  Anthropic
                </Link>
                ,{' '}
                <Link
                  href="https://ai.google.dev/gemini-api/docs/pricing"
                  target="_blank"
                >
                  Google
                </Link>
                , etc.?
              </Typography>
              <Typography variant="h6">
                Typical output cost for different tiers per million tokens (as
                of 2026)
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell className={styles.tableHeader}>Tier</TableCell>
                      <TableCell className={styles.tableHeader}>
                        Examples
                      </TableCell>
                      <TableCell className={styles.tableHeader}>
                        Cost Range (per MTok)
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>Small</TableCell>
                      <TableCell>
                        Claude Haiku, GPT mini, Gemini Flash-Lite
                      </TableCell>
                      <TableCell>$1 - $5</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Medium</TableCell>
                      <TableCell>
                        Claude Sonnet, GPT Luna, Gemini Flash
                      </TableCell>
                      <TableCell>$9 - $15</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Large</TableCell>
                      <TableCell>Claude Opus, GPT Terra, Gemini Pro</TableCell>
                      <TableCell>$18 - $25</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Flagship</TableCell>
                      <TableCell>Claude Fable, GPT Sol</TableCell>
                      <TableCell>$45 - $50</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </>
  );
};

export default HomePage;
