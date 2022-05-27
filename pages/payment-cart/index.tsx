import FlexContainer from '@components/CustomComponent/FlexContainer'
import Page from '@layouts/Page'
import React, { useState } from 'react'
import { CartCheckout, InfoCheckout, TransactionMessage } from '@components/LayoutPaymentCheckout'

const PaymentLogin = () => {
  const [scope, setScope] = useState<string>('cart-checkout')

  const scopeRender = (_scope) => {
    switch (_scope) {
      case 'cart-checkout':
        return <CartCheckout setScope={setScope} />
      case 'cart-info':
        return <InfoCheckout setScope={setScope} />
      case 'transaction-message':
        return <TransactionMessage />
      default:
        return <CartCheckout setScope={setScope} />
    }
  }

  return (
    <Page
      meta={{
        title: "TNR Ecommerce Payment",
        description: "TNR Ecommerce Payment",
        isHomePage: true
      }}
    >
      <FlexContainer>
        {scopeRender(scope)}
      </FlexContainer>
    </Page>
  )
}

export default PaymentLogin