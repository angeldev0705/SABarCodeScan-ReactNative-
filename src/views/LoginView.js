import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    TouchableOpacity,
    Image,
    TextInput,
    ActivityIndicator,
    Alert,
    PermissionsAndroid
} from 'react-native';
import Constantimages from '../utils/ConstantImages';
import { ConstantValues } from '../utils/ConstantValues';
import AsyncStorage from '@react-native-community/async-storage';
import { colors, fontsProps, dimensionsProps, paddingProps } from '../utils/StyleComponents';
import ProgressDialog from '../components/dialogs/ProgressDialog';
import {
    ApiUserLogin,
    ApiGetUserDetails,
    ApiUpdateFirebasData,
    ApiGetCompany,
    ApiGetWhiteLabelSettings
} from '../network/Services';
import CommonStyleSheet from '../utils/CommonStyleSheet';
import ApplicationDataManager from '../utils/ApplicationDataManager';
var applicationDataManager = ApplicationDataManager.getInstance();
export default class LoginView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            password: "",
            usersFirebaseData: [],
            currentUserData: [],
            homeLocationData: [],
            enable_flash_club: "",
            whitelabelsettings: [],
            applogo: ApplicationDataManager.getInstance().getAppLogo(),
            action_button_bg_color: ApplicationDataManager.getInstance().getActionButtonBackground(),
            action_button_text_color: ApplicationDataManager.getInstance().getActionButtonTextColor(),
            header_background_color: ApplicationDataManager.getInstance().getHeaderBgcolor(),
        }
    }
    componentDidMount() {
        console.log("loginbackground---------------------------------" + this.state.loginbackground)
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            this.setState({
                email: "",
                password: "",
            })
        });
        this.getWhiteLabelSettings("t", "l")
        AsyncStorage.getItem('email').then(value => {
            if (value) {
                this.setState({ email: value });
                AsyncStorage.getItem('password').then(pwd => {
                    if (pwd) {
                        this.setState({ password: pwd });
                        this.onUserLogin();
                    }
                });
            }
        });
    }
    setWhiteLables = async (responseJson) => {
        ApplicationDataManager.getInstance().setAppLogo(responseJson[0].login_logo);
        ApplicationDataManager.getInstance().setActionButtonBackground(responseJson[0].action_button_background_color);
        ApplicationDataManager.getInstance().setFooterActiveTabcolor(responseJson[0].footer_background_color);
        ApplicationDataManager.getInstance().setToggleOfColor(responseJson[0].toggle_off_color);
        ApplicationDataManager.getInstance().setToggleOnColor(responseJson[0].toggle_on_color);
        ApplicationDataManager.getInstance().setTabActiveColor(responseJson[0].tab_background_color);
        ApplicationDataManager.getInstance().setHeaderTextColor(responseJson[0].header_text_color);
        ApplicationDataManager.getInstance().setActionButtonTextColor(responseJson[0].action_button_text_color);
        ApplicationDataManager.getInstance().setHeaderBgcolor(responseJson[0].header_background_color);
        await this.setState({
            whitelabelsettings: responseJson,
        })
    }
    getWhiteLabelSettings = async (companyid, token) => {
        console.log("getWhiteLabelSettings0------------------------------------login");
        let params = "?company_id=" + ConstantValues.COMPANY_ID_STR
        await ApiGetWhiteLabelSettings(
            params).then(responseJson => {
                console.log("getWhiteLabelSettings" + JSON.stringify(responseJson))
                if (responseJson.length > 0) {
                    this.setWhiteLables(responseJson)
                }
            }).catch((err) => {
                this.setState({ isLoading: false })
            })
    }
    getLocationsList = async (data, companyid, token) => {
        console.log("companyid" + companyid + "token" + token)
        let params = "?company_id=" + companyid;
        await ApiGetCompany(token, params).then(responseJson => {
            if (responseJson.length > 0) {
                console.log("responseJson[0].enable_flash_club," + responseJson[0].enable_flash_club)
                this.props.navigation.navigate('Main', { userData: data, enable_flash_club: responseJson[0].enable_flash_club, show_loyalty_cards: responseJson[0].show_loyalty_cards })
            }
            console.log("this.state.enable_flash_club" + this.state.enable_flash_club)
        }).catch((err) => {
            this.setState({ isLoading: false })
        })
    }
    getFirebaseData = (token) => {
        console.log("token -------------getFirebaseData()" + token)
        this.setState({ isLoading: true });
        let params = "";
        ApiGetUserDetails(token, params).then(response => {
            this.setState({ isLoading: false });
            let data = [];
            if (response.length > 0) {
                for (let i = 0; i < response.length; i++) {
                    data.push({
                        // id: response[i].id,
                        name: response[i].name,
                        lastname: response[i].surname,
                        user_email: response[i].user_email,
                        cell_number: response[i].cell_number,
                        id_number: response[i].id_number,
                        token: token,
                        user_type: response[i].user_type,
                        street_address: response[i].street_address,
                        city: response[i].city_name,
                    })
                }
                this.setState({ usersFirebaseData: data, isLoading: false });
                console.log("login: users getFirebaseData is: " + JSON.stringify(this.state.usersFirebaseData[0]));
            }
        }).catch(error => {
            this.setState({ isLoading: false });
            console.log(error);
        })
    }
    getCurrentUserDataFromFirebase(varEmail,) {
        var data = [];
        data = this.state.usersFirebaseData;
        for (var i = 0; i < data.length; i++) {
            if (data[i].user_email === varEmail) {
                this.setState({ currentUserData: data[i] });
                return true;
            }
        }
        return false;
    }
    componentWillUnmount() {
        this._unsubscribe();
    }
    handleEmailChange = (newText) => this.setState({ email: newText })
    handlePasswordChange = (newText) => this.setState({ password: newText })
    validateFields = () => {
        const { email, password } = this.state;
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        let validstate = false;
        if (email == "") {
            validstate = false;
            Alert.alert(
                '',
                ConstantValues.ENTER_EMAIL_ADDRESS_ALERT,
                [
                    {
                        text: ConstantValues.OK_ALERT_STR,
                    }
                ],
                { cancelable: true },
            )
        }
        else if (password == "") {
            Alert.alert(
                '',
                ConstantValues.ENTER_PASSWORD_ALERT,
                [
                    {
                        text: ConstantValues.OK_ALERT_STR,
                    }
                ],
                { cancelable: true },
            )
        }
        else if (password.length < 5) {
            validstate = false
            Alert.alert(
                '',
                ConstantValues.PASSWORD_LENGTH_ALERT,
                [
                    {
                        text: ConstantValues.OK_ALERT_STR,
                    }
                ],
                { cancelable: true },
            )
        }
        else if (reg.test(email) === false) {
            validstate = false;
            Alert.alert(
                '',
                ConstantValues.ENTER_VALID_EMAIL_ADDRESS_ALERT,
                [
                    {
                        text: ConstantValues.OK_ALERT_STR,
                    }
                ],
                { cancelable: true },
            )
        }
        else {
            validstate = true;
        }
        return validstate;
    }
    submitAndClear = (employee_company_id, token) => {
        this.textEmailAddress.clear();
        this.textPassword.clear();
        this.setState({
            email: '',
            password: '',
            isLoading: false
        })
    }
    onUserLogin() {
        const { email, password } = this.state;
        if (!this.validateFields()) {
            return;
        }
        this.setState({ isLoading: true, })
        let token = "";
        let userid = "";
        ApiUserLogin(
            email, password).then(responseJson => {
                console.log("responseJson" + JSON.stringify(responseJson))
                if (responseJson.status === 'success') {
                    token = responseJson.data.Authorization_Token;
                    userid = responseJson.data.id;
                    let params = "?id=" + userid;
                    ApiGetUserDetails(token, params).then(response => {
                        console.log("user details: " + JSON.stringify(response));
                        this.setState({ isLoading: false });
                        let data = [];
                        data.push({
                            id: userid,
                            name: response[0].name,
                            lastname: response[0].surname,
                            user_email: response[0].user_email,
                            cell_number: response[0].cell_number,
                            id_number: response[0].id_number,
                            token: token,
                            user_type: response[0].user_type,
                            street_address: response[0].street_address,
                            city: response[0].city_name,
                            city_name: response[0].city_name,
                            province: response[0].province_name,
                            country: response[0].country_name,
                            city_id: response[0].city_id,
                            province_id: response[0].province_id,
                            country_id: response[0].country_id,
                            pincode: response[0].pincode,
                            digital_signature: response[0].digital_signature,
                            user_image: response[0].user_image,
                            employee_company_id: response[0].employee_company_id,
                            employed_location_id: response[0].employed_location_id,
                            home_location_id: response[0].home_location_id,
                            division_id: response[0].division_id,
                            department_id: response[0].department_id,
                            access_control_notification: response[0].access_control_notification,
                            user_preferences_allow_email: response[0].preferences_allow_email,
                            user_preferences_allow_id: response[0].preferences_allow_id,
                            user_preferences_allow_selfie: response[0].preferences_allow_selfie,
                            user_preferences_allow_address: response[0].preferences_allow_address,
                            access_token: response[0].device_token,
                            user_type_id: response[0].user_type_id
                        })
                        AsyncStorage.setItem('email', this.state.email)
                        AsyncStorage.setItem('password', this.state.password)
                     
                        this.submitAndClear(data[0].employee_company_id, token);
                      
                        if (data.length > 0) {
                         if (data[0].user_type == ConstantValues.USER_TYPE_GATE_DEVICE_STR) {
                                this.props.navigation.navigate('GateEntry', { userData: data })
                            }
                           
                        }
                    }).catch(error => {
                        this.setState({ isLoading: false });
                        console.log(error);
                    })
                }
                else {
                    this.setState({ isLoading: false, })
                    Alert.alert(
                        '',
                        responseJson.message,
                        [
                            {
                                text: ConstantValues.OK_ALERT_STR,
                            }
                        ],
                        { cancelable: true },
                    )
                }
            }).catch(error => {
                this.setState({ isLoading: false, })
            })
    }
    renderLoading = () => {
        if (this.state.isLoading) {
            return (
                <View style={CommonStyleSheet.loading}>
                    <ActivityIndicator size='large' color={colors.COLOR_BG} />
                </View>
            )
        }
    }
    renderProgressDialogLoader() {
        if (this.state.isLoading) {
            return (
                <ProgressDialog
                    background={this.state.header_background_color}
                    visible={this.state.isLoading}
                    title={ConstantValues.LOADING_STR}
                />
            )
        }
    }
    render() {
        return (
            <SafeAreaView style={{ flex: 1, }}>
                <StatusBar
                    barStyle='dark-content'
                    backgroundColor={colors.COLOR_DARK_BLUE} />
                <ScrollView showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="always"  >
                    <View style={styles.containerStyleTwo}>
                        {this.state.applogo != "" &&
                            <Image style={{
                                width: 250,
                                height: 100,
                                alignSelf: 'center',
                                resizeMode: 'contain',
                                marginVertical: 30,
                                paddingVertical: 30
                            }}
                                source={{
                                    uri: this.state.applogo
                                }}
                            />
                        }
                        <View style={CommonStyleSheet.InputSectionStyle}>
                            <Image source={Constantimages.mail_icon} style={styles.ImageStyle} />
                            <TextInput
                                ref={input => { this.textEmailAddress = input }}
                                style={CommonStyleSheet.textInputStyle}
                                placeholder={ConstantValues.EMAIL_STR_S}
                                underlineColorAndroid="transparent"
                                value={this.state.email}
                                onChangeText={this.handleEmailChange}
                            />
                        </View>
                        <View style={CommonStyleSheet.InputSectionStyle}>
                            <Image source={Constantimages.lock_icon} style={styles.ImageStyle} />
                            <TextInput
                                ref={input => { this.textPassword = input }}
                                style={CommonStyleSheet.textInputStyle}
                                placeholder={ConstantValues.PASSWORD_STR_S}
                                underlineColorAndroid="transparent"
                                value={this.state.password}
                                secureTextEntry={true}
                                onChangeText={this.handlePasswordChange}
                            />
                        </View>
                        <TouchableOpacity
                            onPress={() => this.onUserLogin()}
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: this.state.action_button_bg_color != "" ? this.state.action_button_bg_color : colors.COLOR_THEME,
                                borderRadius: 5,
                                elevation: 5,
                                margin: 10,
                                height: 50
                            }}>
                            <Text
                                style={{
                                    fontSize: 16,
                                    color: this.state.action_button_text_color != "" ?
                                        this.state.action_button_text_color : colors.COLOR_WHITE,
                                    textAlign: 'center',
                                    paddingHorizontal: 25,
                                    paddingVertical: 15
                                }}>
                                {ConstantValues.LOGIN_STR}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                        >
                            <Text
                                style={{
                                    fontSize: 16,
                                    color: colors.GREY_COLOR,
                                    textAlign: 'center',
                                    paddingHorizontal: 25,
                                    paddingVertical: 15
                                }}>
                                {ConstantValues.FORGOT_PASSWORD_STR}?
                            </Text>
                        </TouchableOpacity>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginHorizontal: paddingProps.md,
                            paddingHorizontal: 10,
                        }}
                        >
                            <Text style={{ paddingHorizontal: 5, color: colors.GREY_COLOR, }}>
                                {ConstantValues.ALREADY_HAVE_AN_ACCOUNT_STR}
                            </Text>
                            <TouchableOpacity
                                onPress={() => { }
                                }
                                style={{ paddingVertical: 10, }}
                            >
                                <Text style={{
                                    paddingHorizontal: 5,
                                    color: this.state.action_button_bg_color != "" ?
                                        this.state.action_button_bg_color :
                                        colors.COLOR_THEME,
                                    fontSize: fontsProps.md, fontWeight: 'bold'
                                }}>
                                    {ConstantValues.CREATE_ACCOUNT_STR_SMALL}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
                {this.renderProgressDialogLoader()}
            </SafeAreaView>
        );
    }
};
const styles = StyleSheet.create({
    ImageStyle: {
        padding: 10,
        margin: 5,
        height: 20,
        width: 20,
        resizeMode: 'stretch',
        alignItems: 'center',
        tintColor: colors.GREY_COLOR
    },
})