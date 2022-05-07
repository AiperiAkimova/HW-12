import { useState, useEffect } from "react";


const Users=(props) => {
    const [users, setUsers] = useState([])//жонотулгон запрос боюнча данныйлар келет

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
        .then((result) => {
            return result.json();//бул жерде запрос жибердик жана данный кайтварды 
        })
        .then((data) => setUsers(data));//ал данныйларды setUsersке сактадык
    }, [props.isLoggedIn])
//setUsers ти чакырганда запрос загрузка болот useEffectти корот жана 
//ал жерде массив пустой болсо ал кайра кайталанып иштебейт бир эле жолу иштейт
   //эгер биз массивке переменный берсек анын озгоргонуно жараша useEffect да озгоруп турат
   //Баштапкыда бир жолу загрузка болот анан переменный озгоргондо кайра башынан тузулот 2 жолу пайда болот
   //Б.а. массивдин ичине берген данныйдын озгоруусуно жараша запрос да кайталанып иштеп турат демек коз каранды болуп калат
    
    return(
        <div>
            <ul>
                {users.map((user) => ( //данныйларды итерациядан откоруп жатабыз
                    <li key = {user.id}>{user.name}</li>
                )                 )}
            </ul>
        </div>
    )
}

export default Users