import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import FormSectionHeader from '../FormSectionHeader';

export default function WitnessExecutorForm({ navigateToSection }) {
  const { colors } = useTheme();
  const [witnesses, setWitnesses] = useState([
    { id: 1, name: '', age: '', mobile: '', address: '' }
  ]);
  
  const [executors, setExecutors] = useState([
    { id: 1, name: '', age: '', mobile: '', address: '' }
  ]);

  const addPerson = (type) => {
    if (type === 'witness') {
      const newId = witnesses.length > 0 ? Math.max(...witnesses.map(w => w.id)) + 1 : 1;
      setWitnesses([...witnesses, { id: newId, name: '', age: '', mobile: '', address: '' }]);
    } else {
      const newId = executors.length > 0 ? Math.max(...executors.map(e => e.id)) + 1 : 1;
      setExecutors([...executors, { id: newId, name: '', age: '', mobile: '', address: '' }]);
    }
  };

  const removePerson = (type, id) => {
    if (type === 'witness' && witnesses.length > 1) {
      setWitnesses(witnesses.filter(w => w.id !== id));
    } else if (type === 'executor' && executors.length > 1) {
      setExecutors(executors.filter(e => e.id !== id));
    }
  };

  const updatePerson = (type, id, field, value) => {
    if (type === 'witness') {
      setWitnesses(witnesses.map(w => 
        w.id === id ? { ...w, [field]: value } : w
      ));
    } else {
      setExecutors(executors.map(e => 
        e.id === id ? { ...e, [field]: value } : e
      ));
    }
  };

  const handleSubmit = () => {
    // In a real app, you would validate and submit the form data here
    Alert.alert(
      'Submit Will',
      'Are you sure you want to submit your will?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Submit',
          onPress: () => {
            // Handle submission logic
            Alert.alert('Success', 'Your will has been submitted successfully!');
          },
        },
      ],
      { cancelable: false }
    );
  };

  const styles = StyleSheet.create({
    container: {
      padding: 20,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.text,
      marginTop: 16,
      marginBottom: 12,
    },
    personContainer: {
      backgroundColor: colors.background,
      borderRadius: 8,
      padding: 16,
      marginBottom: 16,
      borderWidth: 1,
      borderColor: colors.border,
    },
    personHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
    },
    personTitle: {
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
    addressInput: {
      height: 80,
      textAlignVertical: 'top',
      paddingTop: 12,
    },
    requiredStar: {
      color: colors.error,
    },
    addButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 12,
      borderWidth: 1,
      borderColor: colors.primary,
      borderRadius: 8,
      borderStyle: 'dashed',
      marginBottom: 24,
    },
    addButtonText: {
      color: colors.primary,
      fontSize: 16,
      fontWeight: '500',
      marginLeft: 8,
    },
    submitButton: {
      backgroundColor: colors.primary,
      paddingVertical: 16,
      borderRadius: 8,
      alignItems: 'center',
      marginTop: 24,
    },
    submitButtonText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.white,
    },
    description: {
      fontSize: 14,
      color: colors.textSecondary,
      marginBottom: 16,
      lineHeight: 20,
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
    infoBox: {
      backgroundColor: colors.primaryLight,
      padding: 16,
      borderRadius: 8,
      marginBottom: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    infoIcon: {
      marginRight: 12,
    },
    infoText: {
      fontSize: 14,
      color: colors.primary,
      flex: 1,
    },
  });

  return (
    <View style={styles.container}>
      <FormSectionHeader 
        title="Witnesses & Executors" 
        subtitle="Add people who will witness and execute your will"
        icon="people-circle"
      />

      <View style={styles.infoBox}>
        <Ionicons name="information-circle" size={24} color={colors.primary} style={styles.infoIcon} />
        <Text style={styles.infoText}>
          Witnesses and executors cannot be beneficiaries of your will. They should be adults who are not mentioned elsewhere in your will.
        </Text>
      </View>

      <Text style={styles.sectionTitle}>Witnesses</Text>
      <Text style={styles.description}>
        Witnesses observe and confirm that you signed your will voluntarily. They must be at least 18 years old and should not be beneficiaries of your will.
      </Text>

      {witnesses.map((witness, index) => (
        <View key={witness.id} style={styles.personContainer}>
          <View style={styles.personHeader}>
            <Text style={styles.personTitle}>Witness {index + 1}</Text>
            {witnesses.length > 1 && (
              <TouchableOpacity 
                style={styles.removeButton}
                onPress={() => removePerson('witness', witness.id)}
              >
                <Ionicons name="trash" size={20} color={colors.error} />
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Full Name <Text style={styles.requiredStar}>*</Text></Text>
            <TextInput
              style={styles.input}
              placeholder="Enter witness's full name"
              placeholderTextColor={colors.placeholder}
              value={witness.name}
              onChangeText={(text) => updatePerson('witness', witness.id, 'name', text)}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Age <Text style={styles.requiredStar}>*</Text></Text>
            <TextInput
              style={styles.input}
              placeholder="Enter witness's age"
              placeholderTextColor={colors.placeholder}
              keyboardType="numeric"
              value={witness.age}
              onChangeText={(text) => updatePerson('witness', witness.id, 'age', text)}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Mobile Number <Text style={styles.requiredStar}>*</Text></Text>
            <TextInput
              style={styles.input}
              placeholder="Enter witness's mobile number"
              placeholderTextColor={colors.placeholder}
              keyboardType="phone-pad"
              value={witness.mobile}
              onChangeText={(text) => updatePerson('witness', witness.id, 'mobile', text)}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Address <Text style={styles.requiredStar}>*</Text></Text>
            <TextInput
              style={[styles.input, styles.addressInput]}
              placeholder="Enter witness's address"
              placeholderTextColor={colors.placeholder}
              multiline
              value={witness.address}
              onChangeText={(text) => updatePerson('witness', witness.id, 'address', text)}
            />
          </View>
        </View>
      ))}

      <TouchableOpacity 
        style={styles.addButton} 
        onPress={() => addPerson('witness')}
      >
        <Ionicons name="add-circle" size={20} color={colors.primary} />
        <Text style={styles.addButtonText}>Add Another Witness</Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Executors</Text>
      <Text style={styles.description}>
        Executors are responsible for carrying out the instructions in your will after you pass away. They manage your estate and ensure your assets are distributed according to your wishes.
      </Text>

      {executors.map((executor, index) => (
        <View key={executor.id} style={styles.personContainer}>
          <View style={styles.personHeader}>
            <Text style={styles.personTitle}>Executor {index + 1}</Text>
            {executors.length > 1 && (
              <TouchableOpacity 
                style={styles.removeButton}
                onPress={() => removePerson('executor', executor.id)}
              >
                <Ionicons name="trash" size={20} color={colors.error} />
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Full Name <Text style={styles.requiredStar}>*</Text></Text>
            <TextInput
              style={styles.input}
              placeholder="Enter executor's full name"
              placeholderTextColor={colors.placeholder}
              value={executor.name}
              onChangeText={(text) => updatePerson('executor', executor.id, 'name', text)}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Age <Text style={styles.requiredStar}>*</Text></Text>
            <TextInput
              style={styles.input}
              placeholder="Enter executor's age"
              placeholderTextColor={colors.placeholder}
              keyboardType="numeric"
              value={executor.age}
              onChangeText={(text) => updatePerson('executor', executor.id, 'age', text)}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Mobile Number <Text style={styles.requiredStar}>*</Text></Text>
            <TextInput
              style={styles.input}
              placeholder="Enter executor's mobile number"
              placeholderTextColor={colors.placeholder}
              keyboardType="phone-pad"
              value={executor.mobile}
              onChangeText={(text) => updatePerson('executor', executor.id, 'mobile', text)}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Address <Text style={styles.requiredStar}>*</Text></Text>
            <TextInput
              style={[styles.input, styles.addressInput]}
              placeholder="Enter executor's address"
              placeholderTextColor={colors.placeholder}
              multiline
              value={executor.address}
              onChangeText={(text) => updatePerson('executor', executor.id, 'address', text)}
            />
          </View>
        </View>
      ))}

      <TouchableOpacity 
        style={styles.addButton} 
        onPress={() => addPerson('executor')}
      >
        <Ionicons name="add-circle" size={20} color={colors.primary} />
        <Text style={styles.addButtonText}>Add Another Executor</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.submitButton}
        onPress={handleSubmit}
      >
        <Text style={styles.submitButtonText}>Submit Will</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => navigateToSection('beneficiaries')}
      >
        <Ionicons name="arrow-back" size={20} color={colors.text} />
        <Text style={styles.backButtonText}>Back to Beneficiaries</Text>
      </TouchableOpacity>
    </View>
  );
}