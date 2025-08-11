'use client';

import * as React from 'react';
import { Input } from "@/components/ui/input"
import {Button} from "@/components/ui/button"
import { SendHorizontal } from 'lucide-react';

interface IMessage {
  role: 'assistent' | 'user';
  content ?: string;
  documents ?: string[]
}

const ChatComponent: React.FC = () => {

  const [message, setMessage] = React.useState<string>('');
  const [messages, setMessages] = React.useState<IMessage[]>([]);

  const handleClick = async ()=>{
    setMessages(prev => [...prev, {role: 'user', content: message}])
    const res = await fetch(`http://localhost:9323/chat`, {
      method: 'GET',
      body: JSON.stringify({message})
    })
    const data = await res.json()
    console.log(data)
  }

  return(
    <div className='p-5'>
      <div className='fixed bottom-6 w-200 flex flex-row'>
        <Input value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Ask a question" type='text' className="bg-white text-black cursor-pointer h-10" />
        <Button disabled={!message.trim()} onClick={handleClick} className='border-white cursor-pointer'>
          <SendHorizontal className='cursor-pointer size-8'/>
        </Button>
      </div>
    </div>
  )
}

export default ChatComponent