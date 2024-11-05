
import { offer,order,product,dashboard, revanue, addToCart, profile, pending, delivery } from "../Assets"


export const nav_bar=[
    {img:dashboard,label:'DashBoard',path:''},
    {img:order,label:'Order',path:'order'},
    {img:product,label:'Product',path:'product'},
    {img:offer,label:'Offer',path:'offer'},
]
export const inventory_title=[
    {label:'Total Product',number:'80'},
    {label:'Categories',number:'90'},
    {label:'Total Items',number:'20'},
    {label:'Out Of Stock',number:'30'},
]
export const ProductCategory=[
    {label:'All'},
    {label:'All'},
    {label:'All'},
    {label:'All'},
]
export const ProductSort=[
    {label:'Newest'},
    {label:'Newest'},
    {label:'Newest'},
    {label:'Newest'},
]
export const Inventory_items=[
    {id:'1',code:'001',name:'product1',category:'phone',brand:'iphone',inventory:'10',price:'1000'},
    {id:'2',code:'002',name:'product2',category:'phone',brand:'iphone',inventory:'10',price:'1000'},
    {id:'3',code:'003',name:'product3',category:'phone',brand:'iphone',inventory:'10',price:'1000'},
    {id:'4',code:'004',name:'product4',category:'phone',brand:'iphone',inventory:'10',price:'1000'},
    {id:'5',code:'005',name:'product5',category:'phone',brand:'iphone',inventory:'10',price:'1000'},
]
export const dashBoradMain_item=[
    {title:'Total Revenue',sort:'Last 30 Days',price:'999$',img:revanue},
    {title:'Total Order',sort:'Last 30 Days',price:'1000',img:addToCart},
    {title:'Total Costumer',sort:'Last 30 Days',price:'100',img:profile}
]
export const tableHead=['ID','Product ID','Product Name','Category','Inventory','Price'];
export const tableInfor=[
    {id:'1',productCode:'001',productName:'phone',category:'phone',inventory:'11',price:100},
    {id:'1',productCode:'001',productName:'phone',category:'phone',inventory:'11',price:100},
    {id:'1',productCode:'001',productName:'phone',category:'phone',inventory:'11',price:100},
    {id:'1',productCode:'001',productName:'phone',category:'phone',inventory:'11',price:100},
    {id:'1',productCode:'001',productName:'phone',category:'phone',inventory:'11',price:100},
    {id:'1',productCode:'001',productName:'phone',category:'phone',inventory:'11',price:100},
    {id:'1',productCode:'001',productName:'phone',category:'phone',inventory:'11',price:100},
    {id:'1',productCode:'001',productName:'phone',category:'phone',inventory:'11',price:100},
    {id:'1',productCode:'001',productName:'phone',category:'phone',inventory:'11',price:100},
    {id:'1',productCode:'001',productName:'phone',category:'phone',inventory:'11',price:100},
    {id:'1',productCode:'001',productName:'phone',category:'phone',inventory:'11',price:100},
    {id:'1',productCode:'001',productName:'phone',category:'phone',inventory:'11',price:100}
]

export const order_header=[
    {img:addToCart,title:'35 Order'},
    {img:pending ,title:'35 Pending'},
    {img:delivery,title:'35 Delivery'}
]
export const offer_header=[
    {label:"Product ID"},
    {label:"Product Name"},
    {label:"Discount"},
    {label:"Start"},
    {label:"End"}
]