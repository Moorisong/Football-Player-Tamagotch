import styled from 'styled-components'

let ApplyBtn = styled.button`
  background-color: ${props => props.info.bg};
  color: ${props => props.info.color};
  width: ${props => props.info.width};
  height: ${props => props.info.height};
  margin: auto;
  position: relative;
  top: ${props => props.info.top};
  right: ${props => props.info.right};
  left: ${props => props.info.left};
  bottom:
  border-radius: 4px;
  font-size: ${props => props.info.fontSize};
  font-weight: ${props => props.info.fontWeight};
`

export { ApplyBtn }
