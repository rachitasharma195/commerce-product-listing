import React from 'react';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Dropdown } from 'primereact/dropdown';
import '../css/DataViewDemo.css';
import Product_1 from '../images/Product_1.jpeg';
import Product_2 from '../images/Product_2.jpeg';
import Product_3 from '../images/Product_3.jpeg';
import Product_4 from '../images/Product_4.jpeg';
import Product_5 from '../images/Product_5.jpeg';
import Product_6 from '../images/Product_6.jpeg';
import Product_7 from '../images/Product_7.jpeg';
import Product_8 from '../images/Product_8.jpeg';
import { products } from '../data/products.jsx';

class Listings extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            products: products.data,     
            filteredProducts: null,
            typeFilter: null,
            layout: 'grid'
        };

        this.filterOptions = [
            {label: 'Beer', value: 'Beer'},
            {label: 'Wine', value: 'Wine'},
            {label: 'Spirits', value: 'Spirits'},
            {label: 'Cider', value: 'Cider'},
        ];

        this.itemTemplate = this.itemTemplate.bind(this);
        this.onFilterChange = this.onFilterChange.bind(this);
    }

    onFilterChange(event) {
        const value = event.value;
        if(value) {
            var filteredProducts = this.state.products.filter(item => item.type === value);
            this.setState({
                filteredProducts: filteredProducts,
                typeFilter: value
            });
        } else {
            this.setState({
                filteredProducts: null,
                typeFilter: null
            })
        }
    }
    
    itemTemplate(product, layout) {
        if (!product) {
            return;
        }

        if (layout === 'list')
            return this.renderListItem(product);
        else if (layout === 'grid')
            return this.renderGridItem(product);
    }

    getImage(productImage) {
        if(productImage === 'Product_1.jpeg') {
            return Product_1;
        } else if(productImage === 'Product_2.jpeg') {
            return Product_2;
        } else if(productImage === 'Product_3.jpeg') {
            return Product_3;
        } else if(productImage === 'Product_4.jpeg') {
            return Product_4;
        } else if(productImage === 'Product_5.jpeg') {
            return Product_5;
        } else if(productImage === 'Product_6.jpeg') {
            return Product_6;
        } else if(productImage === 'Product_7.jpeg') {
            return Product_7;
        } else if(productImage === 'Product_8.jpeg') {
            return Product_8;
        } 
    }

    renderListItem(data) {
        const image = this.getImage(data.productImage);
        return (
            <div className="p-col-12">
                <div className="product-list-item">
                    <img src={image} alt={data.productName} />  
                    <div className="product-list-detail">
                        <div className="product-name">{data.productName}</div>
                        <i className="pi pi-tag product-category-icon"></i><span className="product-category">{data.type}</span>
                    </div>
                    <div className="product-list-action">
                        <span className="product-price">${data.price}</span>
                        { data.isSale && 
                            <span className={`product-badge`}>SALE</span>
                        }
                    </div>
                </div>
            </div>
        );
    }

    renderGridItem(data) {
        const image = this.getImage(data.productImage);
        return (
            <div className="p-col-12 p-md-4">
                <div className="product-grid-item card">
                    <div className="product-grid-item-top">
                        <div>
                            <i className="pi pi-tag product-category-icon"></i>
                            <span className="product-category">{data.type}</span>
                        </div>
                        {/* <span className={`product-badge status-${data.inventoryStatus.toLowerCase()}`}>{data.inventoryStatus}</span> */}
                        { data.isSale && 
                            <span className={`product-badge`}>SALE</span>
                        }
                    </div>
                    <div className="product-grid-item-content">
                        <img src={image} alt={data.productName} />
                        <div className="product-name">{data.productName}</div>
                    </div>
                    <div className="product-grid-item-bottom">
                        <span className="product-price">${data.price}</span>
                    </div>
                </div>
            </div>
        );
    }

    renderHeader() {
        return (
            <div className="p-grid p-nogutter">
                <div className="p-col-6" style={{textAlign: 'left'}}>
                    <Dropdown options={this.filterOptions} value={this.state.typeFilter} optionLabel="label" placeholder="Filter by " onChange={this.onFilterChange} showClear />
                </div>
                <div className="p-col-6" style={{textAlign: 'right'}}>
                    <DataViewLayoutOptions layout={this.state.layout} onChange={(e) => this.setState({ layout: e.value })} />
                </div>
            </div>
        );
    }

    render() {
        const header = this.renderHeader();
        const productsList = this.state.filteredProducts ? this.state.filteredProducts : this.state.products;
        return (
            <div className="dataview-demo">
                <div className="card">
                    <DataView 
                        value={productsList} 
                        layout={this.state.layout} 
                        header={header}
                        itemTemplate={this.itemTemplate} 
                        paginator 
                        rows={9}
                    />
                </div>
            </div>
        );
    }
}
export default Listings;
