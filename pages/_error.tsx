import React from 'react'
import styled from 'styled-components'

export const ErrorContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
  font-size: 40px;
`

const Error = () => {
  return <ErrorContainer>Oops! An error occurred.</ErrorContainer>
}

export default Error
