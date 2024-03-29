import grpc
from concurrent import futures
from service_pb2 import GetUserRequest, UserData, SumRequest
import service_pb2_grpc

users = []

class YourService(service_pb2_grpc.YourServiceServicer):
    def GetUser(self, request, context):
        # Implementa la lógica para obtener datos del usuario aquí
        for user in users:
            if user.name == request.name:
                return UserData(name=user.name, email=user.email)
        return UserData(name='Usuario no encontrado', email='')

    def AddUser(self, request, context):
        # Implementa la lógica para añadir un nuevo usuario aquí
        new_user_data = UserData(name=request.name, email=request.email)
        users.append(new_user_data)
        return new_user_data
    
    def SumNumbers(self, request, context):
        return SumRequest(result=request.number1 + request.number2)

def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    service_pb2_grpc.add_YourServiceServicer_to_server(YourService(), server)
    server.add_insecure_port('[::]:50051')
    server.start()
    server.wait_for_termination()

if __name__ == '__main__':
    serve()