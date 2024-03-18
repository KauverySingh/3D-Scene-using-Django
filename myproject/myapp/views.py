# Create your views here.
# views.py
from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

def index(request):
    return render(request, 'index.html')

def get_data(request):
    data = {'message': 'Hello from Django!'}
    return JsonResponse(data)

@csrf_exempt
def receive_data(request):
    if request.method == 'POST':
        # Process the received data
        received_data = request.POST.get('data', None)
        # Perform actions based on received_data
        return JsonResponse({'message': 'Data received successfully'})
    else:
        return JsonResponse({'error': 'POST request expected'})
