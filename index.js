const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
require("colors");
/**
 * Represents a gRPC server.
 */
class KgRPC {
    /**
     * Default options for loading a proto file.
     * @type {object}
     */
    static defaultProtoLoadingOptions = {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true,
    };
    server;

    /**
     * Creates a new KgRPC instance.
     * @param {object} [configs] - Optional configurations for the server.
     */
    constructor(configs) {
        this.server = new grpc.Server();
    }

    /**
     * Binds and starts an insecure gRPC server.
     * @param {string} hostAndPort - The host and port to bind the server to.
     * @returns {void}
     */
    createInsecureServer(hostAndPort) {
        this.server.bindAsync(
            hostAndPort,
            grpc.ServerCredentials.createInsecure(),
            (err, port) => {
                if (err) {
                    console.error("Error starting server:".bgRed, err);
                } else {
                    console.log("Server started on port:".rainbow, port);
                }
            }
        );
    }

    /**
     * Adds a gRPC service to the server.
     * @param {string} protoFile - The path to the proto file.
     * @param {*} protoMessagesPackage - The package containing the service definition.
     * @param {string} serviceName - the name of the service that carry the methods
     * @param {object} methods - The service methods to add.
     * @param {object} [protoLoadingOptions] - Optional proto loading options.
     * @returns {void}
     */
    addService(
        protoFile,
        protoMessagesPackage,
        serviceName,
        methods,
        protoLoadingOptions
    ) {
        const packageDefinition = protoLoader.loadSync(
            protoFile,
            protoLoadingOptions || KgRPC.defaultProtoLoadingOptions
        );
        const grpcObject = grpc.loadPackageDefinition(packageDefinition);
        const messagesPackage = grpcObject[protoMessagesPackage];
        this.server.addService(messagesPackage[serviceName].service, methods);
        console.log("Service added".green);
    }
}

module.exports = KgRPC;
