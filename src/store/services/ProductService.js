import configuration from '../configuration'


class ProductService {

    GetAllProducts(){
        return configuration.get(`/all`)
    }
    SearchProductsService(ProductName){
        return configuration.get(`/products/search/<ProductName>?ProductName=${ProductName}`)

    }
    AddNewProductService(Product){
        return configuration.post(`/<productname>/add`,JSON.stringify(Product));
    }

    UpdateProductStatusService(productStatus,id){
        return configuration.put(`/<productname>/update/<id>?productStatus=${productStatus}&id=${id}`);
    }
    DeleteProductService(id){
        return configuration.delete(`/<productname>/delete/<id>?id=${id}`);
        
    }
  
}


export default new ProductService(); 