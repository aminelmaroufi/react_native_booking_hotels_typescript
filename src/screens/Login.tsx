import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  TouchableWithoutFeedback,
  Text,
  View,
  Image,
} from 'react-native';
import {Layout, Input} from '@ui-kitten/components';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useDispatch} from 'react-redux';
import {RootState} from '../redux/reducers';
import {loginRequest} from '../redux/actions';
import {LoginFormMessages} from '../utils/actionTypes';

const Login: React.FC<Props> = () => {
  let passwordRef: any = null;
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedField, setSelectedField] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [isValid, setIsValid] = useState(null);
  const [emailIsValid, setEmailIsValid] = useState(null);
  const [emailValueIsValid, setEmailValueIsValid] = useState(null);
  const [pwdIsValid, setPwdIsValid] = useState(null);

  const renderPasswordIcon = () => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon name={secureTextEntry ? 'eye-slash' : 'eye'} size={20} />
    </TouchableWithoutFeedback>
  );

  const renderValidInputIcon = () => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon name={'check-circle'} size={20} color={'green'} />
    </TouchableWithoutFeedback>
  );

  const renderInvalidInputIcon = () => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon name={'exclamation-circle'} size={20} color={'#ff375d'} />
    </TouchableWithoutFeedback>
  );

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const updateFields = (field: string, value: string) => {
    if (field === 'email') {
      setEmail(value);
    } else {
      setPassword(value);
    }
    setSelectedField(field);
  };

  const validateFields = () => {
    switch (selectedField) {
      case 'email': {
        const emailValid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
          email,
        );
        if (email) {
          setEmailIsValid(true);

          if (email && !emailValid) {
            setEmailValueIsValid(false);
          } else if (emailValid) {
            setEmailValueIsValid(true);
          }
        } else {
          setEmailValueIsValid(null);
          setEmailIsValid(false);
        }
        break;
      }
      case 'password': {
        if (password) {
          setPwdIsValid(true);
        } else {
          setPwdIsValid(false);
        }
        break;
      }
      default:
        break;
    }
  };

  useEffect(() => {
    validateFields();
  }, [email, password]);

  const login = () => {
    dispatch(loginRequest(email, password));
  };

  useEffect(() => {
    const validateForm = () => {
      if (pwdIsValid && emailIsValid && emailValueIsValid) {
        setIsValid(true);
      } else {
        setIsValid(false);
      }
    };
    validateForm();
  }, [emailIsValid, emailValueIsValid, pwdIsValid]);

  return (
    <Layout style={styles.container}>
      <Image
        testID="logo"
        source={require('../assets/logo.png')}
        style={styles.logo}
      />
      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <Input
            testID="email"
            autoFocus
            label="Email Address"
            placeholder="Place your email address"
            placeholderTextColor="#000"
            keyboardType="email-address"
            status={
              emailIsValid && emailValueIsValid
                ? 'success'
                : emailIsValid === false || emailValueIsValid === false
                ? 'danger'
                : 'basic'
            }
            accessoryRight={
              emailIsValid && emailValueIsValid
                ? renderValidInputIcon
                : emailIsValid === false || emailValueIsValid === false
                ? renderInvalidInputIcon
                : null
            }
            value={email}
            onChangeText={text => updateFields('email', text)}
            onSubmitEditing={() => passwordRef.focus()}
          />
          {emailIsValid === false && (
            <View style={styles.errorContainer}>
              <Icon
                name="exclamation-triangle"
                color={'#ff375d'}
                size={8}
                style={styles.errorIcon}
              />
              <Text style={styles.errorStyle}>{LoginFormMessages.email}</Text>
            </View>
          )}
          {emailValueIsValid === false && (
            <View style={styles.errorContainer}>
              <Icon
                name="exclamation-triangle"
                color={'#ff375d'}
                size={8}
                style={styles.errorIcon}
              />
              <Text style={styles.errorStyle}>
                {LoginFormMessages.emailNotValid}
              </Text>
            </View>
          )}
        </View>
        <View style={styles.inputContainer}>
          <Input
            testID="password"
            ref={ref => (passwordRef = ref)}
            label="Password"
            placeholder="Place your password"
            placeholderTextColor="#000"
            secureTextEntry={secureTextEntry}
            accessoryRight={renderPasswordIcon}
            value={password}
            status={
              pwdIsValid ? 'success' : pwdIsValid === false ? 'danger' : 'basic'
            }
            onChangeText={text => updateFields('password', text)}
            onSubmitEditing={() => login()}
          />
          {pwdIsValid === false && (
            <View style={styles.errorContainer}>
              <Icon
                name="exclamation-triangle"
                color={'#ff375d'}
                size={8}
                style={styles.errorIcon}
              />
              <Text style={styles.errorStyle}>
                {LoginFormMessages.password}
              </Text>
            </View>
          )}
        </View>

        <View style={styles.buttonContainer}>
          <Button
            testID="login-btn"
            title={'Login'}
            containerStyle={{width: 'auto'}}
            buttonStyle={styles.button}
            titleStyle={styles.textButton}
            type="solid"
            disabled={!isValid}
            onPress={() => login()}
          />
        </View>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    // padding: 10,
    paddingTop: 40,
  },
  logo: {
    height: 200,
    width: 400,
    marginBottom: 100,
  },
  form: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    padding: 10,
  },
  inputContainer: {
    width: 300,
    marginBottom: 25,
  },
  textInput: {
    fontSize: 16,
  },
  buttonContainer: {marginTop: 10},
  button: {
    backgroundColor: '#2756a1',
    borderRadius: 10,
    width: '100%',
    height: 50,
  },
  textButton: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  errorContainer: {
    flexDirection: 'row',
    marginTop: 5,
    paddingLeft: 10,
  },
  errorIcon: {
    paddingTop: 4,
  },
  errorStyle: {
    fontSize: 12,
    marginLeft: 3,
    color: '#ff375d',
  },
});

export default Login;
