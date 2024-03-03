import ChatWindow from './Components/ChatWindow'

export function App() {
  return (
    <>
      <div className='flex flex-col justify-center items-center h-screen'>
        <h1 className="text-3xl text-white mb-20">FizzBuzz Bot</h1>
        <ChatWindow />
      </div>
    </>
  )
}
