import axios from 'axios'

// function 
export function sum (a: number, b: number) {
    return a + b
}

export function forEach(items: any[], callback: Function) {
    for (let index = 0; index < items.length; index++) {
        callback(items[index]);
    }
}


export class Users {
    static all() {
        return axios.get('/users.json').then(resp => resp.data);
    }

    static fetchAll() {
        return fetch('/users.json').then(resp => resp.json())
    }
}
  
  export default Users;