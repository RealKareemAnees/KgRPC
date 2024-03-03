Here's an updated version of the markdown documentation with implementation examples:

---

### External Dependencies

- **grpc**: gRPC library for Node.js. [GitHub](https://github.com/grpc/grpc-node)
- **protoLoader**: gRPC Protocol Buffer (proto) loader for Node.js. [GitHub](https://github.com/grpc/grpc-node/tree/master/packages/proto-loader)
- **colors**: Colors library for Node.js terminal output. [GitHub](https://github.com/Marak/colors.js)

---

### Server Class

#### Constructor

```javascript
const server = new Server(configs);
```

- **Configs**: Optional configurations for the server.

#### Methods

##### createInsecureServer

```javascript
server.createInsecureServer(host, port, callback);
```

- **Host**: The host address to bind the server to.
- **Port**: The port number to bind the server to.
- **Callback**: Callback function to be called after the server is bound (optional).

##### addService

```javascript
server.addService(protoFile, protoMessagesPackage, serviceName, methods, protoLoadingOptions, callback);
```

- **ProtoFile**: The path to the Protocol Buffers (protobuf) file.
- **ProtoMessagesPackage**: The name of the protobuf messages package.
- **ServiceName**: The name of the service in the protobuf file.
- **Methods**: The service method definitions.
- **ProtoLoadingOptions**: Options for loading the protobuf file (optional).
- **Callback**: Callback function to be called after service addition (optional).

---

### Client Class

#### Constructor

```javascript
const client = new Client();
```

#### Methods

##### createInsecureConnection

```javascript
client.createInsecureConnection(protoFile, protoMessagesPackage, serviceName, host, port, protoLoadingOptions, callback);
```

- **ProtoFile**: The path to the Protocol Buffers (protobuf) file.
- **ProtoMessagesPackage**: The name of the protobuf messages package.
- **ServiceName**: The name of the service in the protobuf file.
- **Host**: The host address of the gRPC server.
- **Port**: The port number of the gRPC server.
- **ProtoLoadingOptions**: Options for loading the protobuf file (optional).
- **Callback**: Callback function to be called after connection establishment (optional).

##### callServer

```javascript
client.callServer(methodName, message, callback);
```

- **MethodName**: The name of the RPC method to call.
- **Message**: The request message to send.
- **Callback**: Callback function to handle the response (optional).

---

### Implementation Examples

#### Creating a gRPC Server

```javascript
const { Server } = require('./path/to/Server');

const server = new Server();

const host = 'localhost';
const port = 50051;

server.createInsecureServer(host, port, (err, boundPort) => {
    if (err) {
        console.error('Failed to start gRPC server:', err);
    } else {
        console.log(`gRPC server started successfully on port ${boundPort}`);
    }
});
```

#### Adding a Service to the Server

```javascript
const { Server } = require('./path/to/Server');

const server = new Server();

const protoFile = './path/to/protofile.proto';
const protoMessagesPackage = 'packageName';
const serviceName = 'ServiceName';
const methods = { /* Define your service methods here */ };

server.addService(protoFile, protoMessagesPackage, serviceName, methods);
```

#### Creating a gRPC Client

```javascript
const { Client } = require('./path/to/Client');

const client = new Client();

const protoFile = './path/to/protofile.proto';
const protoMessagesPackage = 'packageName';
const serviceName = 'ServiceName';
const host = 'localhost';
const port = 50051;

client.createInsecureConnection(protoFile, protoMessagesPackage, serviceName, host, port, (serverAddress) => {
    console.log(`Connected to gRPC server at ${serverAddress}`);
});
```

#### Making RPC Calls with the Client

```javascript
const { Client } = require('./path/to/Client');

const client = new Client();

const methodName = 'MethodName';
const message = { /* Your request message here */ };

client.callServer(methodName, message, (error, response) => {
    if (error) {
        console.error('RPC call failed:', error);
    } else {
        console.log('RPC call successful. Response:', response);
    }
});
```

---

This code provides a simple interface for creating gRPC servers and clients in Node.js, allowing for easy integration with Protocol Buffers (protobuf) files. The implementation examples demonstrate how to use the provided classes to set up and interact with gRPC services.
