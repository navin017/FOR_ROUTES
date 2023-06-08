import React from 'react'
import { useSelector } from 'react-redux'
import { ProductComponent } from './productComponent'

export const ProductList = () => {
  const product = useSelector((state) => state)
  return (
    <div>
      <ProductComponent />
    </div>
  )
}


