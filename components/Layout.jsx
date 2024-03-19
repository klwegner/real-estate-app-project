import Head from 'next/head';
import { Box } from '@chakra-ui/react';
import Navbar from './Navbar';

const Layout = ({ children }) => (
    <>
        <Head>
            <title>Real Estate Hunter</title>
        </Head>
        <Box maxW="1280" m="auto">
            <header>
                <Navbar/>
            </header>
            <main>
                {children}
            </main>
            <footer>
                Footer
            </footer>
        </Box>
    </>
)


export default Layout;