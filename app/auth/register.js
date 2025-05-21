import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '../../context/ThemeContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { EMAIL_REGEX, PHONE_REGEX } from '../../constants/validation';
import { sendOTP, verifyOTPAndRegister } from '../../services/authService';

export default function RegisterScreen() {
  const router = useRouter();
  const { theme, colors } = useTheme();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    age: '',
    otp: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear the error for this field when user types
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateStep1 = () => {
    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = 'Full name is required';
    
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!EMAIL_REGEX.test(formData.email)) newErrors.email = 'Please enter a valid email';
    
    if (!formData.phone) newErrors.phone = 'Phone number is required';
    else if (!PHONE_REGEX.test(formData.phone)) newErrors.phone = 'Please enter a valid phone number';
    
    if (!formData.age) newErrors.age = 'Age is required';
    else if (isNaN(formData.age) || parseInt(formData.age) < 18) newErrors.age = 'You must be at least 18 years old';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    if (!formData.otp) newErrors.otp = 'OTP is required';
    else if (formData.otp.length !== 6) newErrors.otp = 'OTP must be 6 digits';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = () => {
    const newErrors = {};
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    
    if (!formData.confirmPassword) newErrors.confirmPassword = 'Confirm password is required';
    else if (formData.confirmPassword !== formData.password) newErrors.confirmPassword = 'Passwords do not match';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const goToNextStep = async () => {
    try {
      if (currentStep === 1 && validateStep1()) {
        // Send OTP to the user's email
        const response = await sendOTP(formData.email);
        Alert.alert('Success', response.message || 'OTP sent successfully to your email');
        setCurrentStep(2);
      } else if (currentStep === 2 && validateStep2()) {
        // OTP verification is successful, move to password creation
        setCurrentStep(3);
      } else if (currentStep === 3 && validateStep3()) {
        // Complete registration with OTP verification and user data
        const userData = {
          name: formData.fullName,
          email: formData.email,
          mobile: formData.phone,
          age: parseInt(formData.age),
          password: formData.password
        };
        
        const response = await verifyOTPAndRegister(formData.email, formData.otp, userData);
        
        Alert.alert('Success', response.message || 'Registration successful!');
        
        // Navigate to home page after successful registration
        router.replace('/(tabs)');
      }
    } catch (error) {
      Alert.alert('Error', error.message || 'Something went wrong. Please try again.');
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      router.back();
    }
  };

  const renderStep1 = () => (
    <>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Full Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your full name"
          placeholderTextColor={colors.placeholder}
          value={formData.fullName}
          onChangeText={(text) => handleChange('fullName', text)}
        />
        {errors.fullName && <Text style={styles.errorText}>{errors.fullName}</Text>}
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          placeholderTextColor={colors.placeholder}
          keyboardType="email-address"
          autoCapitalize="none"
          value={formData.email}
          onChangeText={(text) => handleChange('email', text)}
        />
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Phone Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your phone number"
          placeholderTextColor={colors.placeholder}
          keyboardType="phone-pad"
          value={formData.phone}
          onChangeText={(text) => handleChange('phone', text)}
        />
        {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Age</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your age"
          placeholderTextColor={colors.placeholder}
          keyboardType="numeric"
          value={formData.age}
          onChangeText={(text) => handleChange('age', text)}
        />
        {errors.age && <Text style={styles.errorText}>{errors.age}</Text>}
      </View>
    </>
  );

  const renderStep2 = () => (
    <>
      <View style={styles.otpDescriptionContainer}>
        <Text style={styles.otpDescription}>
          We've sent a verification code to your email address. Please enter the 6-digit code below.
        </Text>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Verification Code</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter 6-digit code"
          placeholderTextColor={colors.placeholder}
          keyboardType="numeric"
          maxLength={6}
          value={formData.otp}
          onChangeText={(text) => handleChange('otp', text)}
        />
        {errors.otp && <Text style={styles.errorText}>{errors.otp}</Text>}
      </View>

      <TouchableOpacity 
        style={styles.resendContainer}
        onPress={async () => {
          try {
            const response = await sendOTP(formData.email);
            Alert.alert('Success', response.message || 'OTP resent successfully to your email');
          } catch (error) {
            Alert.alert('Error', error.message || 'Failed to resend OTP. Please try again.');
          }
        }}
      >
        <Text style={styles.resendText}>Didn't receive a code? </Text>
        <Text style={styles.resendLink}>Resend</Text>
      </TouchableOpacity>
    </>
  );

  const renderStep3 = () => (
    <>
      <View style={styles.passwordDescriptionContainer}>
        <Text style={styles.passwordDescription}>
          Great! Now create a secure password for your account.
        </Text>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Password</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Create a password"
            placeholderTextColor={colors.placeholder}
            secureTextEntry={!showPassword}
            value={formData.password}
            onChangeText={(text) => handleChange('password', text)}
          />
          <TouchableOpacity 
            style={styles.passwordToggle}
            onPress={() => setShowPassword(!showPassword)}
          >
            <Ionicons 
              name={showPassword ? 'eye-off' : 'eye'} 
              size={24} 
              color={colors.text} 
            />
          </TouchableOpacity>
        </View>
        {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Confirm Password</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Confirm your password"
            placeholderTextColor={colors.placeholder}
            secureTextEntry={!showPassword}
            value={formData.confirmPassword}
            onChangeText={(text) => handleChange('confirmPassword', text)}
          />
        </View>
        {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}
      </View>

      <View style={styles.passwordRequirements}>
        <Text style={styles.passwordRequirementTitle}>Password must:</Text>
        <Text style={styles.passwordRequirementItem}>• Be at least 6 characters long</Text>
        <Text style={styles.passwordRequirementItem}>• Include at least one number</Text>
        <Text style={styles.passwordRequirementItem}>• Include at least one special character</Text>
      </View>
    </>
  );

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    contentContainer: {
      flex: 1,
      padding: 24,
    },
    headerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 24,
    },
    backButton: {
      padding: 8,
    },
    headerTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.text,
      marginLeft: 8,
    },
    progressContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 32,
    },
    progressStep: {
      flex: 1,
      height: 4,
      backgroundColor: colors.border,
      marginHorizontal: 2,
      borderRadius: 2,
    },
    progressStepActive: {
      backgroundColor: colors.primary,
    },
    stepTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 16,
    },
    inputContainer: {
      marginBottom: 20,
    },
    inputLabel: {
      fontSize: 16,
      fontWeight: '500',
      marginBottom: 8,
      color: colors.text,
    },
    input: {
      height: 50,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 8,
      paddingHorizontal: 16,
      fontSize: 16,
      backgroundColor: colors.inputBackground,
      color: colors.text,
    },
    passwordContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 8,
      backgroundColor: colors.inputBackground,
    },
    passwordInput: {
      flex: 1,
      height: 50,
      paddingHorizontal: 16,
      fontSize: 16,
      color: colors.text,
    },
    passwordToggle: {
      padding: 12,
    },
    errorText: {
      color: colors.error,
      fontSize: 14,
      marginTop: 4,
    },
    nextButton: {
      height: 56,
      backgroundColor: colors.primary,
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 24,
    },
    nextButtonText: {
      color: colors.white,
      fontSize: 16,
      fontWeight: '600',
    },
    loginContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: 32,
    },
    loginText: {
      color: colors.text,
      fontSize: 14,
    },
    loginLink: {
      color: colors.primary,
      fontSize: 14,
      fontWeight: '500',
      marginLeft: 4,
    },
    otpDescriptionContainer: {
      marginBottom: 24,
    },
    otpDescription: {
      fontSize: 16,
      color: colors.text,
      lineHeight: 22,
    },
    resendContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: 16,
    },
    resendText: {
      color: colors.text,
      fontSize: 14,
    },
    resendLink: {
      color: colors.primary,
      fontSize: 14,
      fontWeight: '500',
    },
    passwordDescriptionContainer: {
      marginBottom: 24,
    },
    passwordDescription: {
      fontSize: 16,
      color: colors.text,
      lineHeight: 22,
    },
    passwordRequirements: {
      marginTop: 16,
      backgroundColor: colors.cardBackground,
      padding: 16,
      borderRadius: 8,
    },
    passwordRequirementTitle: {
      fontSize: 14,
      fontWeight: '500',
      color: colors.text,
      marginBottom: 8,
    },
    passwordRequirementItem: {
      fontSize: 14,
      color: colors.text,
      marginVertical: 4,
    },
  });

  const getStepTitle = () => {
    switch (currentStep) {
      case 1: return 'Personal Information';
      case 2: return 'Verify Your Email';
      case 3: return 'Create Password';
      default: return '';
    }
  };

  const getButtonText = () => {
    switch (currentStep) {
      case 1: return 'Continue';
      case 2: return 'Verify';
      case 3: return 'Create Account';
      default: return '';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView style={styles.contentContainer} showsVerticalScrollIndicator={false}>
          <View style={styles.headerContainer}>
            <TouchableOpacity style={styles.backButton} onPress={goToPreviousStep}>
              <Ionicons name="arrow-back" size={24} color={colors.text} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Create Account</Text>
          </View>

          <View style={styles.progressContainer}>
            <View style={[styles.progressStep, currentStep >= 1 && styles.progressStepActive]} />
            <View style={[styles.progressStep, currentStep >= 2 && styles.progressStepActive]} />
            <View style={[styles.progressStep, currentStep >= 3 && styles.progressStepActive]} />
          </View>

          <Text style={styles.stepTitle}>{getStepTitle()}</Text>

          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}

          <TouchableOpacity style={styles.nextButton} onPress={goToNextStep}>
            <Text style={styles.nextButtonText}>{getButtonText()}</Text>
          </TouchableOpacity>

          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Already have an account?</Text>
            <TouchableOpacity onPress={() => router.push('/auth/login')}>
              <Text style={styles.loginLink}>Login</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}