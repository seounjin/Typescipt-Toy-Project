import { AppProps } from 'next/app'
import MsgList from '../components/MsgList'

// function App({ Component, pageProps }: AppProps) {
//   return <Component {...pageProps} />
// }

// export default App

const Home = ():JSX.Element => (
    <>
        <h1>하이</h1>
        <MsgList/>
    </>
)

export default Home