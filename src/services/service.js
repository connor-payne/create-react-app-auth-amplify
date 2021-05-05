
import { DataStore } from '@aws-amplify/datastore';
import { Property, User, Tag, Report, Company} from '../models';
import { Auth } from 'aws-amplify';


export async function getUserByEmail(email) {
    console.log(email)
    const user = (await DataStore.query(User))
    .filter(a => a.email === email);
    console.log(user);
    return user[0]
};

export async function createCompany(email, userType) {
    const cognitoUser = await Auth.currentAuthenticatedUser()
    console.log(cognitoUser.attributes['custom:companyName'])
    console.debug("attempting company creation")
    const user = (await DataStore.query(User))
    .filter(a => a.email === email);
    if (user.length > 0) {
        return "user already exists"
    }

    const company = await DataStore.save(
        new Company({
            "companyName": cognitoUser.attributes['custom:companyName'],
            "Users": []
        })
    );

    const res = await DataStore.save(
        new User({
            "userType": userType,
            "email": email,
            "Property": [],
            "companyID": company.id
        })
    );
    await Auth.updateUserAttributes(cognitoUser, {
        'custom:savedInDB': 'true'
      });
    console.log(res);
    return res;
};

export async function createUser(email, userType, companyId) {
    const res = await DataStore.save(
        new User({
            "userType": userType,
            "email": email,
            "Property": [],
            "companyID": companyId
        })
    );
    console.log(res);
    return res;
}

export async function getAllUsers() {
    const models = await DataStore.query(User);
    console.log(models);
};

export async function getUsersByPropertyId() {
    const cognitoUser = await Auth.currentAuthenticatedUser()
    const dynamoUser = await getUserByEmail(cognitoUser.username)
    const propertyId = dynamoUser.propertyId;
    const users = (await DataStore.query(User, propertyId))                    
    console.log(users)
    return users;
}

export async function getAllTags(propertyId) {
    console.log(propertyId)
    const tags = (await DataStore.query(Tag))                    
    .filter(a => a.propertyID === propertyId);
    console.log(tags)
    return tags;
}

export async function getTagById(tagId) {
    console.log(tagId)
    const tag = (await DataStore.query(Tag, tagId))                    
    console.log(tag)
    return tag;
}

export async function createTag(make, model, description, propertyId) {
    const cognitoUser = await Auth.currentAuthenticatedUser()
    const dynamoUser = await getUserByEmail(cognitoUser.username)
    const userId = dynamoUser.id;
    const res =  await DataStore.save(
        new Tag({
            "unitMake": make,
            "unitModel": model,
            "lastServiceDate": "0",
            "description": description,
            "propertyID": propertyId,
            "Reports": []
        })
    );
    console.log(res);
    return res
}

export async function getReports(tagId) {
    console.log(tagId)
    const reports = (await DataStore.query(Report))                    
    .filter(a => a.tagID === tagId);
    console.log(reports)
    return reports;
}

export async function createProperty(city, address, state, zip) {
    const cognitoUser = await Auth.currentAuthenticatedUser()
    const dynamoUser = await getUserByEmail(cognitoUser.username)
    const userId = dynamoUser.id;
    const res =  await DataStore.save(
        new Property({
            "propertyCity": city,
            "propertyAddress": address,
            "propertyState": state,
            "propertyZip": zip,
            "lastServiceDate": 0,
            "tags": [],
            "companyID": dynamoUser.companyID
        })
    );
    console.log(res);
    return res
}


export async function getAllProperties() {
    const cognitoUser = await Auth.currentAuthenticatedUser()
    const dynamoUser = await getUserByEmail(cognitoUser.username)
    const userId = dynamoUser.id;
    const models = (await DataStore.query(Property))
    .filter(a => a.companyID === dynamoUser.companyID);
    console.log(models);
    return models;
};


export async function getPropertyById(propertyId) {
    const property = (await DataStore.query(Property, propertyId))                    
    console.log(property)
    return property;
}


export async function deleteProperty(propertyId) {
    const modelToDelete = await DataStore.query(Property, propertyId);
    DataStore.delete(modelToDelete);
}