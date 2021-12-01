import MsgList from '../components/MsgList'
import fetcher from '../fetcher'
import { GetServerSideProps } from 'next'

enum METHOD {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  DELETE = 'delete'
}

interface User {
  id: string
  nickname: string
}

interface Users {
  [key: string]: User
}

interface Messages {
  id: string,
  userId: string,
  timestamp: number,
  text: string
}


const Home = ({ smsgs, users }:{smsgs:Messages[]; users:Users}) => (
  <>
    <h1>하 이</h1>
    <MsgList smsgs={smsgs} users={users}/>
  </>
)


export const getServerSideProps: GetServerSideProps  = async () => {
  const smsgs = await fetcher(METHOD.GET, '/messages')
  const users = await fetcher(METHOD.GET, '/users')
  return {
    props: { smsgs, users },
  }
}


export default Home