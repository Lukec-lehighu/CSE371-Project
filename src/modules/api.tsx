import type { groupData } from "../pages/Groups";
import Cookies from 'js-cookie';

//const API_ADDR = 'http://raspi3.home:8001/';
const API_ADDR = 'http://localhost:5000/';

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
            joined: item[1],
            owner: item[2]
        }

        data.push(temp);
    })
    
    return data;
}

export async function leaveGroup(groupname: string) {
    const token = Cookies.get('authToken');
    const username = Cookies.get('email')

    const resp = await fetch(API_ADDR + "remove_from_group", {
        method: "POST",
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({
            'token': token,
            'groupname': groupname,
            'username': username
        })
    });

    const json = await resp.json();
    if(json.error)
        return json.error;
    return null;
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

export async function getMembers(groupname: string) {
    const resp = await fetch(API_ADDR + `members?groupname=${groupname}`, {
        method: "GET"
    });

    const json = await resp.json();
    if(json.error) {
        console.log(json.error);
        return null;
    }
    return json.ok;
}

export async function removeMember(groupname: string, member: string) {
    const token = Cookies.get('authToken');

    const resp = await fetch(API_ADDR + "remove_from_group", {
        method: "POST",
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({
            'token': token,
            'groupname': groupname,
            'username': member
        })
    });

    const json = await resp.json();
    if(json.error) {
        console.log(json.error);
        return null;
    }
    return json.ok;
}

export async function addMember(groupname: string, member: string) {
    const token = Cookies.get('authToken');

    const resp = await fetch(API_ADDR + "add_to_private", {
        method: "POST",
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({
            'token': token,
            'groupname': groupname,
            'username': member
        })
    });

    const json = await resp.json();
    if(json.error) {
        console.log(json.error);
        return null;
    }
    return json.ok; 
}


export async function getRequests(groupname: string) {
    const token = Cookies.get('authToken');

    const resp = await fetch(API_ADDR + "requests", {
        method: "POST",
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({
            'verb': 'GET',
            'token': token,
            'groupname': groupname
        })
    });

    const json = await resp.json();
    if (json.error) {
        console.log(json.error);
        return null;
    }
    return json.ok;
}

export async function newRequest(groupname: string, request: string) {
    const token = Cookies.get('authToken');

    const resp = await fetch(API_ADDR + "requests", {
        method: "POST",
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({
            'verb': 'POST',
            'token': token,
            'groupname': groupname,
            'request': request
        })
    });

    const json = await resp.json();
    if (json.error) {
        console.log(json.error);
        return null;
    }
    return json.ok;
}

export async function removeRequest(rid: number) {
    const token = Cookies.get('authToken');

    const resp = await fetch(API_ADDR + "requests", {
        method: "POST",
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({
            'verb': 'DELETE',
            'token': token,
            'rowid': rid
        })
    });

    const json = await resp.json();
    if (json.error) {
        console.log(json.error);
        return null;
    }
    return json.ok;
}


export async function getReceipts(groupname: string) {
    const token = Cookies.get('authToken');

    const resp = await fetch(API_ADDR + "receipts", {
        method: "POST",
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({
            'verb': 'GET',
            'token': token,
            'groupname': groupname
        })
    });

    const json = await resp.json();
    if (json.error) {
        console.log(json.error);
        return null;
    }
    return json.ok;
}

export async function newReceipt(groupName: string, receiptName: string): Promise<string|null> {
    const token = Cookies.get('authToken');

    const resp = await fetch(API_ADDR + "receipts", {
        method: "POST",
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({
            'verb': 'POST',
            'token': token,
            'groupname': groupName,
            'name': receiptName
        })
    });

    const json = await resp.json();
    if(json.error)
        return json.error;
    return null;
}

export async function removeReceipt(rowid: number) {
    const token = Cookies.get('authToken');

    const resp = await fetch(API_ADDR + "receipts", {
        method: "POST",
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({
            'verb': 'DELETE',
            'token': token,
            'rowid': rowid,
        })
    });

    const json = await resp.json();
    if (json.error) {
        console.log(json.error);
        return null;
    }
    return json.ok;
}


export async function getReceiptItems(rowid: number) {
    const token = Cookies.get('authToken');

    const resp = await fetch(API_ADDR + "receipt_items", {
        method: "POST",
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({
            'verb': 'GET',
            'token': token,
            'rowid': rowid
        })
    });

    const json = await resp.json();
    if (json.error) {
        console.log(json.error);
        return null;
    }
    return json.ok;
}

export async function newReceiptItem(rowid: number, itemname: string, cost: number): Promise<string|null> {
    const token = Cookies.get('authToken');

    const resp = await fetch(API_ADDR + "receipt_items", {
        method: "POST",
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({
            'verb': 'POST',
            'token': token,
            'rowid': rowid,
            'itemname': itemname,
            'cost': cost
        })
    });

    const json = await resp.json();
    if(json.error)
        return json.error;
    return null;
}

export async function removeReceiptItem(rowid:number, itemname:string) {
    const token = Cookies.get('authToken');

    const resp = await fetch(API_ADDR + "receipt_items", {
        method: "POST",
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({
            'verb': 'DELETE',
            'token': token,
            'rowid': rowid,
            'itemname': itemname
        })
    });

    const json = await resp.json();
    if (json.error) {
        console.log(json.error);
        return null;
    }
    return json.ok;
}

export async function getClaimedItems(rowid: number) {
    const token = Cookies.get('authToken');

    const resp = await fetch(API_ADDR + "claimed_items", {
        method: "POST",
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({
            'verb': 'GET',
            'token': token,
            'rowid': rowid
        })
    });

    const json = await resp.json();
    if (json.error) {
        console.log(json.error);
        return null;
    }
    return json.ok;
}

export async function toggleClaim(rowid: number, itemname: string) {
    const token = Cookies.get('authToken');

    const resp = await fetch(API_ADDR + "claimed_items", {
        method: "POST",
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({
            'verb': 'POST',
            'token': token,
            'rowid': rowid,
            'itemname': itemname
        })
    });

    const json = await resp.json();
    if(json.error)
        return json.error;
    return null;
}

export async function getDebt(groupname:string) {
    const token = Cookies.get('authToken');

    const resp = await fetch(API_ADDR + "debt", {
        method: "POST",
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({
            'token': token,
            'groupname': groupname
        })
    });

    const json = await resp.json();
    if (json.error) {
        console.log(json.error);
        return null;
    }

    //convert dictionary to list
    let data:string[][] = []

    for(let key in json.ok)
        data.push([key, json.ok[key]]);

    return data;
}