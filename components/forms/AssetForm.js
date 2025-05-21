import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import FormSectionHeader from '../FormSectionHeader';

// Get screen dimensions
const { width: SCREEN_WIDTH } = Dimensions.get('window');
const IS_SMALL_SCREEN = SCREEN_WIDTH < 375; // iPhone SE or similar small screens

export default function AssetForm({ navigateToSection }) {
  const { colors } = useTheme();
  const [assets, setAssets] = useState([
    { id: 1, name: '', type: '', value: '' }
  ]);

  const addAsset = () => {
    const newId = assets.length > 0 ? Math.max(...assets.map(a => a.id)) + 1 : 1;
    setAssets([...assets, { id: newId, name: '', type: '', value: '' }]);
  };

  const removeAsset = (id) => {
    if (assets.length > 1) {
      setAssets(assets.filter(asset => asset.id !== id));
    }
  };

  const updateAsset = (id, field, value) => {
    setAssets(assets.map(asset => 
      asset.id === id ? { ...asset, [field]: value } : asset
    ));
  };

  const assetTypes = [
    'Real Estate',
    'Vehicle',
    'Personal Property',
    'Financial Asset',
    'Business Interest',
    'Intellectual Property',
    'Other'
  ];

  const styles = StyleSheet.create({
    container: {
      padding: IS_SMALL_SCREEN ? 12 : 20,
    },
    assetContainer: {
      backgroundColor: colors.background,
      borderRadius: 8,
      padding: IS_SMALL_SCREEN ? 12 : 16,
      marginBottom: 16,
      borderWidth: 1,
      borderColor: colors.border,
    },
    assetHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
    },
    assetTitle: {
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
    typePickerContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginTop: 8,
    },
    typeOption: {
      backgroundColor: colors.cardBackground,
      paddingHorizontal: IS_SMALL_SCREEN ? 8 : 12,
      paddingVertical: IS_SMALL_SCREEN ? 6 : 8,
      borderRadius: 20,
      marginRight: 6,
      marginBottom: 8,
      borderWidth: 1,
      borderColor: colors.border,
    },
    typeOptionSelected: {
      backgroundColor: colors.primaryLight,
      borderColor: colors.primary,
    },
    typeText: {
      fontSize: IS_SMALL_SCREEN ? 12 : 14,
      color: colors.text,
    },
    typeTextSelected: {
      color: colors.primary,
      fontWeight: 'bold',
    },
    addAssetButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 12,
      borderWidth: 1,
      borderColor: colors.primary,
      borderRadius: 8,
      borderStyle: 'dashed',
    },
    addAssetText: {
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
    buttonContainer: {
      flexDirection: IS_SMALL_SCREEN ? 'column' : 'row',
      justifyContent: 'space-between',
      marginTop: 16,
    },
    navigationButtonSmall: {
      flex: IS_SMALL_SCREEN ? 0 : 1,
      marginRight: IS_SMALL_SCREEN ? 0 : 8,
      marginBottom: IS_SMALL_SCREEN ? 12 : 0,
    },
    backButtonSmall: {
      flex: IS_SMALL_SCREEN ? 0 : 1,
      marginLeft: IS_SMALL_SCREEN ? 0 : 8,
    },
  });

  // Render asset type options in a more responsive way
  const renderAssetTypeOptions = (asset) => {
    // For small screens, we'll show fewer options per row
    const optionsPerRow = IS_SMALL_SCREEN ? 2 : 3;
    
    // Group asset types into rows
    const rows = [];
    for (let i = 0; i < assetTypes.length; i += optionsPerRow) {
      rows.push(assetTypes.slice(i, i + optionsPerRow));
    }

    return (
      <View>
        {rows.map((row, rowIndex) => (
          <View key={rowIndex} style={{ flexDirection: 'row', marginBottom: 4 }}>
            {row.map(type => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.typeOption,
                  { flex: 1, marginRight: 6 },
                  asset.type === type && styles.typeOptionSelected
                ]}
                onPress={() => updateAsset(asset.id, 'type', type)}
              >
                <Text 
                  style={[
                    styles.typeText,
                    { textAlign: 'center' },
                    asset.type === type && styles.typeTextSelected
                  ]}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {type}
                </Text>
              </TouchableOpacity>
            ))}
            {/* Add empty views to fill the row if needed */}
            {row.length < optionsPerRow && Array(optionsPerRow - row.length).fill().map((_, i) => {
              const emptyKey = `empty-${i}`;
              return <View key={emptyKey} style={{ flex: 1, marginRight: 6 }} />;
            })}
          </View>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FormSectionHeader 
        title="Assets Information" 
        subtitle="Add all assets that you wish to include in your will"
        icon="wallet"
      />

      {assets.map((asset, index) => (
        <View key={asset.id} style={styles.assetContainer}>
          <View style={styles.assetHeader}>
            <Text style={styles.assetTitle}>Asset {index + 1}</Text>
            {assets.length > 1 && (
              <TouchableOpacity 
                style={styles.removeButton}
                onPress={() => removeAsset(asset.id)}
              >
                <Ionicons name="trash" size={20} color={colors.error} />
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Asset Name <Text style={styles.requiredStar}>*</Text></Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. House, Car, Bank Account"
              placeholderTextColor={colors.placeholder}
              value={asset.name}
              onChangeText={(text) => updateAsset(asset.id, 'name', text)}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Asset Type <Text style={styles.requiredStar}>*</Text></Text>
            {renderAssetTypeOptions(asset)}
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Estimated Value <Text style={styles.requiredStar}>*</Text></Text>
            <TextInput
              style={styles.input}
              placeholder="Enter estimated value"
              placeholderTextColor={colors.placeholder}
              keyboardType="numeric"
              value={asset.value}
              onChangeText={(text) => updateAsset(asset.id, 'value', text)}
            />
          </View>
        </View>
      ))}

      <TouchableOpacity style={styles.addAssetButton} onPress={addAsset}>
        <Ionicons name="add-circle" size={20} color={colors.primary} />
        <Text style={styles.addAssetText}>Add Another Asset</Text>
      </TouchableOpacity>

      {IS_SMALL_SCREEN ? (
        <>
          <TouchableOpacity 
            style={styles.navigationButton}
            onPress={() => navigateToSection('beneficiaries')}
          >
            <Text style={styles.navigationButtonText}>Continue to Beneficiaries</Text>
            <Ionicons name="arrow-forward" size={20} color={colors.white} />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigateToSection('personal')}
          >
            <Ionicons name="arrow-back" size={20} color={colors.text} />
            <Text style={styles.backButtonText}>Back to Personal Info</Text>
          </TouchableOpacity>
        </>
      ) : (
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[styles.backButton, styles.backButtonSmall]}
            onPress={() => navigateToSection('personal')}
          >
            <Ionicons name="arrow-back" size={20} color={colors.text} />
            <Text style={styles.backButtonText}>Back to Personal Info</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.navigationButton, styles.navigationButtonSmall]}
            onPress={() => navigateToSection('beneficiaries')}
          >
            <Text style={styles.navigationButtonText}>Continue to Beneficiaries</Text>
            <Ionicons name="arrow-forward" size={20} color={colors.white} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}