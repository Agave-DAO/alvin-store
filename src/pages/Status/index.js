import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useWeb3Context } from 'web3-react'
import { useAppContext } from '../../context'
import { Redirect } from 'react-router-dom'
import { Header } from '../Body'
import Button from '../../components/Button'
import { EtherscanLink } from '../../components/Works'

const OrderDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 2rem;
  border: 1px solid black;
  margin-bottom: 1rem;
`

export default function Body({ alvinRedeemed, totalSupply, ready, balanceALVIN }) {
  const [state] = useAppContext()
  const { library, account } = useWeb3Context()

  const [signature, setSignature] = useState()
  const [timestamp, setTimestamp] = useState()

  const [data, setData] = useState()
  const [error, setError] = useState()

  function sign() {
    const timestampToSign = Math.round(Date.now() / 1000)
    const signer = library.getSigner()
    const message = `This signature is proof that I control the private key of ${account} as of the timestamp ${timestampToSign}.\n\n It will be used to access my ALVIN plushies order history.`
    signer.signMessage(message).then(returnedSignature => {
      setTimestamp(timestampToSign)
      setSignature(returnedSignature)
    })
  }

  useEffect(() => {
    if (account && signature && timestamp) {
      fetch('/.netlify/functions/getEntries', {
        method: 'POST',
        body: JSON.stringify({ address: account, signature: signature, timestamp: timestamp })
      }).then(async response => {
        if (response.status !== 200) {
          const parsed = await response.json().catch(() => ({ error: 'Unknown Error' }))
          console.error(parsed.error)
          setError(parsed.error)
        } else {
          const parsed = await response.json()
          setData(parsed)
        }
      })

      return () => {
        setError()
        setData()
        setTimestamp()
        setSignature()
      }
    }
  }, [account, signature, timestamp])

  if (!account) {
    return <Redirect to={'/'} />
  } else {
    return (
      <AppWrapper overlay={state.visible}>
        <Header alvinRedeemed={alvinRedeemed} totalSupply={totalSupply} ready={ready} balanceALVIN={balanceALVIN} setShowConnect={() => {}} />
        <Content>
          <p>
            You can use this page to check the status of your plushies order, please bookmark it for future reference.
          </p>

          {error && <p>Error</p>}

          <Button text={'Access my order history'} disabled={!!data} onClick={sign} />
          <br />
          {data &&
            (data.length === 0 ? (
              <p>No orders found.</p>
            ) : (
              data.map((d, i) => {
                return (
                  <OrderDiv key={i}>
                    <ul>
                      <li>
                        Order Date:{' '}
                        {new Date(Number(d.timestamp) * 1000).toLocaleDateString(undefined, {
                          dateStyle: 'long',
                          timeStyle: 'short'
                        })}
                      </li>
                      <li>ALVIN Redeemed: {d.numberOfAlvins}</li>
                      <li>
                        Status:{' '}
                        {d.invalid
                          ? 'Invalid Order'
                          : d.matched
                          ? d.shippingId
                            ? 'Shipped!'
                            : 'Processing Order'
                          : 'Order Received'}
                      </li>
                      {d.shippingId && (
                        <li>
                          Shipping Id:{' '}
                            {d.shippingId}
                        </li>
                      )}
                    </ul>
                    {d.NFTTransactionHash && (
                      <EtherscanLink
                        style={{ marginBottom: '.5rem' }}
                        href={`https://gnosisscan.io/tx/${d.NFTTransactionHash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View ERC-721 Transaction
                      </EtherscanLink>
                    )}
                  </OrderDiv>
                )
              })
            ))}
          <p style={{ fontSize: '.75rem', textAlign: 'center' }}>
            Problem with an order?{' '}
            <a
              href={`mailto:alvinshipments@gmail.com?Subject=Alvin%20Order%20for%20${account}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Email us
            </a>
            .{' '}
          </p>
        </Content>
      </AppWrapper>
    )
  }
}

const AppWrapper = styled.div`
  width: 100vw;
  height: 100%;
  margin: 0px auto;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  scroll-behavior: smooth;
  position: ${props => (props.overlay ? 'fixed' : 'initial')};
`

const Content = styled.div`
  width: calc(100vw - 32px);
  max-width: 375px;
  margin-top: 72px;
`
