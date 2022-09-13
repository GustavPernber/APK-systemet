import mockRes from './productsMock.json'
import {ProductType} from './types'


async function getProducts(): Promise<ProductType[]> {
    // let result= await fetch(this.endpoint)
    // let products= await result.json()
    // // await this.sleep()
    // return products.result
    let result= mockRes 
    return result as ProductType[]
}


const api={
    endpoint:'https://apk-systemet-api.herokuapp.com/products',

    getProducts
    // sleep(){
    //     return new Promise(resolve => setTimeout(resolve, 6000));
    // },

}

export default api