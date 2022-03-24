import { useEffect, useState } from 'react';

function List({ children }) {
  // props.children are all the elements passed in between the component declaration
  return <ul style={{ backgroundColor: 'beige' }}>{children}</ul>;
}

export default function RandomUserList() {
  const [userList, setUserList] = useState([]);
  const [usersAmount, setUsersAmount] = useState(5);

  async function fetchUsers(
    /* default value when no number is passed  */ number = 5,
  ) {
    const response = await fetch(
      `https://randomuser.me/api/?results=${number}`,
    );
    const data = await response.json();
    console.log(data.results);
    setUserList(data.results);
  }

  // Infinite loops may happen if you update state in a useEffect with no dependencies (99% of the time you dont want to use useEffect without dependency array, you want wither empty [] or with a variable)

  useEffect(() => {
    // correct way to update title on useEffect
    document.title = 'my List of Users';

    // IIFE
    // (async () => {
    //   await fetchUsers();
    // })().catch((err) => {
    //   console.log(err);
    // });

    // common function declaration
    async function myFetch() {
      await fetchUsers();
    }
    myFetch().catch((err) => {
      console.log(err);
    });
    // this empty array means this code is going to run only at first render
  }, []);

  useEffect(() => {
    async function myFetch() {
      await fetchUsers(usersAmount);
    }
    myFetch().catch((err) => {
      console.log(err);
    });
    // the dependency array tells that always that usersAmount is updated the code inside of this useEffect is going to run again
  }, [usersAmount]);

  if (userList.length === 0) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <List>
        {/* <User
        name={{
          title: 'Mrs',
          first: 'Antje',
          last: "'Enzi'",
        }}
        email="antje@upleveled.io"
        picture="https://randomuser.me/api/portraits/thumb/men/83.jpg"
      /> */}
        {userList.map((singleUser) => {
          return (
            <div
              key={'user' + singleUser.name + singleUser.email}
              name={singleUser.name}
              email={singleUser.email}
              picture={singleUser.picture.medium}
            />
          );
        })}
        {/* <User
        name={{ first: 'Antje', last: 'Enzi' }}
        email="antje@upleveled.io"
        picture="https://randomuser.me/api/portraits/thumb/men/83.jpg"
      /> */}
      </List>

      <button
        onClick={() => {
          // 1 Copy the array with spread operator
          const userListCopy = [...userList];
          // 2 Update the Copy of the array

          // 2.1 using push
          // userListCopy.push({
          //   gender: 'Male',
          //   name: {
          //     title: 'Mr',
          //     first: 'Jose',
          //     last: 'Hower',
          //   },
          //   email: 'jose@upleveled.io',
          //   picture: 'https://randomuser.me/api/portraits/thumb/men/83.jpg',
          // });
          // 2.2 using spread Operator
          const arrayUpdated = [
            ...userListCopy,
            {
              gender: 'Male',
              name: {
                title: 'Mr',
                first: 'Jose',
                last: 'Hower',
              },
              email: 'jose@upleveled.io',
              picture: 'https://randomuser.me/api/portraits/thumb/men/83.jpg',
            },
          ];

          // 3 Update state

          // updating for 2.1
          // setUserList(userListCopy);
          // updating for 2.2
          setUserList(arrayUpdated);
        }}
      >
        add new user
      </button>
      <button
        onClick={() => {
          // 1. copy
          const userListCopy = [...userList];
          // 2. update
          // 2.1 using array.pop()
          userListCopy.pop();
          // 2.2 using filter
          // const arrayUpdated = userListCopy.filter((singleUser, index) => {
          // let pass all the users but the last
          //   return index !== userListCopy.length - 1;
          // });
          // 3. update state with the copy
          // updating for 2.1
          setUserList(userListCopy);
          // updating for 2.2
          // setUserList(arrayUpdated);
        }}
      >
        Remove last user
      </button>
      <button
        onClick={() => {
          // 1. copy
          const userListCopy = [...userList];
          // 2. update is going to change the email of the last user to example@example.com
          // 2.1 using map
          const updatedList = userListCopy.map((singleUser, index) => {
            // if you are the last in the array
            if (index === userListCopy.length - 1) {
              singleUser.email = 'example@example.com';
              return singleUser;
            } else {
              return singleUser;
            }
          });

          // 3. update state with the copy
          setUserList(updatedList);
        }}
      >
        update last user
      </button>
    </>
  );
}
