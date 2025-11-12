import type { groupData } from "../pages/Groups";

const API_ADDR = 'http://127.0.0.1:5000/';

export function getAllGroups() {
    let data: Array<groupData> = [];

    let temp: groupData = {
        name: 'test',
        joined: true
    }

    data.push(temp);
    return data;
}

export async function addNewGroup(groupName:string, ownerName:string, isPublic:boolean): Promise<string|null> { //return error if failure, false otherwise
    const resp = await fetch(API_ADDR + "make_group", {
        method: "POST",
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({
            'name': groupName,
            'owner': ownerName,
            'public': (isPublic ? 1 : 0)
        })
    });

    const json = await resp.json();
    if(json.error)
        return json.error;
    return null;
}

export function joinGroup(groupName: string): boolean { //return true if successful, false otherwise (private group and not on whitelist)
    return false;
}