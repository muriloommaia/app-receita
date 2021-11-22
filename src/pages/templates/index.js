import tw from 'tailwind-styled-components';

export const Select = tw.select`
lock appearance-none w-1/2 bg-gray-200 border border-gray-400 text-gray-700 py-3 md:px-1 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 md:w-3/12 text-center cursor-pointer
`

export const Button = tw.button`
bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 border border-gray-700 rounded disabled:opacity-80
`
export const Input = tw.input`
border-gray-300 border-solid border rounded py-2 px-4 flex-grow
`