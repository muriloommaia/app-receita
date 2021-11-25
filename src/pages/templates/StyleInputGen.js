import styled from "styled-components"
import tw from "twin.macro"

const StyleInputGen = styled.div.attrs({
  className: "flex text-icons",
})`
  & {
    span {
      ${tw`text-sm font-bold text-gray-700 tracking-wide text-icons`}
    }
    input {
      ${tw``}
    }
    label {
      ${tw`flex flex-row-reverse items-center`}
    }
  }
`
export default StyleInputGen