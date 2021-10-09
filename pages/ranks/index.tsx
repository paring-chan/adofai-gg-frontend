import React, { Reducer } from 'react'
import Content from '../../components/layout/Content'
import ScrollButton from '../../components/ScrollButton'
import styled from 'styled-components'
import { api } from '../../utils/request'
import { CircularProgress } from '@mui/material'
import InfiniteScroll from 'react-infinite-scroll-component'
import RankingItem from '../../components/ranking/RankingItem'
import { NextPage } from 'next'

const Title = styled.div`
  margin-top: 40px;
  display: flex;
  font-size: 2em;
  width: 100%;
  margin-bottom: 10px;
`

const Rankings: NextPage = () => {
  const reduce: Reducer<any, any> = (state, action) => {
    switch (action.type) {
      case 'FETCH_REQUEST':
        return {
          ...state,
          isLoading: true
        }

      case 'FETCH_RESULT':
        return {
          ...state,
          isLoading: false,
          items: action.items
        }

      case 'FETCH_ERROR':
        return {
          ...state,
          isLoading: false,
          error: action.error
        }

      case 'HAS_MORE_ITEMS':
        return {
          ...state,
          hasMore: action.hasMore
        }

      case 'ITEM_COUNT':
        return {
          ...state,
          itemCount: action.itemCount
        }

      default:
        return state
    }
  }

  const [state, dispatch] = React.useReducer(reduce, {
    isLoading: false,
    isError: null,
    hasMore: true,
    itemCount: 0,
    items: null
  })

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_RESULT', items: null })
        dispatch({ type: 'FETCH_ERROR', error: null })
        dispatch({ type: 'FETCH_REQUEST' })

        const response = await api.get<{ results: any[]; count: number }>(
          '/api/v1/ranking',
          {
            params: {
              offset: 0,
              amount: 30
            }
          }
        )

        dispatch({ type: 'FETCH_RESULT', items: response.data.results })
        dispatch({ type: 'ITEM_COUNT', itemCount: response.data.count })
      } catch (e) {
        dispatch({ type: 'FETCH_ERROR', error: e })
      }
    }

    fetchData()
  }, [])

  const fetchMoreData = async () => {
    if (state.items.length >= state.itemCount) {
      dispatch({ type: 'HAS_MORE_RANKING', hasMore: false })
      return
    }

    try {
      dispatch({ type: 'FETCH_ERROR', error: null })

      const response = await api.get<{ results: any[] }>('/api/v1/ranking', {
        params: {
          offset: state.items.length,
          amount: 30
        }
      })

      dispatch({
        type: 'FETCH_RESULT',
        items: state.items.concat(response.data.results)
      })
    } catch (e) {
      dispatch({ type: 'FETCH_ERROR', error: e })
    }
  }

  return (
    <Content
      style={{ maxWidth: 1080, marginLeft: 'auto', marginRight: 'auto' }}
    >
      <ScrollButton />
      <Title>Ranking</Title>
      <div style={{ overflow: 'hidden', width: '100%' }}>
        {state.isLoading ? (
          <CircularProgress />
        ) : !state.items ? null : state.isError ? (
          <h2>Oops! An error occurred.</h2>
        ) : (
          <InfiniteScroll
            next={fetchMoreData}
            hasMore={state.hasMore}
            loader={<></>}
            dataLength={state.items.length}
          >
            {(state.items as any[]).map((x, i) => (
              <RankingItem item={x} idx={i} key={i} />
            ))}
          </InfiniteScroll>
        )}
      </div>
    </Content>
  )
}

export default Rankings
