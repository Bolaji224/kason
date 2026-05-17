import React from 'react'
import ChatBox from './components/ChatBox'

const Message: React.FC = () => {
  return (
    <div className="fixed inset-0 top-[8rem] md:left-64">
      <ChatBox />
    </div>
  )
}

export default Message