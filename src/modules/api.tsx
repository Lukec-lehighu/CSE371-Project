import type { groupData } from "../pages/Groups";

export function getAllGroups() {
    let data: Array<groupData> = [];

    let temp: groupData = {
        name: 'test',
        joined: true
    }

    data.push(temp);
    return data;
}

export function addNewGroup() { //return true if successful, false otherwise

}

export function joinGroup(groupName: string): boolean { //return true if successful, false otherwise (private group and not on whitelist)
    return false;
}