import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  TouchableWithoutFeedback,
  Text,
  View,
  KeyboardAvoidingView,
} from 'react-native';
import {Layout, Input} from '@ui-kitten/components';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import Popover, {
  PopoverPlacement,
  PopoverMode,
} from 'react-native-popover-view';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useDispatch, useSelector} from 'react-redux';
import {IUser} from '../models';
import {emptyUser} from '../models/user';
import {saveAccount} from '../redux/actions';
import {FormMessages} from '../utils/actionTypes';

const Account: React.FC = () => {
  let lastnameRef: any = null,
    emailRef: any = null,
    passwordRef: any = null,
    phoneRef: any = null;

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const dispatch = useDispatch();
  // const currUser = useSelector((state: RootState) => state.auth.user);

  const [user, setUser] = useState(emptyUser);
  const [selectedField, setSelectedField] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [showPopover, setShowPopover] = useState(false);
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [fNIsValid, setFNIsValid] = useState<boolean | null>(null);
  const [lNIsValid, setLNIsValid] = useState<boolean | null>(null);
  const [phoneIsValid, setPhoneIsValid] = useState<boolean | null>(null);
  const [phoneValueIsValid, setPhoneValueIsValid] = useState<boolean | null>(
    null,
  );
  const [emailIsValid, setEmailIsValid] = useState<boolean | null>(null);
  const [emailValueIsValid, setEmailValueIsValid] = useState<boolean | null>(
    null,
  );
  const [pwdIsValid, setPwdIsValid] = useState<boolean | null>(null);

  // useEffect(() => {
  //   if (currUser._id) {
  //     navigation.pop();
  //     navigation.navigate('Login');
  //   }
  // }, [currUser]);

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
    let account: IUser = user;

    account = {...account, [field]: value};
    setUser(account);
    setSelectedField(field);
  };

  useEffect(() => {
    const validateFields = () => {
      const emailValid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
        user.email,
      );
      const phoneValid =
        /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(
          user.phone,
        );

      switch (selectedField) {
        case 'firstname': {
          if (user.firstname) {
            setFNIsValid(true);
          } else {
            setFNIsValid(false);
          }
          break;
        }
        case 'lastname': {
          if (user.lastname) {
            setLNIsValid(true);
          } else {
            setLNIsValid(false);
          }
          break;
        }
        case 'phone': {
          if (user.phone) {
            setPhoneIsValid(true);

            if (!phoneValid) {
              setPhoneValueIsValid(false);
            } else if (phoneValid) {
              setPhoneValueIsValid(true);
            }
          } else {
            setPhoneValueIsValid(null);
            setPhoneIsValid(false);
          }
          break;
        }
        case 'email': {
          if (user.email) {
            setEmailIsValid(true);

            if (user.email && !emailValid) {
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
          showPopoverView();

          const checkSpecial = /[*@!#%&()^~{}]+/.test(user.password),
            checkUpper = /[A-Z]+/.test(user.password),
            // checkLower = /[a-z]+/.test(string),
            checkNum = /^(.*[0-9].*)/.test(user.password);
          if (checkUpper && checkNum && checkSpecial) {
            if (user.password.length < 8) {
              setPwdIsValid(false);
            } else {
              setPwdIsValid(true);
            }
          } else {
            setPwdIsValid(false);
          }
          break;
        }
        default:
          break;
      }
    };

    validateFields();
  }, [user, selectedField]);

  useEffect(() => {
    const validateForm = () => {
      if (
        fNIsValid &&
        lNIsValid &&
        phoneIsValid &&
        phoneValueIsValid &&
        pwdIsValid &&
        emailIsValid &&
        emailValueIsValid
      ) {
        setIsValid(true);
      } else {
        setIsValid(false);
      }
    };
    validateForm();
  }, [
    fNIsValid,
    phoneIsValid,
    phoneValueIsValid,
    emailIsValid,
    emailValueIsValid,
    pwdIsValid,
    lNIsValid,
  ]);

  const checkRegex = (pass: string) => {
    const checkSpecial = /[*@!#%&()^~{}]+/.test(pass),
      checkUpper = /[A-Z]+/.test(pass),
      // checkLower = /[a-z]+/.test(string),
      checkNum = /^(.*[0-9].*)/.test(pass);
    if (checkUpper && checkNum && checkSpecial) {
      if (pass.length < 8) {
        return true;
      } else {
        return false;
      }
    } else {
      if (showPopover) {
        return true;
      } else {
        return false;
      }
    }
  };

  const checkSpecial = (pass: string) => {
    var checkCharSp = /[*@!#%&()^~{}]+/.test(pass);
    if (checkCharSp) {
      return true;
    } else {
      false;
    }
  };

  const checkUpper = (pass: string) => {
    var checkUpperCase = /[A-Z]+/.test(pass);
    if (checkUpperCase) {
      return true;
    } else {
      false;
    }
  };
  const checkNumber = (pass: string) => {
    var checkNum = /^(.*[0-9].*)/.test(pass);
    if (checkNum) {
      return true;
    } else {
      false;
    }
  };

  const checkLength = (pass: string) => {
    if (pass.length < 8) return false;
    else return true;
  };

  const showPopoverView = () => {
    setShowPopover(true);
  };

  const closePopover = () => {
    setShowPopover(false);
  };

  const _onSave = () => {
    if (isValid) {
      dispatch(saveAccount(user, navigation));
    }
  };

  return (
    <Layout testID="accountView" style={styles.container}>
      <View>
        <View style={styles.inputContainer}>
          <Input
            testID="firstname"
            autoFocus
            label="Firstname"
            placeholder="Place your first name"
            placeholderTextColor="#000"
            value={user.firstname}
            accessoryRight={
              fNIsValid
                ? renderValidInputIcon
                : fNIsValid === false
                ? renderInvalidInputIcon
                : null
            }
            status={
              fNIsValid ? 'success' : fNIsValid === false ? 'danger' : 'basic'
            }
            onChangeText={text => updateFields('firstname', text)}
            onSubmitEditing={e => lastnameRef.focus()}
          />
          {fNIsValid === false && (
            <View style={styles.errorContainer} testID="firstnameMsgError">
              <Icon
                name="exclamation-triangle"
                color={'#ff375d'}
                size={8}
                style={styles.errorIcon}
              />
              <Text style={styles.errorStyle}>{FormMessages.firstname}</Text>
            </View>
          )}
        </View>
        <View style={styles.inputContainer}>
          <Input
            testID="lastname"
            ref={ref => (lastnameRef = ref)}
            label="Lastname"
            placeholder="Place your last name"
            placeholderTextColor="#000"
            value={user.lastname}
            status={
              lNIsValid ? 'success' : lNIsValid === false ? 'danger' : 'basic'
            }
            accessoryRight={
              lNIsValid
                ? renderValidInputIcon
                : lNIsValid === false
                ? renderInvalidInputIcon
                : null
            }
            onChangeText={text => updateFields('lastname', text)}
            onSubmitEditing={e => emailRef.focus()}
          />
          {lNIsValid === false && (
            <View style={styles.errorContainer} testID="lastnameMsgErrors">
              <Icon
                name="exclamation-triangle"
                color={'#ff375d'}
                size={8}
                style={styles.errorIcon}
              />
              <Text style={styles.errorStyle}>{FormMessages.lastname}</Text>
            </View>
          )}
        </View>
        <View style={styles.inputContainer}>
          <Input
            testID="email"
            ref={ref => (emailRef = ref)}
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
            value={user.email}
            onChangeText={text => updateFields('email', text)}
            onSubmitEditing={e => passwordRef.focus()}
          />
          {emailIsValid === false && (
            <View style={styles.errorContainer} testID="emailMsgErrors">
              <Icon
                name="exclamation-triangle"
                color={'#ff375d'}
                size={8}
                style={styles.errorIcon}
              />
              <Text style={styles.errorStyle}>{FormMessages.email}</Text>
            </View>
          )}
          {emailValueIsValid === false && (
            <View style={styles.errorContainer} testID="emailNotValidMsg">
              <Icon
                name="exclamation-triangle"
                color={'#ff375d'}
                size={8}
                style={styles.errorIcon}
              />
              <Text style={styles.errorStyle}>
                {FormMessages.emailNotValid}
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
            value={user.password}
            status={
              pwdIsValid ? 'success' : pwdIsValid === false ? 'danger' : 'basic'
            }
            onChangeText={text => updateFields('password', text)}
            onSubmitEditing={e => phoneRef.focus()}
          />
          <View
            style={[
              styles.popoverContainer,
              {display: checkRegex(user.password) ? 'flex' : 'none'},
            ]}>
            <Popover
              testID="popoverModal"
              mode={PopoverMode.TOOLTIP}
              placement={PopoverPlacement.TOP}
              isVisible={checkRegex(user.password)}
              //   fromView={this.touchable}
              popoverStyle={{borderRadius: 10}}
              onRequestClose={() => closePopover()}>
              <View style={styles.popoverStyle}>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: '600',
                    marginBottom: 10,
                  }}>
                  Enter Password that must be :
                </Text>
                <View style={styles.rowInput}>
                  {checkLength(user.password) ? (
                    <Icon
                      name="check"
                      size={16}
                      color={'#32b471'}
                      style={{paddingRight: 3}}
                    />
                  ) : (
                    <Icon
                      name="circle"
                      size={10}
                      color={'#de183e'}
                      style={{paddingRight: 9}}
                    />
                  )}
                  <Text>At least 8 characters long</Text>
                </View>
                <View style={styles.rowInput}>
                  {checkNumber(user.password) ? (
                    <Icon
                      name="check"
                      size={16}
                      color={'#32b471'}
                      style={{paddingRight: 3}}
                    />
                  ) : (
                    <Icon
                      name="circle"
                      size={10}
                      color={'#de183e'}
                      style={{paddingRight: 9}}
                    />
                  )}
                  <Text>Must contain a number</Text>
                </View>
                <View style={styles.rowInput}>
                  {checkUpper(user.password) ? (
                    <Icon
                      name="check"
                      size={16}
                      color={'#32b471'}
                      style={{paddingRight: 3}}
                    />
                  ) : (
                    <Icon
                      name="circle"
                      size={10}
                      color={'#de183e'}
                      style={{paddingRight: 9}}
                    />
                  )}
                  <Text>Must contain a capital letter</Text>
                </View>
                <View style={styles.rowInput}>
                  {checkSpecial(user.password) ? (
                    <Icon
                      name="check"
                      size={16}
                      color={'#32b471'}
                      style={{paddingRight: 3}}
                    />
                  ) : (
                    <Icon
                      name="circle"
                      size={10}
                      color={'#de183e'}
                      style={{paddingRight: 9}}
                    />
                  )}
                  <Text>Must contain a special character </Text>
                </View>
              </View>
            </Popover>
          </View>
          {/* {pwdIsValid === false && (
            <View style={styles.errorContainer}>
              <Icon
                name="exclamation-triangle"
                color={'#ff375d'}
                size={8}
                style={styles.errorIcon}
              />
              <Text style={styles.errorStyle}>{FormMessages.password}</Text>
            </View>
          )} */}
        </View>
        <View style={styles.inputContainer}>
          <Input
            testID="phone"
            ref={ref => (phoneRef = ref)}
            label="Phone Number"
            placeholder="Place your phone number"
            placeholderTextColor="#000"
            keyboardType="phone-pad"
            accessoryRight={
              phoneIsValid && phoneValueIsValid
                ? renderValidInputIcon
                : phoneIsValid === false || phoneValueIsValid === false
                ? renderInvalidInputIcon
                : null
            }
            status={
              phoneIsValid && phoneValueIsValid
                ? 'success'
                : phoneIsValid === false || phoneValueIsValid === false
                ? 'danger'
                : 'basic'
            }
            value={user.phone}
            onChangeText={text => updateFields('phone', text)}
            onSubmitEditing={() => _onSave()}
          />
          {phoneIsValid === false && (
            <View style={styles.errorContainer} testID="phoneMsgErrors">
              <Icon
                name="exclamation-triangle"
                color={'#ff375d'}
                size={8}
                style={styles.errorIcon}
              />
              <Text style={styles.errorStyle}>{FormMessages.phone}</Text>
            </View>
          )}
          {phoneValueIsValid === false && (
            <View style={styles.errorContainer}>
              <Icon
                name="exclamation-triangle"
                color={'#ff375d'}
                size={8}
                style={styles.errorIcon}
              />
              <Text style={styles.errorStyle}>
                {FormMessages.phoneNotValid}
              </Text>
            </View>
          )}
        </View>
        <View style={styles.buttonContainer}>
          <Button
            testID="nextStepBtn"
            title={isValid ? 'Next Step' : 'Add your info'}
            containerStyle={{width: '100%'}}
            buttonStyle={styles.button}
            titleStyle={styles.textButton}
            type="solid"
            disabled={!isValid}
            onPress={() => _onSave()}
          />
          <View style={{flexDirection: 'row', marginTop: 5}}>
            <Text style={styles.loginStyles} testID="loginText">
              Already have an account?
            </Text>
            <Text
              testID="loginBtn"
              style={styles.loginTextStyles}
              onPress={() => navigation.navigate('Login')}>
              Login
            </Text>
          </View>
        </View>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 15,
    paddingTop: 40,
  },
  row: {
    flexDirection: 'row',
    padding: 10,
  },
  inputContainer: {
    marginBottom: 25,
  },
  textInput: {
    fontSize: 16,
  },
  buttonContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
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
  loginStyles: {
    color: '#2756a1',
    fontSize: 13,
  },
  loginTextStyles: {
    textDecorationLine: 'underline',
  },
  popoverContainer: {
    width: 260,
    height: 160,
    marginTop: 20,
    marginLeft: -10,
  },
  popoverStyle: {
    justifyContent: 'center',
    marginLeft: 20,
    width: 260,
    height: 130,
  },
  rowInput: {
    flexDirection: 'row',
    alignItems: 'center',
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
export default Account;
