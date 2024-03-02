### KgRPC

KgRPC is a Node.js package that simplifies the creation of gRPC servers. It provides easy-to-use methods for setting up and running gRPC servers with default configurations.

#### Installation

You can install KgRPC via npm:

#### Usage

Here's how you can use KgRPC to create and run a gRPC server:

```javascript
const KgRPC = require("@realkareemanees/kgrpc");

const app = new KgRPC();

function communicate(call, callback) {
    console.log(call.request);
    callback(null, {
        reply: "hi ho from server",
    });
}

app.createInsecureServer("127.0.0.1:40000");

app.addService("main.proto", "reqres", "ReqRes", {
    communicate: communicate,
});
```

#### Default Configurations

KgRPC comes with default configurations for loading proto files. These configurations include:

-   **keepCase:** true
-   **longs:** String
-   **enums:** String
-   **defaults:** true
-   **oneofs:** true

#### Example

Here's an example of how to use KgRPC with the provided proto file (`main.proto`):

```protobuf
syntax = "proto3";

package reqres;

service ReqRes {
    rpc communicate (req) returns (res);
}

message req {
    string order = 1;
}

message res {
    string reply = 1;
}
```

This proto file defines a service called `ReqRes` with a method `communicate` that takes a request message `req` and returns a response message `res`. You can use this proto file with KgRPC as shown in the usage example above.

#### Author

Kareem Anees  
GitHub: [RealKareemAnees](https://github.com/RealKareemAnees/)
