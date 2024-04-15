
import { Button } from '@chakra-ui/react';
import { useRouter } from 'next/router';

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = () => {
    console.log("logging out?");
    localStorage.removeItem("authToken");
    router.push("/");
  };

  return (
    <Button onClick={handleLogout}>Logout</Button>
  );
};

export default LogoutButton;
