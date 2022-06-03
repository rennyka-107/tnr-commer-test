import FlexContainer from '@components/CustomComponent/FlexContainer'
import Page from '@layouts/Page'
import React, { useEffect, useState } from 'react'
import { CartCheckout, InfoCheckout, InfoCustomNoLogin, TransactionMessage } from '@components/LayoutPaymentCheckout'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { getProducById } from '../api/productsApi'
import { getCart } from '../../store/cartSlice'
// import { ItemDetailCol, PaymentMethods, TableQuote, BillingInfo, BuyerInFoCustomer } from '@components/LayoutPayment'

const PaymentLogin = () => {
  const [scope, setScope] = useState<string>('cart-checkout')
  // const [billing, setBilling] = useState<number>(1)
  // const [payMethod, setPayMethod] = useState<number>(1)

  const dispatch = useDispatch()

  const router = useRouter()
  const id = router.asPath.split('/')[2]

  useEffect(() => {
    (async () => {
      try {
        if (id) {
          const data = await getProducById(id)
          dispatch(getCart(data.responseData))
        }
      } catch (error) {
        // throw new Error(error)
        console.log('error', error)
      }
    })();
  }, [dispatch, id])


  const scopeRender = (_scope) => {
    switch (_scope) {
      case 'cart-checkout':
        return <CartCheckout setScope={setScope} />
      case 'cart-info':
        return <InfoCheckout setScope={setScope} />
      case 'cart-info-no-login':
        return <InfoCustomNoLogin setScope={setScope} />
      case 'transaction-message':
        return <TransactionMessage />
      default:
        return <CartCheckout setScope={setScope} />
    }
  }
  // return (
  //   <BillingInfo billing={billing} setBilling={setBilling} />
  // <PaymentMethods payMethod={payMethod} setPayMethod={setPayMethod} />
  // <TableQuote width={445} urlPayment={'/home'} />
  // <ItemDetailCol />
  // <BuyerInFoCustomer />
  // )

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