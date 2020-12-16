import { ConstantValues } from '../utils/ConstantValues'
const ApiCreateGateActivity = (
    auth_token,
    company_id, location_id, purpose_visit_id, visited_employee_id,
    checkin_time,
    checkout_time,
    scan_car_license,
    scan_id_drivers,
    number_people,
    scan_out_value,
    scanned_out) => {
    return fetch(ConstantValues.BASE_API_URL + ConstantValues.URL_CREATE_GATE_ACTIVITY, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + auth_token
        },
        body: JSON.stringify({
            company_id: company_id,
            location_id: location_id,
            purpose_visit_id: purpose_visit_id,
            visited_employee_id: visited_employee_id,
            checkin_time: checkin_time,
            checkout_time: checkout_time,
            scan_car_license: scan_car_license,
            scan_id_drivers: scan_id_drivers,
            number_people: number_people,
            scan_out_value: scan_out_value,
            scanned_out: scanned_out
        })
    }).then((response) => response.json());
}
const ApiGetUserDetails = (auth_token, params) => {
    return fetch(ConstantValues.BASE_API_URL + ConstantValues.USERS_STR + params, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + auth_token
        }
    }).then((response) => response.json());
}
const ApiPurposeOfVisitDropDown = (auth_token, paramsUrl) => {
    return fetch(ConstantValues.BASE_API_URL + ConstantValues.URL_PURPOSE_OF_VISIT + paramsUrl, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + auth_token
        }
    }).then((response) => response.json());
}
const ApiGetWhiteLabelSettings = (paramsUrl) => {
    return fetch(ConstantValues.BASE_API_URL + ConstantValues.URL_WHITE_LABEL_SETTINGS_STR + paramsUrl, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    }).then((response) => response.json());
}
const ApiUserLogin = (
    user_email,
    user_password
) => {
    console.log("user_email" + user_email + "user_password" + user_password)
    return fetch(ConstantValues.BASE_API_URL + ConstantValues.URL_USER_LOGIN, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            user_email: user_email,
            user_password: user_password
        })
    }).then((response) => response.json());
}
const ApiUpdateFirebasData = (auth_token, userid, device_token, device_type,
    home_location_id
) => {
    return fetch(ConstantValues.BASE_API_URL + ConstantValues.URL_USER_UPDATE + userid, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + auth_token
        },
        body: JSON.stringify({
            user_home_location_id: home_location_id,
            device_type: device_type,
            device_token: device_token,
        })
    }).then((response) => response.json());
}
const ApiGetCompany = (auth_token, paramsUrl) => {
    //    console.log("auth_token"+auth_token+"ConstantValues.BASE_API_URL + ConstantValues.URL_COMANIES + paramsUrl"+ConstantValues.BASE_API_URL + ConstantValues.URL_COMANIES + paramsUrl);
    return fetch(ConstantValues.BASE_API_URL + ConstantValues.URL_COMANIES + paramsUrl, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + auth_token
        }
    }).then((response) => response.json());
}
const ApiUserLogout = (auth_token) => {
    return fetch(ConstantValues.BASE_API_URL + ConstantValues.URL_LOGOUT, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + auth_token
        }
    }).then((response) => response.json());
}
const ApiCreateScanOutGateEntry = (
    auth_token,
    scan_car_license,
    scan_id_drivers,
) => {
    return fetch(ConstantValues.BASE_API_URL + ConstantValues.URL_SCAN_OUT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + auth_token
        },
        body: JSON.stringify({
            scan_car_license: scan_car_license,
        })
    }).then((response) => response.json());
}
export {
    ApiUserLogin,
    ApiGetUserDetails,
    ApiUserLogout,
    ApiGetCompany,
    ApiUpdateFirebasData,
    ApiCreateGateActivity,
    ApiPurposeOfVisitDropDown,
    ApiGetWhiteLabelSettings,
    ApiCreateScanOutGateEntry
};