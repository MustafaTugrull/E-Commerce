import React from 'react'
import Breadcrumb from './BreadCrumb/Breadcrumb'
import SingleContent from './SingleContent'
import ProductTabs from './Tabs/ProductTabs'
import "./SingleProductDetail.css"
import CampaignSingle from '../CampaignSingle/CampaignSingle'

const SingleProductDetail = ({ product }) => {
  return (
    <section className="single-product">
        <div className="container">
            <div className="single-product-wrapper">
                <Breadcrumb />
                <SingleContent product={product}/>
                <ProductTabs />
            </div>
        </div>
        <CampaignSingle />
    </section>
  )
}

export default SingleProductDetail