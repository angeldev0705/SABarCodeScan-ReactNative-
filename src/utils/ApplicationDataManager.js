import AsyncStorage from '@react-native-community/async-storage';
export default class ApplicationDataManager {
    static mInstance = null;
    checkoutdate = ""
    hrsCounter = ""
    minsCounter = ""
    secsCounter = ""
    hrscount = ""
    secscount = ""
    minicount = ""
    checkin_time = ""
    isUserCheckedIn = "";
    user_note = "";
    user_experience = "";
    user_rating = "";
    user_password = "";
    user_email = "";
    user_token = "";
    app_name = "";
    app_logo = "";
    app_action_background = "";
    footeractive_tab_color = "";
    header_bg_color = "";
    toggle_on_color = "";
    toggle_of_color = "";
    tab_active_color = "";
    header_text_color = "";
    action_button_text_color = "";
    isProfileChildSelected = false;
    static getInstance() {
        if (ApplicationDataManager.mInstance == null) {
            ApplicationDataManager.mInstance = new ApplicationDataManager();
        }
        return this.mInstance;
    }
    setCheckOutDate() {
        AsyncStorage.getItem('checkout_time').then(value => {
            console.log("value" + value)
            if (value !== null) {
                this.checkoutdate = value;
            }
            else {
                this.checkoutdate = ''
            }
        })
    }
    setAppName(name) {
        this.app_name = name;
    }
    getAppName() {
        return this.app_name;
    }
    setAppLogo(logo) {
        this.app_logo = logo;
    }
    getAppLogo() {
        return this.app_logo;
    }
    setToggleOnColor(toggle_on_color) {
        this.toggle_on_color = toggle_on_color;
    }
    getToggleOnColor() {
        return this.toggle_on_color;
    }
    setToggleOfColor(toggle_of_color) {
        this.toggle_of_color = toggle_of_color;
    }
    getToggleOfColor() {
        return this.toggle_of_color;
    }
    setTabActiveColor(tab_active_color) {
        this.tab_active_color = tab_active_color;
    }
    getTabActiveColor() {
        return this.tab_active_color;
    }
    setHeaderTextColor(header_text_color) {
        this.header_text_color = header_text_color;
    }
    getHeaderTextColor() {
        return this.header_text_color;
    }
    setActionButtonTextColor(action_button_text_color) {
        this.action_button_text_color = action_button_text_color;
    }
    getActionButtonTextColor() {
        return this.action_button_text_color;
    }
    setHeaderBgcolor(header_bg_color) {
        this.header_bg_color = header_bg_color;
    }
    getHeaderBgcolor() {
        return this.header_bg_color;
    }
    setFooterActiveTabcolor(footeractive_tab_color) {
        this.footeractive_tab_color = footeractive_tab_color;
    }
    getFooterActiveTabcolor() {
        return this.footeractive_tab_color;
    }
    setActionButtonBackground(backgroundColor) {
        this.app_action_background = backgroundColor;
    }
    getActionButtonBackground() {
        return this.app_action_background;
    }
    setisProfileChildSelected(isSelected) {
        this.isProfileChildSelected = isSelected;
    }
    getisProfileChildSelected() {
        return this.isProfileChildSelected;
    }
    setUserToken() {
        AsyncStorage.getItem('userToken').then(value => {
            console.log("value" + value)
            if (value !== null) {
                this.user_token = value;
            }
            else {
                this.user_token = ''
            }
        })
    }
    getUserToken() {
        return this.user_token;
    }
    setUserEmail() {
        console.log("email---");
        AsyncStorage.getItem('email').then(value => {
            console.log("value" + value)
            if (value !== null) {
                this.user_email = value;
            }
            else {
                this.user_email = ''
            }
        })
    }
    getUserEmail() {
        console.log("this.email" + this.user_email)
        return this.user_email;
    }
    getCheckOutDate() {
        return this.checkoutdate;
    }
    setCheckOutHours() {
        AsyncStorage.getItem('checkout_hrs').then(value => {
            console.log("value" + value)
            if (value !== null) {
                this.hrsCounter = value;
            }
            else {
                this.hrsCounter = ''
            }
        })
    }
    getCheckOutHours() {
        console.log("this.hrsCounter" + this.hrsCounter)
        return this.hrsCounter;
    }
    setCheckOutMins() {
        console.log("checkout_mns---");
        AsyncStorage.getItem('checkout_mns').then(value => {
            console.log("value" + value)
            if (value !== null) {
                this.minsCounter = value;
            }
            else {
                this.minsCounter = ''
            }
        })
    }
    getCheckOutMins() {
        console.log("this.minsCounter" + this.minsCounter)
        return this.minsCounter;
    }
    setHours() {
        console.log("hrscount---");
        AsyncStorage.getItem('hrscount').then(value => {
            // console.log("value-------" + JSON.parse(value));
            console.log("value" + value)
            if (value !== null) {
                this.hrscount = value;
            }
            else {
                this.hrscount = ''
            }
        })
    }
    getHours() {
        console.log("this.secsCounter" + this.hrscount)
        return this.hrscount;
    }
    setMinitues() {
        console.log("minscount---");
        AsyncStorage.getItem('minscount').then(value => {
            console.log("value" + value)
            if (value !== null) {
                this.minicount = value;
            }
            else {
                this.minicount = ''
            }
        })
    }
    getMinites() {
        return this.minicount;
    }
    setSeconds() {
        AsyncStorage.getItem('secscount').then(value => {
            if (value !== null) {
                this.secscount = value;
            }
            else {
                this.secscount = ''
            }
        })
    }
    getSecounds() {
        console.log("this.secsCounter" + this.secscount)
        return this.secscount;
    }
    setCheckOutSecs() {
        console.log("checkout_secs---");
        AsyncStorage.getItem('checkout_secs').then(value => {
            console.log("value" + value)
            if (value !== null) {
                this.secsCounter = value;
            }
            else {
                this.secsCounter = ''
            }
        })
    }
    getCheckOutSecs() {
        console.log("this.checkin_time" + this.secsCounter)
        return this.secsCounter;
    }
    setCheckInTime() {
        console.log("checkin_time---");
        AsyncStorage.getItem('checkin_time').then(value => {
            console.log("value" + value)
            if (value !== null) {
                this.checkin_time = value;
            }
            else {
                this.checkin_time = ''
            }
        })
    }
    getCheckInTime() {
        console.log("this.secsCounter" + this.checkin_time)
        return this.checkin_time;
    }
    setisUserCheckedIn() {
        console.log("isUserCheckedIn---------------------------------------");
        AsyncStorage.getItem('isUserCheckedIn').then(value => {
            // console.log("value-------" + JSON.parse(value));
            console.log("value" + value)
            if (value !== null) {
                this.isUserCheckedIn = value;
            }
            else {
                this.isUserCheckedIn = ''
            }
        })
    }
    getisUserCheckedIn() {
        console.log("this.isUserCheckedIn" + this.isUserCheckedIn)
        return this.isUserCheckedIn;
    }
    setiAddNote() {
        AsyncStorage.getItem('user_note').then(value => {
            console.log("value" + value)
            if (value !== null) {
                this.user_note = value;
            }
            else {
                this.user_note = ''
            }
        })
    }
    getAddNote() {
        console.log("this.user_note" + this.user_note)
        return this.user_note;
    }
    setExperience() {
        AsyncStorage.getItem('user_experience').then(value => {
            console.log("value" + value)
            if (value !== null) {
                this.user_experience = value;
            }
            else {
                this.user_experience = ''
            }
        })
    }
    getExperience() {
        console.log("this.user_experience" + this.user_experience)
        return this.user_experience;
    }
    setRating() {
        AsyncStorage.getItem('user_rating').then(value => {
            // console.log("value-------" + JSON.parse(value));
            console.log("value" + value)
            if (value !== null) {
                this.user_rating = value;
            }
            else {
                this.user_rating = ''
            }
        })
    }
    getRating() {
        console.log("this.user_rating" + this.user_rating)
        return this.user_rating;
    }
}
