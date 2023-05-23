import styled from 'styled-components'

let Input = styled.input`
  width: ${props => props.info.width};
  height: ${props => props.info.height};
  display: ${props => props.info.display};
  background-color: ${props => props.info.background_color};
  border: ${props => props.info.border};
  border-radius: ${props => props.info.border_radius};
  padding: ${props => props.info.padding};
  border-bottom: ${props => props.info.border_bottom};
`

let TextWithInput = styled.p`
  color: ${props => props.info.color};
  font-size: ${props => props.info.fontSize};
  position: relative;
  top: ${props => props.info.top};
  right: ${props => props.info.right};
  bottom: ${props => props.info.bottom};
  left: ${props => props.info.left};
`


export { Input, TextWithInput }
