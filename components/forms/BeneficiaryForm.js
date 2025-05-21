import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import FormSectionHeader from '../FormSectionHeader';

export default function BeneficiaryForm({ navigateToSection }) {
  const { colors } = useTheme();
  const [activeAssetIndex, setActiveAssetIndex] = useState(0);
  const [assets] = useState([
    { id: 1, name: 'House in Mumbai', type: 'Real Estate' },
    { id: 2, name: 'Car - Honda City', type: 'Vehicle' },
    { id: 3, name: 'HDFC Bank Account', type: 'Financial Asset' },
  ]);
  
  const [beneficiaries, setBeneficiaries] = useState({
    1: [{ id: 1, name: '', age: '', mobile: '', sharePercentage: '' }],
    2: [{ id: 1, name: '', age: '', mobile: '', sharePercentage: '' }],
    3: [{ id: 1, name: '', age: '', mobile: '', sharePercentage: '' }],
  });

  const addBeneficiary = (assetId) => {
    const currentBeneficiaries = beneficiaries[assetId] || [];
    const newId = currentBeneficiaries.length > 0 
      ? Math.max(...currentBeneficiaries.map(b => b.id)) + 1 
      : 1;
    
    setBeneficiaries({
      ...beneficiaries,
      [assetId]: [
        ...currentBeneficiaries,
        { id: newId, name: '', age: '', mobile: '', sharePercentage: '' }
      ]
    });
  };

  const removeBeneficiary = (assetId, beneficiaryId) => {
    const currentBeneficiaries = beneficiaries[assetId] || [];
    if (currentBeneficiaries.length > 1) {
      setBeneficiaries({
        ...beneficiaries,
        [assetId]: currentBeneficiaries.filter(b => b.id !== beneficiaryId)
      });
    }
  };

  const updateBeneficiary = (assetId, beneficiaryId, field, value) => {
    const currentBeneficiaries = beneficiaries[assetId] || [];
    setBeneficiaries({
      ...beneficiaries,
      [assetId]: currentBeneficiaries.map(b => 
        b.id === beneficiaryId ? { ...b, [field]: value } : b
      )
    });
  };

  const calculateTotalShare = (assetId) => {
    const assetBeneficiaries = beneficiaries[assetId] || [];
    return assetBeneficiaries.reduce((total, b) => {
      const share = parseFloat(b.sharePercentage) || 0;
      return total + share;
    }, 0);
  };

  const styles = StyleSheet.create({
    container: {
      padding: 20,
    },
    assetSelector: {
      marginBottom: 20,
    },
    assetSelectorTabs: {
      flexDirection: 'row',
      borderRadius: 8,
      backgroundColor: colors.background,
      overflow: 'hidden',
      marginTop: 12,
    },
    assetTab: {
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderBottomWidth: 2,
      borderBottomColor: 'transparent',
    },
    assetTabActive: {
      borderBottomColor: colors.primary,
    },
    assetTabText: {
      fontSize: 14,
      color: colors.textSecondary,
    },
    assetTabTextActive: {
      color: colors.primary,
      fontWeight: 'bold',
    },
    activeAssetInfo: {
      backgroundColor: colors.cardBackground,
      padding: 12,
      borderRadius: 8,
      marginBottom: 16,
    },
    activeAssetName: {
      fontSize: 16,
      fontWeight: 'bold',
      color: colors.text,
    },
    activeAssetType: {
      fontSize: 14,
      color: colors.textSecondary,
    },
    shareProgressContainer: {
      marginTop: 8,
    },
    shareProgressHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 4,
    },
    shareProgressText: {
      fontSize: 12,
      color: colors.textSecondary,
    },
    shareProgressBar: {
      height: 6,
      backgroundColor: colors.border,
      borderRadius: 3,
    },
    shareProgressFill: {
      height: '100%',
      borderRadius: 3,
      backgroundColor: colors.primary,
    },
    shareProgressFillError: {
      backgroundColor: colors.error,
    },
    shareProgressFillComplete: {
      backgroundColor: colors.success,
    },
    beneficiaryContainer: {
      backgroundColor: colors.background,
      borderRadius: 8,
      padding: 16,
      marginBottom: 16,
      borderWidth: 1,
      borderColor: colors.border,
    },
    beneficiaryHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
    },
    beneficiaryTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: colors.text,
    },
    removeButton: {
      padding: 4,
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
    shareError: {
      color: colors.error,
      fontSize: 14,
      marginTop: 4,
    },
    addBeneficiaryButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 12,
      borderWidth: 1,
      borderColor: colors.primary,
      borderRadius: 8,
      borderStyle: 'dashed',
    },
    addBeneficiaryText: {
      color: colors.primary,
      fontSize: 16,
      fontWeight: '500',
      marginLeft: 8,
    },
    navigationButton: {
      backgroundColor: colors.primary,
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderRadius: 8,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 24,
    },
    navigationButtonText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: colors.white,
      marginRight: 8,
    },
    backButton: {
      backgroundColor: colors.background,
      borderWidth: 1,
      borderColor: colors.border,
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderRadius: 8,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 12,
    },
    backButtonText: {
      fontSize: 16,
      fontWeight: '500',
      color: colors.text,
      marginLeft: 8,
    },
  });

  const renderSharePercentageBar = (assetId) => {
    const totalShare = calculateTotalShare(assetId);
    const isComplete = totalShare === 100;
    const isError = totalShare > 100;
    
    return (
      <View style={styles.shareProgressContainer}>
        <View style={styles.shareProgressHeader}>
          <Text style={styles.shareProgressText}>Total Share Allocated</Text>
          <Text style={styles.shareProgressText}>
            {totalShare}% / 100%
          </Text>
        </View>
        <View style={styles.shareProgressBar}>
          <View 
            style={[
              styles.shareProgressFill, 
              { width: Math.min(totalShare, 100) + '%' },
              isError && styles.shareProgressFillError,
              isComplete && styles.shareProgressFillComplete
            ]} 
          />
        </View>
        {isError && (
          <Text style={styles.shareError}>
            Total share exceeds 100%. Please adjust the percentages.
          </Text>
        )}
      </View>
    );
  };

  const renderActiveAssetBeneficiaries = () => {
    const activeAsset = assets[activeAssetIndex];
    const assetBeneficiaries = beneficiaries[activeAsset.id] || [];

    return (
      <View>
        <View style={styles.activeAssetInfo}>
          <Text style={styles.activeAssetName}>{activeAsset.name}</Text>
          <Text style={styles.activeAssetType}>{activeAsset.type}</Text>
          {renderSharePercentageBar(activeAsset.id)}
        </View>

        {assetBeneficiaries.map((beneficiary, index) => (
          <View key={beneficiary.id} style={styles.beneficiaryContainer}>
            <View style={styles.beneficiaryHeader}>
              <Text style={styles.beneficiaryTitle}>Beneficiary {index + 1}</Text>
              {assetBeneficiaries.length > 1 && (
                <TouchableOpacity 
                  style={styles.removeButton}
                  onPress={() => removeBeneficiary(activeAsset.id, beneficiary.id)}
                >
                  <Ionicons name="trash" size={20} color={colors.error} />
                </TouchableOpacity>
              )}
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Full Name <Text style={styles.requiredStar}>*</Text></Text>
              <TextInput
                style={styles.input}
                placeholder="Enter beneficiary's full name"
                placeholderTextColor={colors.placeholder}
                value={beneficiary.name}
                onChangeText={(text) => updateBeneficiary(activeAsset.id, beneficiary.id, 'name', text)}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Age <Text style={styles.requiredStar}>*</Text></Text>
              <TextInput
                style={styles.input}
                placeholder="Enter beneficiary's age"
                placeholderTextColor={colors.placeholder}
                keyboardType="numeric"
                value={beneficiary.age}
                onChangeText={(text) => updateBeneficiary(activeAsset.id, beneficiary.id, 'age', text)}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Mobile Number <Text style={styles.requiredStar}>*</Text></Text>
              <TextInput
                style={styles.input}
                placeholder="Enter beneficiary's mobile number"
                placeholderTextColor={colors.placeholder}
                keyboardType="phone-pad"
                value={beneficiary.mobile}
                onChangeText={(text) => updateBeneficiary(activeAsset.id, beneficiary.id, 'mobile', text)}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Share Percentage <Text style={styles.requiredStar}>*</Text></Text>
              <TextInput
                style={styles.input}
                placeholder="Enter percentage (0-100)"
                placeholderTextColor={colors.placeholder}
                keyboardType="numeric"
                value={beneficiary.sharePercentage}
                onChangeText={(text) => updateBeneficiary(activeAsset.id, beneficiary.id, 'sharePercentage', text)}
              />
            </View>
          </View>
        ))}

        <TouchableOpacity 
          style={styles.addBeneficiaryButton} 
          onPress={() => addBeneficiary(activeAsset.id)}
        >
          <Ionicons name="add-circle" size={20} color={colors.primary} />
          <Text style={styles.addBeneficiaryText}>Add Another Beneficiary</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FormSectionHeader 
        title="Beneficiary Information" 
        subtitle="Designate who will receive your assets"
        icon="people"
      />

      <View style={styles.assetSelector}>
        <Text style={styles.inputLabel}>Select Asset to Assign Beneficiaries</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.assetSelectorTabs}
        >
          {assets.map((asset, index) => (
            <TouchableOpacity
              key={asset.id}
              style={[
                styles.assetTab,
                index === activeAssetIndex && styles.assetTabActive
              ]}
              onPress={() => setActiveAssetIndex(index)}
            >
              <Text 
                style={[
                  styles.assetTabText,
                  index === activeAssetIndex && styles.assetTabTextActive
                ]}
              >
                {asset.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {renderActiveAssetBeneficiaries()}

      <TouchableOpacity 
        style={styles.navigationButton}
        onPress={() => navigateToSection('witnesses')}
      >
        <Text style={styles.navigationButtonText}>Continue to Witnesses & Executors</Text>
        <Ionicons name="arrow-forward" size={20} color={colors.white} />
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => navigateToSection('assets')}
      >
        <Ionicons name="arrow-back" size={20} color={colors.text} />
        <Text style={styles.backButtonText}>Back to Assets</Text>
      </TouchableOpacity>
    </View>
  );
}