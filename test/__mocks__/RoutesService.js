import Route from "../src/Route";

class RoutesService {
    constructor(){
        // Simula la base de datos
        this.routesArray = [];
        this.initializeBD();
    }
    
    initializeBD() {
        let r1 = new Route("12345678D", "Ruta1", "Ruta de pruebas", null, null);
        let r2 = new Route("12345678E", "Ruta2", "Ruta de pruebas2", null, null);
        let r3 = new Route("12345678F", "Ruta3", "Ruta de pruebas3", null, null);
    
        this.routesArray = [...this.routesArray, r1];
        this.routesArray = [...this.routesArray, r2];
        this.routesArray = [...this.routesArray, r3];
    }

    getRoutes() {
        return this.routesArray;
    }

    deleteRoute() {
        
    }
}

