import { useCallback, useEffect, useState, useRef } from 'react'
import './App.css'

function App() {
  const [length, setLngth] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [characterAllowed, setCharacterAllowed] = useState(false);
  const [password, setPassword] = useState('');

  const passwordRef = useRef(null);

  const generatePassword = useCallback(() => {
    let pass = ''
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    if (numberAllowed) str += '0123456789'
    if (characterAllowed) str += '!@#$%^&*_+'

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass = pass + str.charAt(char)
    }

    setPassword(pass);
  }, [length, numberAllowed, characterAllowed, setPassword])

  useEffect(() => {
    generatePassword()
  }, [length, numberAllowed, characterAllowed, generatePassword])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0, 99)
    window.navigator.clipboard.writeText(password)
  },[password])

  return (
    <div className='w-full mx-w-md mx-auto shadow-md rounded-lg px-4 py-5 my-8 text-orange-500 bg-gray-800'>

      <h1 className='text-white text-center'> Password Generator</h1>

      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input
          type='text'
          value={password}
          className='outline-none w-full py-1 px-3'
          placeholder="password"
          readOnly
          ref={passwordRef}
        ></input>
        <button 
          className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
          onClick={copyPasswordToClipboard}
        >copy</button>
      </div>

      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input
            type="range"
            min={8}
            max={100}
            value={length}
            className='cursor-pointer'
            onChange={(e) => setLngth(e.target.value)}
          />
          <label >Length : {length}</label>
        </div>

        <div className='flex items-center gap-x-1'>
          <input
            type="checkbox"
            defaultChecked={numberAllowed}
            id='numberInput'
            name='numberInput'
            onChange={() => setNumberAllowed((prev) => !prev)}
          />
          <label htmlFor='numberInput'>Numbers</label>
        </div>

        <div className='flex items-center gap-x-1'>
          <input
            type="checkbox"
            defaultChecked={numberAllowed}
            id='characterInput'
            name='characterInput'
            onChange={() => setCharacterAllowed((prev) => !prev)}
          />
          <label htmlFor='characterInput'>Character</label>
        </div>

      </div>
    </div>
  )
}

export default App
