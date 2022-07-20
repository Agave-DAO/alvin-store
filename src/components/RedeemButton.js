import React from 'react'
import styled from 'styled-components'

import Button from './Button'
import { useAppContext } from '../context'
import { TRADE_TYPES } from '../utils'

const BuyButtonFrame = styled.div`
  margin: 0.5rem 0rem 0.5rem 0rem;
  display: flex;
  align-items: center;
  flex-direction: center;
  flex-direction: row;
  color: ${props => props.theme.black};

  div {
    width: 100%;
  }

  @media only screen and (max-width: 480px) {
    /* For mobile phones: */
    /* margin: 1.5rem 2rem 0.5rem 2rem; */
  }
`
const ButtonFrame = styled(Button)`
  width: 100%;
`

const Shim = styled.div`
  width: 1rem !important;
  height: 1rem;
`

export default function RedeemButton({ balanceALVIN }) {
  const [, setState] = useAppContext()

  function handleToggleCheckout(tradeType) {
    setState(state => ({ ...state, visible: !state.visible, tradeType }))
  }

  return (
    <BuyButtonFrame>
      <ButtonFrame
        disabled={false}
        text={'Buy'}
        type={'secondary'}
        onClick={() => {
          handleToggleCheckout(TRADE_TYPES.BUY)
        }}
      />
      <Shim />
      <ButtonFrame
        disabled={balanceALVIN > 0 ? false : true}
        text={'Sell'}
        type={'secondary'}
        onClick={() => window.open("https://app.honeyswap.org/#/swap?outputCurrency=0x50dbde932a94b0c23d27cdd30fbc6b987610c831")}
      />
    </BuyButtonFrame>
  )
}
