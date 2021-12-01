import { useState, useEffect } from 'react'
import MsgItem from './MsgItem'
import MsgInput from './MsgInput'
import fetcher from '../fetcher'
import { useRouter } from 'next/router'


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

enum METHOD {
    GET = 'get',
    POST = 'post',
    PUT = 'put',
    DELETE = 'delete'
}

type mutateType = (text: string) => void 
type upDateType = (text: string, id: string) => void 
type deleteType = (id: string) => void


const MsgList = ({ smsgs, users }:{smsgs:Messages[]; users:Users}):JSX.Element => {

    const [msgs, setMsgs] = useState<Messages[]>(smsgs)
    const [editingId, setEditingId] = useState(null)
    const { query } = useRouter()
    const userId = (query.userId || query.userid || '') as string

    const getMessages = async():Promise<void> => {
        const msgs:Messages[] = await fetcher(METHOD.GET, '/messages')
        console.log("msgs", msgs)
        setMsgs(msgs)
    }

    useEffect(()=> {
        getMessages()
    },[])

    const onCreate:mutateType = async(text:string): Promise<void> => {

        const newMsg: Messages[] = await fetcher(METHOD.PUT, `/messages/${userId}`, { text, userId })


        setMsgs(msgs => [...newMsg, ...msgs])
    }

    const doneEdit = ():void => setEditingId(null)

    const onUpdate: upDateType = async(text, id): Promise<void> => {

        const newMsg: Messages[] = await fetcher(METHOD.PUT, `/messages/${id}`, { text, userId })
        if (!newMsg) throw Error('something wrong')
    
        setMsgs(msgs => {
          const targetIndex = msgs.findIndex(msg => msg.id === id)
          if (targetIndex < 0) return msgs
          const newMsgs = [...msgs]
          newMsgs.splice(targetIndex, 1, {
            ...msgs[targetIndex],
            text,
          })
          return newMsgs
        })
        doneEdit()
    }

    const onDelete: deleteType = async(id: string) => {
        const receivedId: string = await fetcher(METHOD.DELETE, `/messages/${id}`, { params: { userId } })
        setMsgs(msgs => {
          const targetIndex = msgs.findIndex(msg => msg.id === receivedId + '')
          if (targetIndex < 0) return msgs
          const newMsgs = [...msgs]
          newMsgs.splice(targetIndex, 1)
          return newMsgs
        })
      }

    return (
        <>
            <MsgInput mutate={onCreate}/>
            <ul className="messages">{
                msgs.map((x:Messages) => 
                    <MsgItem key={x.id} 
                        {...x}
                        onUpdate={onUpdate}
                        startEdit={():void => setEditingId(x.id)}
                        isEditing={editingId === x.id}
                        onDelete={():void => onDelete(x.id)}
                        myId={userId} />
                        )}
            
            </ul>
            
            
        </>
    )
}

export default MsgList