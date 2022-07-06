import React from 'react'
import styled from 'styled-components'
import { useWeb3Context } from 'web3-react'

import Button from './Button'
import { useAppContext } from '../context'
import { TRADE_TYPES } from '../utils'
import { ethers } from 'ethers'

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

// const Shim = styled.div`
//   width: 2rem !important;
//   height: 2rem;
// `

export default function BuyButtons({ balanceSOCKS }) {
  const { account } = useWeb3Context()
  const [, setState] = useAppContext()

  function handleToggleCheckout(tradeType) {
    setState(state => ({ ...state, visible: !state.visible, tradeType }))
  }

  return (
    <BuyButtonFrame>
      <ButtonFrame
        disabled={
          account === null || !balanceSOCKS || balanceSOCKS.lt(ethers.BigNumber.from(10).pow(ethers.BigNumber.from(18)))
        }
        text={'Redeem'}
        type={'cta'}
        onClick={() => {
          handleToggleCheckout(TRADE_TYPES.REDEEM)
        }}
      />
    </BuyButtonFrame>
  )
}
