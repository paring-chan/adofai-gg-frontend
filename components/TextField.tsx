import styled from 'styled-components'

const TextField = styled.input`
  background: rgba(255, 255, 255, 0.3);
  border-style: none;
  border-radius: 5px;
  padding: 5px 5px 5px 10px;
  font-family: Quicksand, sans-serif;
  font-weight: 300;
  font-size: 15px;
  color: #fff;

  &::placeholder {
    color: white;
    opacity: 0.7;
  }
`

export default TextField
