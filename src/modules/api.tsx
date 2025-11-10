import type { groupData } from "../pages/Groups";

export function getAllGroups() {
    let data: Array<groupData> = [];

    let temp: groupData = {
        name: 'test',
        joined: false
    }

    data.push(temp);
    return data;
}

export function addNewGroup() { //return true if successful, false otherwise

}