import styled from "styled-components"
import tw from "twin.macro"

const StyleForm = styled.div.attrs({
  className: " flex flex-col content-center",
})`
  & {
    span {
      ${tw`text-sm font-bold text-gray-700 tracking-wide`}
    }
    input {
      ${tw`w-full text-lg py-2 border border-gray-200 focus:outline-none focus:border-primary ml-0`}
    }
    button {
      ${tw`bg-primary border text-gray-100 p-4 w-full rounded-full tracking-wide
      font-semibold focus:outline-none hover:bg-primary disabled:opacity-50
      shadow-lg border-secondary border-2`}
    }
  }
`
export default StyleForm