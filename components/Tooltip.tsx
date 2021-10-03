import styled from 'styled-components'

const Tooltip = styled.div`
  position: relative;
  display: inline-block;

  .text {
    width: 120px;
    top: 120%;
    left: -50px;
    text-overflow: ellipsis;
    white-space: normal;
    word-break: break-all;
    text-align: center;
    overflow: hidden;
    font-size: 14px;
    font-weight: 700;
    visibility: hidden;
    opacity: 0;
    background-color: rgba(0, 0, 0, 0.7);
    color: #fff;
    padding: 5px;
    border-radius: 6px;
    position: absolute;
    z-index: 2;
    transition: all 0.2s ease;
  }

  &:hover {
    .text {
      visibility: visible;
      opacity: 1;
    }
  }
`

export default Tooltip
