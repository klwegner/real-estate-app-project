// import { useState, useContext } from "react";
// import axios from "axios";
// import Link from 'next/link';
// import { useAuth } from '../auth.context';
// import { Flex, Box, Text, Icon } from '@chakra-ui/react';
// import { redirect } from 'next/navigation'




// // const API_URL = process.env.REACT_APP_API_URL;

// const API_URL = 'http://localhost:5005';


// function LogInPage() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [message, setMessage] = useState(undefined);
//   const [loggedInUser, setLoggedInUser] = useState(undefined);
//   const { isLoggedIn, user, storedToken, storeToken, authenticateUser } = useAuth();

// //   const { storeToken, authenticateUser } = useContext(AuthContext);

//   const handleEmail = (e) => setEmail(e.target.value);
//   const handlePassword = (e) => setPassword(e.target.value);


  
//   // Assuming you have a `isAuthenticated` state that turns `true` when the user is authenticated
//   // const { isAuthenticated } = useContext(AuthContext);

//   const handleSubmitLogin = (e) => {
//     e.preventDefault();
//     const requestBody = { email, password };

//     axios
//       .post(`${API_URL}/auth/login`, requestBody)
//       .then(async (response) => {

//         try {
//             console.log('Success! ', response)
//             storeToken(response.data.authToken);
//             // console.log('here is the token: ', response.data.authToken)
//             //do we need this?
//             setLoggedInUser(response.data.userId);
//             redirect("/");
//         } catch (error){
// console.error('Error during authentication: ', error)
//         } finally {
//             await authenticateUser();
//     }
//   })
//       .catch((error) => {
//         console.error(error.response);
//       });
//   };

//   return (
//     <Box>
//       <Text fontSize="2xl" fontWeight="bold">Login</Text>
//       <form onSubmit={handleSubmitLogin}>
//        <Flex>

//           <label>Username</label>
//           <input
//             type="text"
//             name="email"
//             value={email}
//             onChange={handleEmail}
//           />
     
//           <label>Password</label>
//           <input
//             type="password"
//             name="password"
//             value={password}
//             onChange={handlePassword}
//           />

// </Flex>
//           <button type="submit">Submit</button>
        
//       </form>
//       {message && (
//         <div>
//           <p>{message}</p>
//         </div>
//       )}

//       <Text>Do not have an account yet?</Text>
//       <Link href="/signUpPage" passHref> Sign Up</Link>
//       </Box>
//   );
// }

// export default LogInPage;


// import { useAuth } from '../auth.context';
import axios from 'axios';
import { Box, Text } from '@chakra-ui/react';
import { FormEvent } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link';


// // const API_URL = process.env.REACT_APP_API_URL;

const API_URL = 'http://localhost:5005';
 
export default function LoginPage() {
  const router = useRouter()
 
  async function handleSubmit(event) {
    event.preventDefault()
 
    const formData = new FormData(event.currentTarget)
    const email = formData.get('email')
    const password = formData.get('password')

    const requestBody = { email, password };

// console.log('submitting form')
 
    const response = await axios
    .post(`${API_URL}/auth/login`, requestBody)

 console.log(response.data);
    if (response.status == 200) {
        console.log('Logged in!', response);
        const token= response.data.authToken;
        localStorage.setItem('authToken', token);
      router.push('/')
    } else {
        console.log('Login failed.')
        console.error(response);
}
  }
 
  return (
    <Box>
    <form onSubmit={handleSubmit}>
      <input type="email" name="email" placeholder="Email" required />
      <input type="password" name="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
    
      <Text>Do not have an account yet?</Text>
      <Link href="/signUpPage" passHref> Sign Up</Link>
      </Box>
  )
}

