import type { groupData } from "../pages/Groups";
import Cookies from 'js-cookie';

const API_ADDR = 'http://127.0.0.1:5000/';

export async function getAllGroups() {
    const token = Cookies.get('authToken');

    const resp = await fetch(API_ADDR + "groups", {
        method: "POST",
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({
            'token': token
        })
    });

    const json = await resp.json();
    if(json.error || !json.ok) {
        console.log(`Error fetching groups: ${json.error}`)
        return;
    }

    var data: Array<groupData> = [];
    json.ok.forEach((item:any[])=>{
        let temp: groupData = {
            name: item[0],
            joined: item[1]
        }

        data.push(temp);
    })
    
    return data;
}

export async function addNewGroup(groupName:string, ownerName:string, isPublic:boolean): Promise<string|null> { //return error if failure, null otherwise
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

export async function joinGroup(groupName: string): Promise<string|null> { //return null if successful, false otherwise (private group and not on whitelist)
    const token = Cookies.get('authToken');

    const resp = await fetch(API_ADDR + "join_group", {
        method: "POST",
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({
            'group': groupName,
            'token': token
        })
    });

    const json = await resp.json();
    if(json.error)
        return json.error;

    return null;
}