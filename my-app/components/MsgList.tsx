import { useState } from 'react'
import MsgItem from './MsgItem'
import MsgInput from './MsgInput'


interface Messages {
    id:number,
    userId:string,
    timestamp:number,
    text:string
}

type mutateType = (text: string) => void 
type upDateType = (text: string, id:number) => void 


const UserIds: string[] = ['ray', 'jay']

const getRandomUserId = ():string => UserIds[Math.round(Math.random())]

const originalMsgs = Array(10).fill(0).map((_, index: number): Messages => ({
    id: index + 1,
    userId: getRandomUserId(),
    timestamp:1234567890123 + index * 1000 * 60,
    text: `${index + 1} mock text`
})) 

const MsgList = ():JSX.Element => {

    const [msgs, setMsgs] = useState(originalMsgs)
    const [editingId, setEditingId] = useState(null)

    const onCreate:mutateType = (text:string): void => {

        const newMsg: Messages = {
          id: msgs.length + 1,
          userId: getRandomUserId(),
          timestamp: Date.now(),
          text: `${msgs.length + 1} ${text}`,
        }

        setMsgs(msgs => [newMsg, ...msgs])
    }

    const doneEdit = ():void => setEditingId(null)

    const onUpdate: upDateType = (text, id):void => {

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
                    />)
            }</ul>
        </>
    )
}

export default MsgList