const grpc = require('grpc');
const service = require('./service_pb');
const service_grpc = require('./service_grpc_pb');

const input_name = document.getElementById("name");
const input_mail = document.getElementById("mail");

function run() {
  // Connect to the gRPC server
  const client = new service_grpc.YourServiceClient('localhost:50051', grpc.credentials.createInsecure());

  // Example of calling GetUser
  const userRequest = new service.GetUserRequest();
  //userRequest.setUserId(123); // Replace with the actual user_id

  client.getUser(userRequest, (error, response) => {
    if (!error) {
      console.log(`User Data: ${response.getName()}, ${response.getEmail()}`);
    } else {
      console.error(error);
    }
  });

  // Example of calling AddUser
  const newUserRequest = new service.AddUserRequest();
  newUserRequest.setName(input_name);
  newUserRequest.setEmail(input_mail);

  client.addUser(newUserRequest, (error, response) => {
    if (!error) {
      console.log(`Added User: ${response.getName()}, ${response.getEmail()}`);
    } else {
      console.error(error);
    }
  });
}


if (require.main === module) {
  run();
}




/*
 *
 * Copyright 2015 gRPC authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 *

var PROTO_PATH = __dirname + '/../server-python/service.proto';

var parseArgs = require('minimist');
var grpc = require('@grpc/grpc-js');
var protoLoader = require('@grpc/proto-loader');
var packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {keepCase: true,
     longs: String,
     enums: String,
     defaults: true,
     oneofs: true
    });
var hello_proto = grpc.loadPackageDefinition(packageDefinition).helloworld;

function main() {

  const input_name = document.getElementById("name");
  const input_mail = document.getElementById("mail");

  formatData(input_name, input_mail);

  var argv = parseArgs(process.argv.slice(2), {
    string: 'target'
  });
  var target;
  if (argv.target) {
    target = argv.target;
  } else {
    target = 'localhost:5051';
  }
  var client = new hello_proto.Greeter(target,
                                       grpc.credentials.createInsecure());
  var user;
  if (argv._.length > 0) {
    user = argv._[0];
  } else {
    user = 'Àlvaro';
  }

  client.getUser({name: user}, function(err, response) {
    console.log('Greeting:', response.message);
  });

  client.addUser({name: user}, function(err, response) {
    console.log('Greeting:', response.message);
  });


}

function formatData(input_name, input_mail) {
  
  let user = {
    name: input_name,
    mail: input_mail
  };

  return user;

}

main();*/