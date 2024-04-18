import {ROLE_ENUM} from "../types/roleTypes.js";

export const getRoleDisplay = (roleName) => {
    let displayValue = '';

    // Loop through the ROLE_ENUM object to find a match
    Object.keys(ROLE_ENUM).forEach(key => {
        if (roleName?.includes(ROLE_ENUM[key]?.name)) {
            displayValue = ROLE_ENUM[key]?.display;
        }
    });

    return displayValue;
}

export const hasElevatedAccess = (roleArray) => {
    return isAdmin(roleArray) || isOperator(roleArray);
}

export const isAdmin = (roleArray) => {
    return roleArray.includes(ROLE_ENUM.ROLE_ADMIN.name);
}

export const isOperator = (roleArray) => {
    return roleArray.includes(ROLE_ENUM.ROLE_OPERATOR.name);
}