import styled from "styled-components"
import tw from "twin.macro"

const StyleInputGen = styled.div.attrs({
  className: "flex",
})`
  & {
    span {
      ${tw`text-sm font-bold text-gray-700 tracking-wide`}
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