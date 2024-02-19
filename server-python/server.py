import grpc
from concurrent import futures
from service_pb2 import GetUserRequest, UserData
import service_pb2_grpc

class YourService(service_pb2_grpc.YourServiceServicer):
    def GetUser(self, request, context):
        # Implementa la lógica para obtener datos del usuario aquí
        user_data = UserData(name='Ejemplo Usuario', email='usuario@example.com')
        return user_data

def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    service_pb2_grpc.add_YourServiceServicer_to_server(YourService(), server)
    server.add_insecure_port('[::]:50051')
    server.start()
    server.wait_for_termination()

if __name__ == '__main__':
    serve()