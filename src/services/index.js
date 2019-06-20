import ApiService from './api-service'
// набор различных сервисов для удобства управления всем приложением.
class ServiceContainer {
    constructor(store) {
        this.api= new ApiService(store);
        return {
            api: this.api
        }
    }

}
export default ServiceContainer;