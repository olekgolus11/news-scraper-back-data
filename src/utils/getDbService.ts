import DbType from "../interfaces/DbType";
import DbService from "../services/DbService";
import MongoDbService from "../services/MongoDbService";
import { dbType } from "./environments";

interface ClassDefinition {
    serviceClass: DbService;
}

const dbServices: Map<string, ClassDefinition> = new Map<DbType, any>([
    [
        "mongodb",
        {
            serviceClass: MongoDbService,
        },
    ],
]);

const getDbService = (): DbService => {
    const loadedService = dbServices.get(dbType);
    if (!loadedService) {
        throw new Error("Invalid service requested");
    }
    const { serviceClass } = loadedService;
    if (!serviceClass) {
        throw new Error(`Service class ${dbType} loaded not correctly`);
    }

    return new (serviceClass as any)();
};

export default getDbService;
