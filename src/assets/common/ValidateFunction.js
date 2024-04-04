import Toast from 'react-native-root-toast';


const VALIDATE = {
    EMAIL: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    ALPHABET_ONLY: /^[a-zA-Z \s]*$/,
    NUMBER: /[0-9]$/,
    MOBILE: /^[0-9]{1,20}$/,
    STREET: /^[a-zA-Z0-9 '-.~!@#$%^&*()_+={}[];':"<>,.\s]*$/,
    PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
    NO_SPECIAL_CHARA: /^[a-zA-Z0-9- ]*$/,

}

const validationFunctions = {



    checkAlphabet: (name, min, max, value) => {
        var min = min || 5;
        var max = max || 40;
        if (value) {
            if (!VALIDATE.ALPHABET_ONLY.test(value)) { Toast.show(`${name} is Invalid.`); return false }
            else if (value.length < min || value.length > max) { Toast.show(`${name} must be between ${min} to ${max} characters.`); return false }
            return true
        }
        else { Toast.show(`${name} is required.`); return false }
    },


    checkEmail: (name, value) => {
        if (value) {
            if (!VALIDATE.EMAIL.test(value)) { Toast.show(`${name} is Invalid.`); return false }
        } else { Toast.show(`${name} is required.`); return false }
        return true
    },

    checkNumber: (name, min, max, value) => {
        var min = min || 7;
        var max = max || 15;
        if (value) {
            if (!VALIDATE.NUMBER.test(value)) { Toast.show(`${name} is Invalid.`); return false }
            else if (value.length < min || value.length > max) { Toast.show(`${name} must be between ${min} to ${max} characters.`); return false }
            return true
        }
        else { Toast.show(`${name} is required.`); return false }
    },

    checkPhoneNumber: (name, min, max, value) => {
        var min = min || 7;
        var max = max || 15;
        if (value) {
            if (!VALIDATE.MOBILE.test(value)) { Toast.show(`${name} is Invalid.`); return false }
            else if (value.length < min || value.length > max) { Toast.show(`${name} must be between ${min} to ${max} digits.`); return false }
            return true
        }
        else { Toast.show(`${name} is required.`); return false }
    },

    checkNotNull: (name, min, max, value) => {
        var min = min || 5;
        var max = max || 40;
        if (value) {
            if (value.length < min || value.length > max) { Toast.show(`${name} must be between ${min} to ${max} characters.`); return false }
            return true
        }
        else { Toast.show(`${name} is required.`); return false }
    },

    checkRequired: (name, value) => {
        if (!value) {
            Toast.show(`${name} is required.`); return false
        }

        else{
            return true
        }
    },



    checkPassword: (name, min, max, value) => {
        var min = min || 7;
        var max = max || 15;
        if (value) {
            if (!VALIDATE.PASSWORD.test(value)) { Toast.show(`${name} is invalid, must contain at least one lowercase letter, one uppercase letter, and one digit.`);
            return false }
            else if (value.length < min || value.length > max) { Toast.show(`${name} must be between ${min} to ${max} digits.`); return false }
            return true
        }
        else { Toast.show(`${name} is required.`); return false }
    },

    checkMatch: (name, value, name2, value2) => {
        var min = min || 5;
        var max = max || 40;
        if (value == value2) {
            return true
        }
        else { Toast.show(`Password and confirm password don't match.`); return false }
    },



    checkNoSpecialChara: (name, min, max, value) => {
        console.log(name, min, max, value)
        var min = min || 5;
        var max = max || 40;
        if (value) {
            if (!VALIDATE.NO_SPECIAL_CHARA.test(value)) { Toast.show(`${name} is Invalid.`); return false }
            else if (value.length < min || value.length > max) { Toast.show(`${name} must be between ${min} to ${max} characters.`); return false }
            return true
        }
        else { Toast.show(`${name} is required.`); return false }
    },

    checkShortName: name => {
        const arr = name?.split(' ');
        return `${(arr?.length > 0 && arr[0]?.charAt(0).toUpperCase()) || ''}${
            (arr?.length > 1 && arr[1]?.charAt(0).toUpperCase()) || ''
        }`;
    },

}

export default validationFunctions;
