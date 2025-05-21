import { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Dimensions, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import FormSectionHeader from './FormSectionHeader';
import AssetForm from './forms/AssetForm';
import BeneficiaryForm from './forms/BeneficiaryForm';
import WitnessExecutorForm from './forms/WitnessExecutorForm';

// Get screen dimensions
const { width: SCREEN_WIDTH } = Dimensions.get('window');
const IS_SMALL_SCREEN = SCREEN_WIDTH < 375; // iPhone SE or similar small screens

export default function WillForm() {
  const { colors } = useTheme();
  const [activeSection, setActiveSection] = useState('personal');
  const [personalInfo, setPersonalInfo] = useState({
    fullName: '',
    fathersName: '',
    address: '',
    age: '',
    dob: '',
  });

  const handlePersonalInfoChange = (field, value) => {
    setPersonalInfo({
      ...personalInfo,
      [field]: value
    });
  };

  const navigateToSection = (section) => {
    setActiveSection(section);
  };

  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.cardBackground,
      borderRadius: 12,
      overflow: 'hidden',
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 3,
      width: '100%',
    },
    formTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 16,
    },
    navigationContainer: {
      backgroundColor: colors.primaryLight,
      padding: IS_SMALL_SCREEN ? 10 : 16,
    },
    navigationTabs: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      borderRadius: 8,
      backgroundColor: colors.background,
      overflow: 'hidden',
    },
    navItem: {
      flex: 1,
      minWidth: IS_SMALL_SCREEN ? '50%' : '25%', // 2 tabs per row on small screens
      paddingVertical: IS_SMALL_SCREEN ? 8 : 12,
      alignItems: 'center',
    },
    navItemActive: {
      backgroundColor: colors.primary,
    },
    navText: {
      fontSize: IS_SMALL_SCREEN ? 12 : 14,
      color: colors.text,
      fontWeight: '500',
      textAlign: 'center',
    },
    navTextActive: {
      color: colors.white,
    },
    formSection: {
      padding: IS_SMALL_SCREEN ? 12 : 20,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    formSectionLast: {
      borderBottomWidth: 0,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 16,
    },
    inputContainer: {
      marginBottom: 16,
    },
    inputLabel: {
      fontSize: 14,
      fontWeight: '500',
      color: colors.text,
      marginBottom: 8,
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
    requiredStar: {
      color: colors.error,
    },
    infoText: {
      fontSize: 14,
      color: colors.textSecondary,
      marginTop: 16,
      fontStyle: 'italic',
    },
    navigationButton: {
      backgroundColor: colors.primary,
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderRadius: 8,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 20,
    },
    navigationButtonText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: colors.white,
      marginRight: 8,
    },
    tabRow: {
      flexDirection: 'row',
      width: '100%',
    },
    progressIndicator: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 8,
      paddingHorizontal: 4,
    },
    progressDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: colors.border,
      marginHorizontal: 2,
    },
    progressDotActive: {
      backgroundColor: colors.primary,
    },
  });

  // For small screens, we'll use a 2x2 grid for tabs
  const renderNavigationTabs = () => {
    if (IS_SMALL_SCREEN) {
      return (
        <View>
          <View style={styles.tabRow}>
            <TouchableOpacity 
              style={[styles.navItem, activeSection === 'personal' && styles.navItemActive]}
              onPress={() => navigateToSection('personal')}
            >
              <Text style={[styles.navText, activeSection === 'personal' && styles.navTextActive]}>Personal</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.navItem, activeSection === 'assets' && styles.navItemActive]}
              onPress={() => navigateToSection('assets')}
            >
              <Text style={[styles.navText, activeSection === 'assets' && styles.navTextActive]}>Assets</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.tabRow}>
            <TouchableOpacity 
              style={[styles.navItem, activeSection === 'beneficiaries' && styles.navItemActive]}
              onPress={() => navigateToSection('beneficiaries')}
            >
              <Text style={[styles.navText, activeSection === 'beneficiaries' && styles.navTextActive]}>Beneficiaries</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.navItem, activeSection === 'witnesses' && styles.navItemActive]}
              onPress={() => navigateToSection('witnesses')}
            >
              <Text style={[styles.navText, activeSection === 'witnesses' && styles.navTextActive]}>Witnesses</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.progressIndicator}>
            <View style={[styles.progressDot, activeSection === 'personal' && styles.progressDotActive]} />
            <View style={[styles.progressDot, activeSection === 'assets' && styles.progressDotActive]} />
            <View style={[styles.progressDot, activeSection === 'beneficiaries' && styles.progressDotActive]} />
            <View style={[styles.progressDot, activeSection === 'witnesses' && styles.progressDotActive]} />
          </View>
        </View>
      );
    }

    // Default layout for larger screens
    return (
      <View style={styles.navigationTabs}>
        <TouchableOpacity 
          style={[styles.navItem, activeSection === 'personal' && styles.navItemActive]}
          onPress={() => navigateToSection('personal')}
        >
          <Text style={[styles.navText, activeSection === 'personal' && styles.navTextActive]}>Personal</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.navItem, activeSection === 'assets' && styles.navItemActive]}
          onPress={() => navigateToSection('assets')}
        >
          <Text style={[styles.navText, activeSection === 'assets' && styles.navTextActive]}>Assets</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.navItem, activeSection === 'beneficiaries' && styles.navItemActive]}
          onPress={() => navigateToSection('beneficiaries')}
        >
          <Text style={[styles.navText, activeSection === 'beneficiaries' && styles.navTextActive]}>Beneficiaries</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.navItem, activeSection === 'witnesses' && styles.navItemActive]}
          onPress={() => navigateToSection('witnesses')}
        >
          <Text style={[styles.navText, activeSection === 'witnesses' && styles.navTextActive]}>Witnesses</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderPersonalInfoSection = () => (
    <View style={styles.formSection}>
      <FormSectionHeader 
        title="Personal Information" 
        subtitle="Enter your personal details for identification purposes"
        icon="person"
      />

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Full Name <Text style={styles.requiredStar}>*</Text></Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your full legal name"
          placeholderTextColor={colors.placeholder}
          value={personalInfo.fullName}
          onChangeText={(text) => handlePersonalInfoChange('fullName', text)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Father's Name <Text style={styles.requiredStar}>*</Text></Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your father's name"
          placeholderTextColor={colors.placeholder}
          value={personalInfo.fathersName}
          onChangeText={(text) => handlePersonalInfoChange('fathersName', text)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Address <Text style={styles.requiredStar}>*</Text></Text>
        <TextInput
          style={[styles.input, { height: 80, textAlignVertical: 'top', paddingTop: 12 }]}
          placeholder="Enter your current residential address"
          placeholderTextColor={colors.placeholder}
          multiline
          value={personalInfo.address}
          onChangeText={(text) => handlePersonalInfoChange('address', text)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Age <Text style={styles.requiredStar}>*</Text></Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your current age"
          placeholderTextColor={colors.placeholder}
          keyboardType="numeric"
          value={personalInfo.age}
          onChangeText={(text) => handlePersonalInfoChange('age', text)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Date of Birth <Text style={styles.requiredStar}>*</Text></Text>
        <TextInput
          style={styles.input}
          placeholder="DD/MM/YYYY"
          placeholderTextColor={colors.placeholder}
          value={personalInfo.dob}
          onChangeText={(text) => handlePersonalInfoChange('dob', text)}
        />
      </View>

      <TouchableOpacity 
        style={styles.navigationButton}
        onPress={() => navigateToSection('assets')}
      >
        <Text style={styles.navigationButtonText}>Continue to Assets</Text>
        <Ionicons name="arrow-forward" size={20} color={colors.white} />
      </TouchableOpacity>
    </View>
  );

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'personal':
        return renderPersonalInfoSection();
      case 'assets':
        return <AssetForm navigateToSection={navigateToSection} />;
      case 'beneficiaries':
        return <BeneficiaryForm navigateToSection={navigateToSection} />;
      case 'witnesses':
        return <WitnessExecutorForm navigateToSection={navigateToSection} />;
      default:
        return renderPersonalInfoSection();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.navigationContainer}>
        {renderNavigationTabs()}
      </View>

      {renderActiveSection()}
    </View>
  );
}