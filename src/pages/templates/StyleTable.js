import styled from "styled-components"
import tw from "twin.macro"

const StyleTable = styled.div.attrs({
  className: "shadow border-b border-gray-200 sm:rounded-lg w-full ",
})`
  & {
    th {
      ${tw`px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider`}
    }
    tbody {
      ${tw`bg-white divide-y divide-gray-200`}
    }
    thead {
      ${tw`bg-gray-700`}
    }
    td {
      ${tw`px-6 py-4 whitespace-nowrap h-10 overflow-y-auto`}
    }
    table {
      ${tw`min-w-full divide-y divide-gray-200 md:w-3/12`}
    }
  }
`
export default StyleTable