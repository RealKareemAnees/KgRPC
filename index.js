/**
 * gRPC library for Node.js.
 * @external grpc
 * @see {@link https://github.com/grpc/grpc-node}
 */

/**
 * gRPC Protocol Buffer (proto) loader for Node.js.
 * @external protoLoader
 * @see {@link https://github.com/grpc/grpc-node/tree/master/packages/proto-loader}
 */

/**
 * Colors library for Node.js terminal output.
 * @external colors
 * @see {@link https://github.com/Marak/colors.js}
 */

const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
require("colors");

/**
 * Represents a gRPC Server.
 */
class Server {
    /**
     * Default options for loading protobuf files.
     * @type {Object}
     * @static
     */
    static defaultProtoLoadingOptions = {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true,
    };

    /**
     * gRPC server instance.
     * @type {grpc.Server}
     */
    server;

    /**
     * Creates an instance of Server.
     * @param {Object} configs - Configuration options for the server.
     */
    constructor(configs) {
        this.server = new grpc.Server();
    }

    /**
     * Creates an insecure gRPC server.
     * @param {string} host - The host address to bind the server to.
     * @param {number} port - The port number to bind the server to.
     * @param {Function} callback - Callback function to be called after the server is bound (optional).
     */
    createInsecureServer(host, port, callback) {
        this.server.bindAsync(
            `${host}:${port}`,
            grpc.ServerCredentials.createInsecure(),
            (err, boundPort) => {
                if (typeof callback === "function") {
                    callback(err, boundPort);
                } else if (err) {
                    throw new Error(
                        `Failed to bind gRPC server: ${err.message}`
                    );
                }
            }
        );
    }

    /**
     * Adds a unary RPC service to the gRPC server.
     * @param {string} protoFile - The path to the Protocol Buffers (protobuf) file.
     * @param {string} protoMessagesPackage - The name of the protobuf messages package.
     * @param {string} serviceName - The name of the service in the protobuf file.
     * @param {Object} methods - The service method definitions.
     * @param {Object} protoLoadingOptions - Options for loading the protobuf file (optional).
     * @param {Function} callback - Callback function to be called after service addition (optional).
     */
    addService(
        protoFile,
        protoMessagesPackage,
        serviceName,
        methods,
        protoLoadingOptions,
        callback
    ) {
        protoLoadingOptions =
            protoLoadingOptions || Server.defaultProtoLoadingOptions;
        const packageDefinition = protoLoader.loadSync(
            protoFile,
            protoLoadingOptions
        );
        const grpcObject = grpc.loadPackageDefinition(packageDefinition);
        const messagesPackage = grpcObject[protoMessagesPackage];
        this.server.addService(messagesPackage[serviceName].service, methods);
        callback ? callback(serviceName) : null;
    }
}

/**
 * Represents a gRPC Client.
 */
class Client {
    /**
     * Default options for loading protobuf files.
     * @type {Object}
     * @static
     */
    static defaultProtoLoadingOptions = {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true,
    };

    /**
     * gRPC client instance.
     * @type {grpc.Client}
     */
    client;

    /**
     * Creates an instance of Client.
     */
    constructor() {}

    /**
     * Creates an insecure connection to a gRPC server.
     * @param {string} protoFile - The path to the Protocol Buffers (protobuf) file.
     * @param {string} protoMessagesPackage - The name of the protobuf messages package.
     * @param {string} serviceName - The name of the service in the protobuf file.
     * @param {string} host - The host address of the gRPC server.
     * @param {number} port - The port number of the gRPC server.
     * @param {Object} [protoLoadingOptions=Client.defaultProtoLoadingOptions] - Options for loading the protobuf file (optional).
     * @param {Function} [callback] - Callback function to be called after connection establishment (optional).
     */
    createInsecureConnection(
        protoFile,
        protoMessagesPackage,
        serviceName,
        host,
        port,
        protoLoadingOptions = Client.defaultProtoLoadingOptions,
        callback
    ) {
        const packageDefinition = protoLoader.loadSync(
            protoFile,
            protoLoadingOptions
        );
        const grpcObject = grpc.loadPackageDefinition(packageDefinition);
        const messagesPackage = grpcObject[protoMessagesPackage];
        this.client = new messagesPackage[serviceName](
            `${host}:${port}`,
            grpc.credentials.createInsecure()
        );
        if (callback) {
            callback(`${host}:${port}`);
        }
    }

    /**
     * Initiates a unary RPC call to the gRPC server.
     * @param {string} methodName - The name of the RPC method to call.
     * @param {Object} message - The request message to send.
     * @param {Function} [callback] - Callback function to handle the response (optional).
     * @returns {grpc.ClientUnaryCall} The RPC call object.
     */
    callServer(methodName, message, callback) {
        const call = this.client[methodName](message, callback);
        return call;
    }
}

module.exports = { Server, Client };
