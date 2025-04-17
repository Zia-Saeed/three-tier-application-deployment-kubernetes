import React from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { 
  TextField, 
  Button, 
  Typography, 
  Paper, 
  InputAdornment,
  IconButton,
  FormControl,
  InputLabel,
  OutlinedInput,
  FormHelperText
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { 
  Visibility, 
  VisibilityOff,
  Person,
  Email,
  Lock,
  Cake
} from '@mui/icons-material';
import api from '../api';

interface FormData {
  username: string;
  email: string;
  password: string;
  password2: string;
  first_name: string;
  last_name: string;
  bio: string;
  birth_date: string;
}

const RegistrationForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm<FormData>();
  const [showPassword, setShowPassword] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitError, setSubmitError] = React.useState('');
  const [submitSuccess, setSubmitSuccess] = React.useState(false);

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitError('');
    try {
      await api.post('register/', data);
      setSubmitSuccess(true);
    } catch (error) {
      setSubmitError('Registration failed. Please try again.');
      console.error('Registration error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  if (submitSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-center min-h-screen"
      >
        <Paper className="p-8 max-w-md w-full text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <svg
              className="w-16 h-16 mx-auto text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </motion.div>
          <Typography variant="h5" className="mt-4 mb-2 font-bold text-gray-800">
            Registration Successful!
          </Typography>
          <Typography variant="body1" className="text-gray-600">
            Thank you for registering. You can now log in to your account.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            className="mt-6"
            href="/login"
          >
            Go to Login
          </Button>
        </Paper>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-50"
    >
      <Paper className="p-8 max-w-md w-full shadow-xl rounded-2xl">
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Typography variant="h4" className="text-center mb-2 font-bold text-primary-main">
            Create Account
          </Typography>
          <Typography variant="body2" className="text-center mb-6 text-gray-500">
            Join our community today
          </Typography>
        </motion.div>

        {submitError && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg"
          >
            {submitError}
          </motion.div>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <TextField
                fullWidth
                label="First Name"
                variant="outlined"
                {...register('first_name')}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person className="text-gray-400" />
                    </InputAdornment>
                  ),
                }}
                className="mb-4"
              />
            </div>
            <div>
              <TextField
                fullWidth
                label="Last Name"
                variant="outlined"
                {...register('last_name')}
                className="mb-4"
              />
            </div>
          </div>

          <TextField
            fullWidth
            label="Username"
            variant="outlined"
            {...register('username', { required: 'Username is required' })}
            error={!!errors.username}
            helperText={errors.username?.message}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Person className="text-gray-400" />
                </InputAdornment>
              ),
            }}
            className="mb-4"
          />

          <TextField
            fullWidth
            label="Email"
            type="email"
            variant="outlined"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address',
              },
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email className="text-gray-400" />
                </InputAdornment>
              ),
            }}
            className="mb-4"
          />

          <FormControl fullWidth variant="outlined" className="mb-4">
            <InputLabel htmlFor="password">Password</InputLabel>
            <OutlinedInput
              id="password"
              type={showPassword ? 'text' : 'password'}
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 8,
                  message: 'Password must be at least 8 characters',
                },
              })}
              error={!!errors.password}
              startAdornment={
                <InputAdornment position="start">
                  <Lock className="text-gray-400" />
                </InputAdornment>
              }
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
            {errors.password && (
              <FormHelperText error>{errors.password.message}</FormHelperText>
            )}
          </FormControl>

          <FormControl fullWidth variant="outlined" className="mb-4">
            <InputLabel htmlFor="password2">Confirm Password</InputLabel>
            <OutlinedInput
              id="password2"
              type={showPassword ? 'text' : 'password'}
              {...register('password2', {
                required: 'Please confirm your password',
                validate: (value) =>
                  value === watch('password') || 'Passwords do not match',
              })}
              error={!!errors.password2}
              startAdornment={
                <InputAdornment position="start">
                  <Lock className="text-gray-400" />
                </InputAdornment>
              }
              label="Confirm Password"
            />
            {errors.password2 && (
              <FormHelperText error>{errors.password2.message}</FormHelperText>
            )}
          </FormControl>

          <TextField
            fullWidth
            label="Bio"
            variant="outlined"
            multiline
            rows={3}
            {...register('bio')}
            className="mb-4"
          />

          <TextField
            fullWidth
            label="Birth Date"
            type="date"
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            {...register('birth_date')}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Cake className="text-gray-400" />
                </InputAdornment>
              ),
            }}
            className="mb-6"
          />

          <motion.div
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              disabled={isSubmitting}
              className="py-3 rounded-lg font-bold shadow-lg"
            >
              {isSubmitting ? 'Registering...' : 'Register'}
            </Button>
          </motion.div>
        </form>

        <Typography variant="body2" className="mt-4 text-center text-gray-500">
          Already have an account?{' '}
          <a href="/login" className="text-primary-main font-medium hover:underline">
            Sign in
          </a>
        </Typography>
      </Paper>
    </motion.div>
  );
};

export default RegistrationForm;